import { CepService } from "src/resource/cep/cep.service";
import { UpdateOrgDto } from "src/resource/organizations/dto/update-org.dto";
import { OrgEntity } from "src/resource/organizations/entities/org.entity";
import { OrgsRepository } from "src/resource/organizations/repositories/orgs.repository";

export class InMemoryOrgsRepository implements OrgsRepository {
    constructor(private readonly cepService: CepService) { }

    public items: any = []

    async create(data: OrgEntity) {
        const randomNumber = Math.floor(Math.random() * 101)

        const city = await this.cepService.getCidadeByCep(data.cep)

        const org = {
            id: Number(data.id) | randomNumber,
            name: data.name,
            email: data.email,
            cep: data.cep,
            city,
            adress: data.adress,
            whatsapp: data.whatsapp,
            password: data.password,
            createdAt: new Date()
        }

        this.items.push(org)
        return org
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

    async update(id: string, dataOrg: UpdateOrgDto) {
        for (let i = 0; i < this.items.length; i++) {
            if (this.items[i].id === id) {
                this.items[i].name = dataOrg.name
                this.items[i].email = dataOrg.email
                this.items[i].cep = dataOrg.cep
                this.items[i].adress = dataOrg.adress
                this.items[i].whatsapp = dataOrg.whatsapp
                this.items[i].password = dataOrg.password
                this.items[i].updatedAt = new Date()

                return this.items[i]
            }
        }
    }

    async delete(id: string) {
        for (let i = 0; i < this.items.length; i++) {
            if (this.items[i].id === id) {
                this.items.splice(i, 1);
            }
        }
    }
}