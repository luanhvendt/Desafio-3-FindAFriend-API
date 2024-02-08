import { Module } from "@nestjs/common";
import { PrismaService } from "src/database/PrismaService";
import { PetsController } from "./pets.controller";
import { PetsService } from "./pets.service";
import { PetsRepository } from "./repositories/pets.repository";
import { PrismaPetsRepository } from "./repositories/prisma/prisma-pets-repository";

@Module({
    controllers: [PetsController],
    providers: [
        PrismaService,
        PetsService,
        PrismaPetsRepository,
        { provide: PetsRepository, useClass: PrismaPetsRepository }
    ]
})
export class PetsModule { }