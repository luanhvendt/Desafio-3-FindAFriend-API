import { InMemoryOrgsRepository } from "../../../test/repositories/in-memory-orgs-repository"
import { InMemoryPetsRepository } from "../../../test/repositories/in-memory-pets-repository"
import { OrgsService } from "../organizations/orgs.service"
import { PetsService } from "./pets.service"

describe('PetsService', () => {
    it('should be able to create a new org', async () => {
        const inMemoryPetsRepository = new InMemoryPetsRepository()
        const inMemoryOrgsRepository = new InMemoryOrgsRepository()
        const petsService = new PetsService(inMemoryPetsRepository, inMemoryOrgsRepository)
        const orgsService = new OrgsService(inMemoryOrgsRepository)

        await expect(orgsService.create({
            id: '1',
            name: 'org 1',
            email: 'org1@mail.com',
            cep: '18016040',
            adress: 'adress',
            whatsapp: '123456789',
            password: '1234abcd',
            createdAt: new Date()
        }))
            .resolves
            .not
            .toThrow()

        await expect(petsService.create({
            id: '1',
            organization_id: '1',
            name: 'pet',
            about: 'about',
            age: 5,
            size: 'Pequenino',
            energy: 'Alta',
            independence: 'Baixa',
            environment: 'Ambiente amplo',
            photos: 'photos',
            requirements: 'requeriments',
            createdAt: new Date()
        }))
            .resolves
            .not
            .toThrow()

        expect(inMemoryPetsRepository.items).toEqual(expect.arrayContaining([
            expect.objectContaining({
                id: 1
            })
        ]))
    })

    it('should not be able to create a new pet with invalid organizationId', async () => {
        const inMemoryPetsRepository = new InMemoryPetsRepository()
        const inMemoryOrgsRepository = new InMemoryOrgsRepository()
        const petsService = new PetsService(inMemoryPetsRepository, inMemoryOrgsRepository)
        const orgsService = new OrgsService(inMemoryOrgsRepository)

        await expect(orgsService.create({
            id: '2',
            name: 'org 1',
            email: 'org1@mail.com',
            cep: '18016040',
            adress: 'adress',
            whatsapp: '123456789',
            password: '1234abcd',
            createdAt: new Date()
        }))
            .resolves
            .not
            .toThrow()

        await expect(petsService.create({
            id: '1',
            organization_id: '1',
            name: 'pet',
            about: 'about',
            age: 5,
            size: 'Pequenino',
            energy: 'Alta',
            independence: 'Baixa',
            environment: 'Ambiente amplo',
            photos: 'photos',
            requirements: 'requeriments',
            createdAt: new Date()
        }))
            .rejects
            .toThrow()

        expect(inMemoryPetsRepository.items).toHaveLength(0)
    })

    it('should be able to find all pets', async () => {
        const inMemoryPetsRepository = new InMemoryPetsRepository()
        const inMemoryOrgsRepository = new InMemoryOrgsRepository()
        const petsService = new PetsService(inMemoryPetsRepository, inMemoryOrgsRepository)
        const orgsService = new OrgsService(inMemoryOrgsRepository)

        await expect(orgsService.create({
            id: '1',
            name: 'org 1',
            email: 'org1@mail.com',
            cep: '18016040',
            adress: 'adress',
            whatsapp: '123456789',
            password: '1234abcd',
            createdAt: new Date()
        }))
            .resolves
            .not
            .toThrow()

        await expect(petsService.create({
            id: '1',
            organization_id: '1',
            name: 'pet 1',
            about: 'about',
            age: 5,
            size: 'Pequenino',
            energy: 'Alta',
            independence: 'Baixa',
            environment: 'Ambiente amplo',
            photos: 'photos',
            requirements: 'requeriments',
            createdAt: new Date()
        }))
            .resolves
            .not
            .toThrow()

        await expect(petsService.create({
            id: '2',
            organization_id: '1',
            name: 'pet 2',
            about: 'about',
            age: 5,
            size: 'Pequenino',
            energy: 'Alta',
            independence: 'Baixa',
            environment: 'Ambiente amplo',
            photos: 'photos',
            requirements: 'requeriments',
            createdAt: new Date()
        }))
            .resolves
            .not
            .toThrow()

        const pets = await inMemoryPetsRepository.findAll()

        expect(pets).toEqual(expect.arrayContaining([
            expect.objectContaining({
                organization_id: 1,
                name: 'pet 1'
            }),
            expect.objectContaining({
                organization_id: 1,
                name: 'pet 2'
            })
        ]))
    })

    it('should be able to find an unique pet', async () => {
        const inMemoryPetsRepository = new InMemoryPetsRepository()
        const inMemoryOrgsRepository = new InMemoryOrgsRepository()
        const petsService = new PetsService(inMemoryPetsRepository, inMemoryOrgsRepository)
        const orgsService = new OrgsService(inMemoryOrgsRepository)

        await expect(orgsService.create({
            id: '1',
            name: 'org 1',
            email: 'org1@mail.com',
            cep: '18016040',
            adress: 'adress',
            whatsapp: '123456789',
            password: '1234abcd',
            createdAt: new Date()
        }))
            .resolves
            .not
            .toThrow()

        await expect(petsService.create({
            id: '1',
            organization_id: '1',
            name: 'pet 1',
            about: 'about',
            age: 5,
            size: 'Pequenino',
            energy: 'Alta',
            independence: 'Baixa',
            environment: 'Ambiente amplo',
            photos: 'photos',
            requirements: 'requeriments',
            createdAt: new Date()
        }))
            .resolves
            .not
            .toThrow()

        await expect(petsService.create({
            id: '2',
            organization_id: '1',
            name: 'pet 2',
            about: 'about',
            age: 5,
            size: 'Pequenino',
            energy: 'Alta',
            independence: 'Baixa',
            environment: 'Ambiente amplo',
            photos: 'photos',
            requirements: 'requeriments',
            createdAt: new Date()
        }))
            .resolves
            .not
            .toThrow()


        const pet = await petsService.findUnique('2')

        expect(pet).toEqual(
            expect.objectContaining({
                name: 'pet 2',
                organization_id: 1,
            })
        )
    })

    it('should be able to update a pet', async () => {
        const inMemoryPetsRepository = new InMemoryPetsRepository()
        const inMemoryOrgsRepository = new InMemoryOrgsRepository()
        const petsService = new PetsService(inMemoryPetsRepository, inMemoryOrgsRepository)
        const orgsService = new OrgsService(inMemoryOrgsRepository)

        await expect(orgsService.create({
            id: '1',
            name: 'org 1',
            email: 'org1@mail.com',
            cep: '18016040',
            adress: 'adress',
            whatsapp: '123456789',
            password: '1234abcd',
            createdAt: new Date()
        }))
            .resolves
            .not
            .toThrow()

        await expect(petsService.create({
            id: '1',
            organization_id: '1',
            name: 'pet 1',
            about: 'about',
            age: 5,
            size: 'Pequenino',
            energy: 'Alta',
            independence: 'Baixa',
            environment: 'Ambiente amplo',
            photos: 'photos',
            requirements: 'requeriments',
            createdAt: new Date()
        }))
            .resolves
            .not
            .toThrow()

        await expect(petsService.update('1', {
            name: 'pet 1 atualizado',
            updatedAt: new Date(),
        }))
            .resolves
            .not
            .toThrow()

        expect(inMemoryPetsRepository.items).toEqual(expect.arrayContaining([
            expect.objectContaining({
                name: 'pet 1 atualizado',
            })
        ]))
    })

    it('should not be able to update a pet with invalid id', async () => {
        const inMemoryPetsRepository = new InMemoryPetsRepository()
        const inMemoryOrgsRepository = new InMemoryOrgsRepository()
        const petsService = new PetsService(inMemoryPetsRepository, inMemoryOrgsRepository)
        const orgsService = new OrgsService(inMemoryOrgsRepository)

        await expect(orgsService.create({
            id: '1',
            name: 'org 1',
            email: 'org1@mail.com',
            cep: '18016040',
            adress: 'adress',
            whatsapp: '123456789',
            password: '1234abcd',
            createdAt: new Date()
        }))
            .resolves
            .not
            .toThrow()

        await expect(petsService.create({
            id: '1',
            organization_id: '1',
            name: 'pet 1',
            about: 'about',
            age: 5,
            size: 'Pequenino',
            energy: 'Alta',
            independence: 'Baixa',
            environment: 'Ambiente amplo',
            photos: 'photos',
            requirements: 'requeriments',
            createdAt: new Date()
        }))
            .resolves
            .not
            .toThrow()

        await expect(petsService.update('aa', {
            name: 'pet 1 atualizado',
            updatedAt: new Date(),
        }))
            .rejects
            .toThrow()

        expect(inMemoryPetsRepository.items).not.toEqual(expect.arrayContaining([
            expect.objectContaining({
                name: 'pet 1 atualizado',
            })
        ]))
    })

    it('should be able to delete a unique', async () => {
        const inMemoryPetsRepository = new InMemoryPetsRepository()
        const inMemoryOrgsRepository = new InMemoryOrgsRepository()
        const petsService = new PetsService(inMemoryPetsRepository, inMemoryOrgsRepository)
        const orgsService = new OrgsService(inMemoryOrgsRepository)

        await expect(orgsService.create({
            id: '1',
            name: 'org 1',
            email: 'org1@mail.com',
            cep: '18016040',
            adress: 'adress',
            whatsapp: '123456789',
            password: '1234abcd',
            createdAt: new Date()
        }))
            .resolves
            .not
            .toThrow()

        await expect(petsService.create({
            id: '1',
            organization_id: '1',
            name: 'pet 1',
            about: 'about',
            age: 5,
            size: 'Pequenino',
            energy: 'Alta',
            independence: 'Baixa',
            environment: 'Ambiente amplo',
            photos: 'photos',
            requirements: 'requeriments',
            createdAt: new Date()
        }))
            .resolves
            .not
            .toThrow()

        await expect(petsService.delete('1'))
            .resolves
            .not
            .toThrow()
        
        expect(inMemoryPetsRepository.items).not.toEqual(expect.arrayContaining([
            expect.objectContaining({
                name: 'pet 1',
            })
        ]))
    })
})