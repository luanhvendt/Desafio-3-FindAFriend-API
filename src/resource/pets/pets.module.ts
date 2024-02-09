import { Module } from "@nestjs/common";
import { PrismaService } from "../../database/PrismaService";
import { CepService } from "../cep/cep.service";
import { OrgsRepository } from "../organizations/repositories/orgs.repository";
import { PrismaOrgsRepository } from "../organizations/repositories/prisma/prisma-orgs.repository";
import { PetsController } from "./pets.controller";
import { PetsService } from "./pets.service";
import { PetsRepository } from "./repositories/pets.repository";
import { PrismaPetsRepository } from "./repositories/prisma/prisma-pets-repository";

@Module({
    controllers: [PetsController],
    providers: [
        PrismaService,
        PetsService,
        CepService,
        PrismaPetsRepository,
        { provide: PetsRepository, useClass: PrismaPetsRepository },
        { provide: OrgsRepository, useClass: PrismaOrgsRepository }
    ]
})
export class PetsModule { }