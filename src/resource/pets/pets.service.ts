import { Injectable } from "@nestjs/common";
import { CreatePetDto } from "./dto/create-pet.dto";
import { QueryPetDto } from "./dto/query-pet.dto";
import { UpdatePetDto } from "./dto/update-org.dto";
import { PetsRepository } from "./repositories/pets.repository";

@Injectable()
export class PetsService {
    constructor(private petsRepository: PetsRepository) { }

    async create(data: CreatePetDto) {
        if (!data.organization_id) {
            throw new Error('organization_id is required.')
        }

        if (!data.name) {
            throw new Error('name is required.')
        }
        if (!data.about) {
            throw new Error('about is required.')
        }
        if (!data.age) {
            throw new Error('age is required.')
        }
        if (!data.size) {
            throw new Error('size is required.')
        }
        if (!data.energy) {
            throw new Error('energy is required.')
        }
        if (!data.independence) {
            throw new Error('independence is required.')
        }
        if (!data.environment) {
            throw new Error('environment is required.')
        }
        if (!data.photos) {
            throw new Error('photos is required.')
        }
        if (!data.requirements) {
            throw new Error('requirements is required.')
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