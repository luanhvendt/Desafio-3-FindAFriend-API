import { Body, Controller, Delete, Get, Param, Put, Query, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "../../auth/guard/jwt-auth.guard";
import { QueryOrgrDto } from "./dto/query-org.dto";
import { UpdateOrgDto } from "./dto/update-org.dto";
import { OrgsService } from "./orgs.service";

@Controller('organization')
@UseGuards(JwtAuthGuard)
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

    @Put(':id')
    update(@Param('id') id: string, @Body() updateOrgDto: UpdateOrgDto) {
        return this.organizationsService.update(id, updateOrgDto)
    }

    @Delete(':id')
    delete(@Param('id') id: string) {
        return this.organizationsService.delete(id)
    }
}