import { BadRequestException, Injectable } from "@nestjs/common";
import { PrismaService } from "src/database/PrismaService";
import { CepService } from "src/resource/cep/cep.service";
import { QueryOrgrDto } from "../../dto/query-org.dto";
import { UpdateOrgDto } from "../../dto/update-org.dto";
import { OrgEntity } from "../../entities/org.entity";
import { OrgsRepository } from "../orgs.repository";

@Injectable()
export class PrismaOrgsRepository implements OrgsRepository {
    constructor(
        private prisma: PrismaService,
        private cepService: CepService,
    ) { }

    async create(data: OrgEntity) {
        const findedOrg = await this.prisma.organization.findUnique({
            where: {
                email: data.email
            }
        })

        if (findedOrg) {
            throw new BadRequestException('Organization already exists.')
        }

        const cidade = await this.cepService.getCidadeByCep(data.cep)

        if (!cidade) {
            throw new BadRequestException('Invalid CEP.')
        }

        const org = await this.prisma.organization.create({
            data: {
                name: data.name,
                email: data.email,
                cep: data.cep,
                city: cidade,
                adress: data.adress,
                whatsapp: data.whatsapp,
                password: data.password,
                createdAt: new Date()
            }
        })

        return org
    }

    async findAll(query: QueryOrgrDto) {
        let { page = 1, limit = 10, search = '' } = query;

        page = Number(page)
        limit = Number(limit)
        search = String(search);

        const skip = (page - 1) * limit;

        const total = await this.prisma.organization.count({
            where: {
                deletedAt: null,
                OR: [
                    {
                        name: {
                            contains: search,
                        },
                    },
                    {
                        email: {
                            contains: search,
                        },
                    },
                ]
            }
        })

        const orgs = await this.prisma.organization.findMany({
            where: {
                deletedAt: null,
                OR: [
                    {
                        name: {
                            contains: search,
                        },
                    },
                    {
                        email: {
                            contains: search,
                        },
                    },
                ],
            },
            skip,
            take: limit,
        })

        return {
            total,
            page,
            search,
            limit,
            pages: Math.ceil(total / limit),
            data: orgs
        }
    }

    async findUnique(id: string) {
        const intId = parseInt(id)

        const org = await this.prisma.organization.findUnique({
            where: {
                deletedAt: null,
                id: intId,
            }
        })

        return org
    }

    async update(id: string, dataOrg: UpdateOrgDto) {
        const intId = parseInt(id)

        const org = await this.prisma.organization.update({
            where: {
                id: intId,
            },
            data: {
                name: dataOrg.name,
                email: dataOrg.email,
                cep: dataOrg.cep,
                adress: dataOrg.adress,
                whatsapp: dataOrg.whatsapp,
                password: dataOrg.password,
                updatedAt: new Date(),
            }
        })

        return org
    }

    async delete(id: string) {
        const intId = parseInt(id)

        const deletedPets = await this.prisma.pet.updateMany({
            where: {
                organization_id: parseInt(id),
            },
            data: {
                deletedAt: new Date()
            }
        })

        const org = await this.prisma.organization.update({
            where: {
                id: intId,
            },
            data: {
                deletedAt: new Date()
            }
        })
    }
}