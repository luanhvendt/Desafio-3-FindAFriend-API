export interface UpdatePetDto {
    organization_id?: number;
    name?: string;
    about?: string;
    age?: number;
    size?: 'Pequenino' | 'Pequeno' | 'Medio' | 'Grande';
    energy?: 'Baixa' | 'Media' | 'Alta';
    independence?: 'Baixa' | 'Media' | 'Alta';
    environment?: 'Ambiente amplo' | 'Ambiente pequeno';
    photos?: string;
    requirements?: string;
    updatedAt: Date;
}