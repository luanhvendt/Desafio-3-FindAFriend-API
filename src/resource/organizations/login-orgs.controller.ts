import { Body, Controller, Post } from "@nestjs/common";
import { CreateOrgDto } from "./dto/create-org.dto";
import { OrgsService } from "./orgs.service";

@Controller('organization')
export class LoginOrgsController {
    constructor(private readonly orgsService: OrgsService) { }

    @Post()
    create(@Body() createOrgDto: CreateOrgDto) {
        return this.orgsService.create(createOrgDto)
    }
}