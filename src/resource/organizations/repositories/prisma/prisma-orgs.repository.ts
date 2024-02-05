import { BadRequestException, Injectable } from "@nestjs/common";
import { PrismaService } from "src/database/PrismaService";
import { QueryOrgrDto } from "../../dto/query-org.dto";
import { UpdateOrgDto } from "../../dto/update-org.dto";
import { OrgEntity } from "../../entities/org.entity";
import { OrgsRepository } from "../orgs.repository";

@Injectable()
export class PrismaOrgsRepository implements OrgsRepository {
    constructor(private prisma: PrismaService) { }

    async create(data: OrgEntity) {
        const findedOrg = await this.prisma.organization.findUnique({
            where: {
                email: data.email
            }
        })

        if (findedOrg) {
            throw new BadRequestException('Organization already exists.')
        }

        const org = await this.prisma.organization.create({
            data: {
                name: data.name,
                email: data.email,
                cep: data.cep,
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

    async delete(id: string): Promise<void> {
        const intId = parseInt(id)

        const org = await this.prisma.organization.delete({
            where: {
                id: intId,
            }
        })
    }
}