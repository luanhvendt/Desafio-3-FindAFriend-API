import { InMemoryOrgsRepository } from "../../../test/repositories/in-memory-orgs-repository"
import { OrgsService } from "./orgs.service"

describe('OrgsService', () => {
    it('should be able to create a new org', async () => {
        const inMemoryOrgsRepository = new InMemoryOrgsRepository()
        const orgsService = new OrgsService(inMemoryOrgsRepository)

        const org = await expect(orgsService.create({
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

        expect(inMemoryOrgsRepository.items).toEqual(expect.arrayContaining([
            expect.objectContaining({
                email: 'org1@mail.com',
            })
        ]))
    })

    it('should not be able to create a new org with same email', async () => {
        const inMemoryOrgsRepository = new InMemoryOrgsRepository()
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
            .rejects
            .toThrow()

        expect(inMemoryOrgsRepository.items).toHaveLength(1)
    })

    it('should be able to find all orgs', async () => {
        const inMemoryOrgsRepository = new InMemoryOrgsRepository()
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

        await expect(orgsService.create({
            id: '2',
            name: 'org 2',
            email: 'org2@mail.com',
            cep: '18016040',
            adress: 'adress',
            whatsapp: '123456789',
            password: '1234abcd',
            createdAt: new Date()
        }))
            .resolves
            .not
            .toThrow()

        const allUsers = await inMemoryOrgsRepository.findAll()

        expect(allUsers).toEqual(expect.arrayContaining([
            expect.objectContaining({
                email: 'org1@mail.com'
            }),
            expect.objectContaining({
                email: 'org2@mail.com'
            })
        ]))
    })

    it('should be abe to find an unique org', async () => {
        const inMemoryOrgsRepository = new InMemoryOrgsRepository()
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

        await expect(orgsService.create({
            id: '2',
            name: 'org 2',
            email: 'org2@mail.com',
            cep: '18016040',
            adress: 'adress',
            whatsapp: '123456789',
            password: '1234abcd',
            createdAt: new Date()
        }))
            .resolves
            .not
            .toThrow()

        const org = await orgsService.findUnique('2')

        expect(org).toEqual(
            expect.objectContaining({
                email: 'org2@mail.com'
            })
        )
    })

    it('should be able to update an org', async () => {
        const inMemoryOrgsRepository = new InMemoryOrgsRepository()
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

        await expect(orgsService.update('1', {
            name: 'org1 alterada',
            updatedAt: new Date(),
        }))
            .resolves
            .not
            .toThrow()

        expect(inMemoryOrgsRepository.items).toEqual(expect.arrayContaining([
            expect.objectContaining({
                name: 'org1 alterada',
            })
        ]))
    })

    it('should not be able to update an org with invalid id', async () => {
        const inMemoryOrgsRepository = new InMemoryOrgsRepository()
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

        await expect(orgsService.update('aa', {
            name: 'org1 alterada',
            updatedAt: new Date(),
        }))
            .rejects
            .toThrow()

        expect(inMemoryOrgsRepository.items).not.toEqual(expect.arrayContaining([
            expect.objectContaining({
                name: 'org1 alterada',
            })
        ]))
    })

    it('should be able to delete an org', async () => {
        const inMemoryOrgsRepository = new InMemoryOrgsRepository()
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

        await expect(orgsService.delete('1'))
            .resolves
            .not
            .toThrow()

        expect(inMemoryOrgsRepository.items).not.toEqual(expect.arrayContaining([
            expect.objectContaining({
                email: 'org1@mail.com',
            })
        ]))
    })
})