import { BadRequestException, Injectable } from "@nestjs/common";
import { CreateOrgDto } from "./dto/create-org.dto";
import { QueryOrgrDto } from "./dto/query-org.dto";
import { UpdateOrgDto } from "./dto/update-org.dto";
import { OrgsRepository } from "./repositories/orgs.repository";

@Injectable()
export class OrgsService {
    constructor(private orgsRepository: OrgsRepository) { }

    async create(data: CreateOrgDto) {
        if (!data.name) {
            throw new Error('Name is required.')
        }

        if (!data.email) {
            throw new Error('Email is required.')
        }

        if (!data.cep) {
            throw new Error('CEP is required.')
        }

        if (!data.adress) {
            throw new Error('Adress is required.')
        }

        if (!data.whatsapp) {
            throw new Error('Whatsapp is required.')
        }

        if (!data.password) {
            throw new Error('Password is required.')
        }

        const org = await this.orgsRepository.create({
            name: data.name,
            email: data.email,
            cep: data.cep,
            adress: data.adress,
            whatsapp: data.whatsapp,
            password: data.password,
        })
    }

    async findAll(query: QueryOrgrDto) {
        const orgs = await this.orgsRepository.findAll(query)

        return orgs
    }

    async findUnique(id: string) {
        const org = await this.orgsRepository.findUnique(id)

        if (!org) {
            throw new BadRequestException('Organization not found.')
        }

        return org
    }

    async update(id: string, data: UpdateOrgDto) {
        const org = await this.orgsRepository.findUnique(id)

        if (!org) {
            throw new BadRequestException('Organization not found')
        }

        const updatedOrg = await this.orgsRepository.update(id, data)

        return updatedOrg
    }

    async delete(id: string) {
        const org = await this.orgsRepository.findUnique(id)

        if (!org) {
            throw new BadRequestException('Organization not found.')
        }

        const deletedOrg = await this.orgsRepository.delete(id)

        return deletedOrg
    }
} 