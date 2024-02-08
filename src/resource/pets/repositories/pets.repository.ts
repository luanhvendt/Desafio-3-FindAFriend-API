import { CreatePetDto } from "../dto/create-pet.dto";
import { QueryPetDto } from "../dto/query-pet.dto";
import { UpdatePetDto } from "../dto/update-org.dto";

export abstract class PetsRepository {
    abstract create(data: CreatePetDto): Promise<void>
    abstract findAll(city: string, query: QueryPetDto)
    abstract findUnique(id: string)
    abstract update(id: string, dataPet: UpdatePetDto)
    abstract delete(id: string): Promise<void>
}