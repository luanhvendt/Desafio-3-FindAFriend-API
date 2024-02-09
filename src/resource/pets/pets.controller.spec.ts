import { INestApplication } from "@nestjs/common";
import { Test } from '@nestjs/testing';
import { randomUUID } from "crypto";
import * as request from 'supertest';
import { AppModule } from "../../app.module";
import { PrismaService } from "../../database/PrismaService";
import { PetsModule } from "./pets.module";

describe('PetsController', () => {
    let app: INestApplication
    let prisma: PrismaService
    let testAccessToken;
    let testRefreshToken;

    beforeAll(async () => {
        const moduleRef = await Test.createTestingModule({
            imports: [AppModule, PetsModule],
        }).compile()

        app = moduleRef.createNestApplication()
        prisma = moduleRef.get(PrismaService)

        await app.init()
    })

    test('[POST] /auth/login', async () => {
        const org = await prisma.organization.create({
            data: {
                name: 'organization',
                email: `teste@${randomUUID()}@mail.com`,
                cep: '18016040',
                adress: 'adress',
                whatsapp: '123456789',
                password: '1234abcd'
            }
        })

        const responseLogin = await request(app.getHttpServer())
            .post('/auth/login')
            .send(org)

        expect(responseLogin.statusCode).toBe(200)

        const responseBody = JSON.parse(responseLogin.text)
        const accessToken = responseBody.accesToken
        testAccessToken = accessToken

        const refreshToken = responseBody.refreshToken
        testRefreshToken = refreshToken

        const response = await request(app.getHttpServer())
            .post('/pet')
            .set('Authorization', `Bearer ${accessToken}`)
            .send({
                organization_id: org.id,
                name: 'name',
                about: 'about',
                age: 5,
                size: 'Pequenino',
                energy: 'Baixa',
                independence: 'Baixa',
                environment: 'Ambiente amplo',
                photos: 'photos',
                requirements: 'requirements'
            })

        expect(response.statusCode).toBe(201)
    })

    test('[PUT] /pet/:id', async () => {
        const org = await prisma.organization.create({
            data: {
                name: 'organization',
                email: `teste@${randomUUID()}@mail.com`,
                cep: '18016040',
                adress: 'adress',
                whatsapp: '123456789',
                password: '1234abcd'
            }
        })

        const pet = await prisma.pet.create({
            data: {
                organization_id: org.id,
                name: 'name',
                about: 'about',
                age: 5,
                size: 'Pequenino',
                energy: 'Baixa',
                independence: 'Baixa',
                environment: 'Ambiente amplo',
                photos: 'photos',
                requirements: 'requirements'
            }
        })

        const responseLogin = await request(app.getHttpServer())
            .post('/auth/login')
            .send(org)

        expect(responseLogin.statusCode).toBe(200)

        const responseBody = JSON.parse(responseLogin.text)
        const accessToken = responseBody.accesToken
        testAccessToken = accessToken

        const refreshToken = responseBody.refreshToken
        testRefreshToken = refreshToken

        const response = await request(app.getHttpServer())
            .put(`/pet/${pet.id}`)
            .set('Authorization', `Bearer ${accessToken}`)
            .send({
                name: 'updated name'
            })

        expect(response.statusCode).toBe(200)
    })

    test('[GET] /pet/:city', async () => {
        const org = await prisma.organization.create({
            data: {
                name: 'organization',
                email: `teste@${randomUUID()}@mail.com`,
                cep: '18016040',
                adress: 'adress',
                whatsapp: '123456789',
                password: '1234abcd'
            }
        })

        const responseLogin = await request(app.getHttpServer())
            .post('/auth/login')
            .send(org)

        expect(responseLogin.statusCode).toBe(200)

        const responseBody = JSON.parse(responseLogin.text)
        const accessToken = responseBody.accesToken
        testAccessToken = accessToken

        const refreshToken = responseBody.refreshToken
        testRefreshToken = refreshToken

        const response = await request(app.getHttpServer())
            .get('/pet/sorocaba')
            .set('Authorization', `Bearer ${accessToken}`)
            .send()

        expect(response.statusCode).toBe(200)
    })

    test('[DELETE] /pet/:id', async () => {
        const org = await prisma.organization.create({
            data: {
                name: 'organization',
                email: `teste@${randomUUID()}@mail.com`,
                cep: '18016040',
                adress: 'adress',
                whatsapp: '123456789',
                password: '1234abcd'
            }
        })

        const pet = await prisma.pet.create({
            data: {
                organization_id: org.id,
                name: 'name',
                about: 'about',
                age: 5,
                size: 'Pequenino',
                energy: 'Baixa',
                independence: 'Baixa',
                environment: 'Ambiente amplo',
                photos: 'photos',
                requirements: 'requirements'
            }
        })

        const responseLogin = await request(app.getHttpServer())
            .post('/auth/login')
            .send(org)

        expect(responseLogin.statusCode).toBe(200)

        const responseBody = JSON.parse(responseLogin.text)
        const accessToken = responseBody.accesToken
        testAccessToken = accessToken

        const refreshToken = responseBody.refreshToken
        testRefreshToken = refreshToken

        const response = await request(app.getHttpServer())
            .delete(`/pet/${pet.id}`)
            .set('Authorization', `Bearer ${accessToken}`)
            .send()

        expect(response.statusCode).toBe(200)
    })
})