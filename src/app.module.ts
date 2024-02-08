import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { CepService } from './resource/cep/cep.service';
import { OrgsModule } from './resource/organizations/orgs.module';
import { PetsModule } from './resource/pets/pets.module';

@Module({
    imports: [OrgsModule, PetsModule, AuthModule],
    controllers: [AppController],
    providers: [AppService, CepService],
})
export class AppModule { }
