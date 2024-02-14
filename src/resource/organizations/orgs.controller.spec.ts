import { INestApplication } from "@nestjs/common";
import { Test } from '@nestjs/testing';
import { randomUUID } from "crypto";
import * as request from 'supertest';
import { AppModule } from "../../app.module";
import { PrismaService } from "../../database/PrismaService";
import { OrgsModule } from "./orgs.module";

describe('OrgsController', () => {
    let app: INestApplication
    let prisma: PrismaService
    let testAccessToken;
    let testRefreshToken;

    beforeAll(async () => {
        const moduleRef = await Test.createTestingModule({
            imports: [AppModule, OrgsModule],
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

        const response = await request(app.getHttpServer())
            .post('/auth/login')
            .send(org)

        expect(response.statusCode).toBe(200)

        const responseBody = JSON.parse(response.text)
        const accessToken = responseBody.accessToken
        testAccessToken = accessToken

        const refreshToken = responseBody.refreshToken
        testRefreshToken = refreshToken
    })

    test('[POST] /organization', async () => {
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
            .post('/organization')
            .set('Authorization', `Bearer ${accessToken}`)
            .send({
                name: "organization",
                email: `organization@${randomUUID()}mail.com`,
                cep: "18016040",
                adress: "adress",
                whatsapp: "123345141241",
                password: "1234abcd"
            })

        expect(response.statusCode).toBe(201)
    })

    test('[PUT] /organization/:id', async () => {
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
            .put(`/organization/${org.id}`)
            .set('Authorization', `Bearer ${accessToken}`)
            .send({
                name: 'updated org'
            })

        expect(response.statusCode).toBe(200)
    })

    test('[GET] /organization', async () => {
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
            .get('/organization')
            .set('Authorization', `Bearer ${accessToken}`)
            .send()

        expect(response.statusCode).toBe(200)
    })

    test('[GET] /organization/:id', async () => {
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
            .get(`/organization/${org.id}`)
            .set('Authorization', `Bearer ${accessToken}`)
            .send()

        expect(response.statusCode).toBe(200)
    })

    test('[DELETE] /organization/:id', async () => {
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
            .delete(`/organization/${org.id}`)
            .set('Authorization', `Bearer ${accessToken}`)
            .send()

        expect(response.statusCode).toBe(200)
    })
})