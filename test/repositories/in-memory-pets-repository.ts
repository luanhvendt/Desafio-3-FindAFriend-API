import { CreatePetDto } from "../../src/resource/pets/dto/create-pet.dto";
import { UpdatePetDto } from "../../src/resource/pets/dto/update-org.dto";
import { PetsRepository } from "../../src/resource/pets/repositories/pets.repository";

export class InMemoryPetsRepository implements PetsRepository {
    public items: any = []

    async create(data: CreatePetDto) {
        const randomNumber = Math.floor(Math.random() * 101)

        const cep = '18016040'

        const city = 'Sorocaba'

        const org = {
            id: 1,
            name: 'name',
            email: 'email',
            cep: cep,
            city: city,
            adress: 'adress',
            whatsapp: '123456789',
            password: '123',
            createdAt: new Date()
        }

        const pet = {
            id: Number(data.id) || randomNumber,
            organization_id: org.id,
            name: data.name,
            about: data.about,
            age: Number(data.age),
            size: data.size,
            energy: data.energy,
            independence: data.independence,
            environment: data.environment,
            photos: data.photos,
            requiments: data.requirements,
            createdAt: new Date()
        }

        this.items.push(pet)
    }

    async findAll() {

        return this.items
    }

    async findUnique(id: string) {
        for (let i = 0; i < this.items.length; i++) {
            if (this.items[i].id === parseInt(id)) {
                return this.items[i]
            }
        }
    }

    async update(id: string, dataPet: UpdatePetDto) {
        for (let i = 0; i < this.items.length; i++) {
            if (this.items[i].id == id) {
                this.items[i].name = dataPet.name
                this.items[i].about = dataPet.about
                this.items[i].age = dataPet.age
                this.items[i].size = dataPet.size
                this.items[i].energy = dataPet.energy
                this.items[i].independence = dataPet.independence
                this.items[i].environment = dataPet.environment
                this.items[i].photos = dataPet.photos
                this.items[i].requirements = dataPet.requirements
                this.items[i].updatedAt = new Date()
            }
        }
    }

    async delete(id: string) {
        for (let i = 0; i < this.items.length; i++) {
            if (this.items[i].id === parseInt(id)) {
                this.items.splice(i, 1);
            }
        }
    }
}
