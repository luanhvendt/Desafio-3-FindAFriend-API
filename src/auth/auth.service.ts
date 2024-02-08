import { BadRequestException, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { PrismaService } from "../database/PrismaService";
import { LoginDto } from "./dto/login.dto";
import { RefreshDto } from "./dto/refresh.dto";

@Injectable()
export class AuthService {
    constructor(
        private prisma: PrismaService,
        private jwtService: JwtService,
    ) { }

    private async comparePasswords(
        senha: string,
        hashedPassword: string,
    ): Promise<boolean> {
        return bcrypt.compare(senha, hashedPassword);
    }

    async login(dataLogin: LoginDto) {
        const org = await this.prisma.organization.findFirst({
            where: {
                email: dataLogin.email,
                password: dataLogin.password,
            },
        })

        if (!org) {
            throw new BadRequestException('Invalid Credentials.')
        }
        if (!this.comparePasswords(dataLogin.password, org.password[0])) {
            throw new BadRequestException('Invalid Credentials.')
        }

        const payload = { id: org.id }
        const token = this.jwtService.sign(payload)
        const decodedToken = this.jwtService.verify(token) as { exp: number }

        const refreshToken = this.jwtService.sign({
            id: null
        })
        await this.prisma.refreshToken.create({
            data: {
                refreshToken: refreshToken,
                orgId: org.id,
            }
        })

        const data = {
            accesToken: token,
            refreshToken: refreshToken,
            expiresIn: new Date(decodedToken.exp * 1000),
            org
        }

        return data
    }

    async refresh(dataRefresh: RefreshDto) {
        const token = await this.prisma.refreshToken.findFirst({
            where: {
                refreshToken: dataRefresh.refreshToken,
                used: false,
            }
        })

        if (!token) {
            throw new BadRequestException('Invalid Token.')
        }

        if (!(await this.verifyRefreshToken(token.refreshToken))) {
            throw new BadRequestException('Invalid Token.')
        }

        await this.prisma.refreshToken.update({
            where: {
                id: token.id,
            },
            data: {
                used: true,
            },
        })

        const payload = { id: token.orgId };
        const newToken = this.jwtService.sign(payload)
        const refreshToken = this.jwtService.sign({
            id: null,
        })

        await this.prisma.refreshToken.create({
            data: {
                refreshToken: refreshToken,
                orgId: token.orgId,
            }
        })

        const decodedToken = this.jwtService.verify(newToken) as {
            exp: number;
        }

        const data = {
            accesToken: newToken,
            refreshToken: refreshToken,
            expiresIn: new Date(decodedToken.exp * 1000)
        }

        return data
    }

    async verifyRefreshToken(token: string) {
        try {
            this.jwtService.verify(token, { secret: process.env.JWT_SECRET });
            return true;
        } catch (error) {
            throw new UnauthorizedException('Invalid Token');
        }
    }

    async verifyToken(token: string) {
        try {
            const decodedToken = this.jwtService.verify(token, { secret: process.env.JWT_SECRET }) as {
                id: number;
            };
            return decodedToken.id;
        } catch (error) {
            throw new UnauthorizedException('Invalid Token');
        }
    }

    async validateOrg(payload: { id: string }) {
        const org = await this.prisma.organization.findUnique({
            where: { id: Number(payload.id) },
        });
        if (!org) {
            throw new UnauthorizedException();
        }
        return org;
    }
}