import { BadRequestException, Injectable } from "@nestjs/common";
import { OrgsRepository } from "../organizations/repositories/orgs.repository";
import { CreatePetDto } from "./dto/create-pet.dto";
import { QueryPetDto } from "./dto/query-pet.dto";
import { UpdatePetDto } from "./dto/update-org.dto";
import { PetsRepository } from "./repositories/pets.repository";

@Injectable()
export class PetsService {
    constructor(
        private petsRepository: PetsRepository,
        private orgsRepository: OrgsRepository
    ) { }

    async create(data: CreatePetDto) {
        if (!data.organization_id) {
            throw new BadRequestException('organization_id is required.')
        }
        const findedOrg = await this.orgsRepository.findUnique(String(data.organization_id))
        if (!findedOrg) {
            throw new BadRequestException('Organization not found.')
        }
        if (!data.name) {
            throw new BadRequestException('name is required.')
        }
        if (!data.about) {
            throw new BadRequestException('about is required.')
        }
        if (!data.age) {
            throw new BadRequestException('age is required.')
        }
        if (!data.size) {
            throw new BadRequestException('size is required.')
        }
        if (!data.energy) {
            throw new BadRequestException('energy is required.')
        }
        if (!data.independence) {
            throw new BadRequestException('independence is required.')
        }
        if (!data.environment) {
            throw new BadRequestException('environment is required.')
        }
        if (!data.photos) {
            throw new BadRequestException('photos is required.')
        }
        if (!data.requirements) {
            throw new BadRequestException('requirements is required.')
        }

        const pet = await this.petsRepository.create(data)

        return pet
    }

    async findAll(city: string, query: QueryPetDto) {
        if (!city) {
            throw new Error('City is required.')
        }

        const pets = await this.petsRepository.findAll(city, query)

        return pets
    }

    async findUnique(id: string) {
        const pet = await this.petsRepository.findUnique(id)

        if (!pet) {
            throw new Error('Pet not found.')
        }

        return pet
    }

    async update(id: string, dataPet: UpdatePetDto) {
        const pet = await this.petsRepository.findUnique(id)

        if (!pet) {
            throw new Error('Pet not found.')
        }

        const updatedPet = await this.petsRepository.update(id, dataPet)

        return updatedPet
    }

    async delete(id: string) {
        const pet = await this.petsRepository.findUnique(id)

        if (!pet) {
            throw new Error('Pet not found.')
        }

        await this.petsRepository.delete(id)
    }
}