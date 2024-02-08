import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OrgsModule } from './resource/organizations/orgs.module';
import { PetsModule } from './resource/pets/pets.module';

@Module({
    imports: [OrgsModule, PetsModule],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule { }
