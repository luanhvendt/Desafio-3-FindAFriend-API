import { Body, Controller, Delete, Get, Param, Post, Put, Query } from "@nestjs/common";
import { CreatePetDto } from "./dto/create-pet.dto";
import { QueryPetDto } from "./dto/query-pet.dto";
import { UpdatePetDto } from "./dto/update-org.dto";
import { PetsService } from "./pets.service";

@Controller('pet')
export class PetsController {
    constructor(private readonly petsService: PetsService) { }

    @Get(':city')
    findAll(@Query() query: QueryPetDto, @Param('city') city: string) {
        return this.petsService.findAll(city, query)
    }

    @Get(':id')
    findUnique(@Param('id') id: string) {
        return this.petsService.findUnique(id)
    }

    @Post()
    create(@Body() createPetDto: CreatePetDto) {
        return this.petsService.create(createPetDto)
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() updatePetDto: UpdatePetDto) {
        return this.petsService.update(id, updatePetDto)
    }

    @Delete(':id')
    delete(@Param('id') id: string) {
        return this.petsService.delete(id)
    }
}