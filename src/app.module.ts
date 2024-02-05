import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OrgsModule } from './resource/organizations/orgs.module';

@Module({
    imports: [OrgsModule],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule { }
