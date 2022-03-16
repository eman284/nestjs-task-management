import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { PageService } from "./page.service";
import { CreatePageDto } from "./dto/create-page.dto";
import { UpdatePageDto } from "./dto/update-page.dto";

@Controller('page')
export class PageController {
  constructor(private readonly pageService: PageService) {}

  @Post()
  create(@Body() createPageDto: CreatePageDto): Promise<CreatePageDto> {
    return this.pageService.create(createPageDto);
  }

  @Get()
  getAll() {
    return this.pageService.getAll();
  }

  @Get('/:id')
  getById(@Param('id') id: string) {
    return this.pageService.getById(id);
  }

  @Put()
  update(@Body() page: UpdatePageDto):Promise<UpdatePageDto> {
    return this.pageService.update(page);
  }

  @Delete('/:id')
  remove(@Param('id') id: string) {
    return this.pageService.delete(id);
  }
}
