import { Body, Controller, Delete, Get, Param, Post, Put, Query } from "@nestjs/common";
import { CreateOrgDto } from "./dto/create-org.dto";
import { QueryOrgrDto } from "./dto/query-org.dto";
import { UpdateOrgDto } from "./dto/update-org.dto";
import { OrgsService } from "./orgs.service";

@Controller('organization')
export class OrganizationController {
    constructor(private readonly organizationsService: OrgsService) { }

    @Get()
    findAll(@Query() query: QueryOrgrDto) {
        return this.organizationsService.findAll(query)
    }

    @Get(':id')
    findUnique(@Param('id') id: string) {
        return this.organizationsService.findUnique(id);
    }

    @Post()
    create(@Body() createOrgDto: CreateOrgDto) {
        return this.organizationsService.create(createOrgDto)
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() updateOrgDto: UpdateOrgDto) {
        return this.organizationsService.update(id, updateOrgDto)
    }

    @Delete(':id')
    delete(@Param('id') id: string) {
        return this.organizationsService.delete(id)
    }
}