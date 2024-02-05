import { Module } from "@nestjs/common";
import { PrismaService } from "src/database/PrismaService";
import { OrganizationController } from "./orgs.controller";
import { OrgsService } from "./orgs.service";
import { OrgsRepository } from "./repositories/orgs.repository";
import { PrismaOrgsRepository } from "./repositories/prisma/prisma-orgs.repository";

@Module({
    controllers: [OrganizationController],
    providers: [
        PrismaService,
        OrgsService,
        PrismaOrgsRepository,
        { provide: OrgsRepository, useClass: PrismaOrgsRepository }
    ],
})
export class OrgsModule { }