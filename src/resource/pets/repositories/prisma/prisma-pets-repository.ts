import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/database/PrismaService";
import { CreatePetDto } from "../../dto/create-pet.dto";
import { QueryPetDto } from "../../dto/query-pet.dto";
import { UpdatePetDto } from "../../dto/update-org.dto";
import { PetsRepository } from "../pets.repository";

@Injectable()
export class PrismaPetsRepository implements PetsRepository {
    constructor(private prisma: PrismaService) { }

    async create(data: CreatePetDto) {
        const pet = await this.prisma.pet.create({
            data: {
                organization_id: data.organization_id,
                name: data.name,
                about: data.about,
                age: data.age,
                size: data.size,
                energy: data.energy,
                independence: data.independence,
                environment: data.environment,
                city: data.city,
                photos: data.photos,
                requirements: data.requirements,
                createdAt: new Date()
            }
        })
    }

    async findAll(city: string, query: QueryPetDto) {
        let { page = 1, limit = 10, search = '', name, age, size, energy, independence, environment, requirements } = query;

        page = Number(page);
        limit = Number(limit);
        search = String(search);

        const skip = (page - 1) * limit;

        let whereCondition: any = {
            deletedAt: null,
            city,
        };

        if (search) {
            whereCondition.OR = [
                { name: { contains: search } },
                { size: { contains: search } },
                { energy: { contains: search } },
                { independence: { contains: search } },
                { environment: { contains: search } },
                { requirements: { contains: search } },
            ];
        }

        if (name) {
            whereCondition.name = { contains: name };
        }

        if (age) {
            whereCondition.age = Number(age);
        }

        if (size) {
            whereCondition.size = { contains: size };
        }

        if (energy) {
            whereCondition.energy = { contains: energy };
        }

        if (independence) {
            whereCondition.independence = { contains: independence };
        }

        if (environment) {
            whereCondition.environment = { contains: environment };
        }

        if (requirements) {
            whereCondition.requirements = { contains: requirements };
        }

        const total = await this.prisma.pet.count({
            where: whereCondition,
        });

        const pets = await this.prisma.pet.findMany({
            where: whereCondition,
            skip,
            take: limit,
        });

        return {
            total,
            page,
            search,
            limit,
            pages: Math.ceil(total / limit),
            data: pets,
        };
    }


    async findUnique(id: string) {
        const intId = parseInt(id)

        const pet = await this.prisma.pet.findUnique({
            where: {
                id: intId,
                deletedAt: null,
            }
        })

        return pet
    }

    async update(id: string, dataPet: UpdatePetDto) {
        const pet = await this.prisma.pet.update({
            where: {
                id: parseInt(id),
            },
            data: {
                organization_id: dataPet.organization_id,
                name: dataPet.name,
                about: dataPet.about,
                age: dataPet.age,
                size: dataPet.size,
                energy: dataPet.energy,
                independence: dataPet.independence,
                environment: dataPet.environment,
                city: dataPet.city,
                photos: dataPet.photos,
                requirements: dataPet.requirements,
                updatedAt: new Date()
            }
        })

        return pet
    }

    async delete(id: string) {
        const pet = await this.prisma.pet.update({
            where: {
                id: parseInt(id)
            },
            data: {
                deletedAt: new Date()
            }
        })
    }
}