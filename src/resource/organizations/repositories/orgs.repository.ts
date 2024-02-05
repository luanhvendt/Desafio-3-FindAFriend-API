import { QueryOrgrDto } from "../dto/query-org.dto";
import { UpdateOrgDto } from "../dto/update-org.dto";
import { OrgEntity } from "../entities/org.entity";

export abstract class OrgsRepository {
    abstract create(data: OrgEntity): Promise<any>
    abstract findAll(query: QueryOrgrDto): Promise<any>
    abstract findUnique(id: string): Promise<any>
    abstract update(id: string, dataOrg: UpdateOrgDto): Promise<UpdateOrgDto>
    abstract delete(id: string): Promise<void>
}