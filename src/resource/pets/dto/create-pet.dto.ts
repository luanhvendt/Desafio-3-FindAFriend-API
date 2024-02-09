export interface CreatePetDto {
    id?: string,
    organization_id: string;
    name: string;
    about: string;
    age: number;
    size: 'Pequenino' | 'Pequeno' | 'Medio' | 'Grande';
    energy: 'Baixa' | 'Media' | 'Alta';
    independence: 'Baixa' | 'Media' | 'Alta';
    environment: 'Ambiente amplo' | 'Ambiente pequeno';
    photos: string;
    requirements: string;
    createdAt: Date;
}