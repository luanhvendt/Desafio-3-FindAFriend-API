export interface PetEntity {
    id?: number;
    name: string;
    about: string;
    age: number;
    size: string;
    energy: string;
    independence: string;
    environment: string;
    photos: string;
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;
}