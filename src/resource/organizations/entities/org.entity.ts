export interface OrgEntity {
    id?: string;
    name: string;
    email: string;
    cep: string;
    city?: string;
    adress: string;
    whatsapp: string;
    password: string;
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;
}