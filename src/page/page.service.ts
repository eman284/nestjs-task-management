import { Injectable } from "@nestjs/common";
import { CreatePageDto } from "./dto/create-page.dto";
import { UpdatePageDto } from "./dto/update-page.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Page } from "./entities/page.entity";

@Injectable()
export class PageService {
  constructor(@InjectRepository(Page) private pageRepo: Repository<Page>) {}

  create(page: CreatePageDto): Promise<CreatePageDto> {
    return this.pageRepo.save(page);
  }

  async getAll(): Promise<Page[]> {
    return this.pageRepo.find();
  }

  async getById(id: string): Promise<Page> {
    return this.pageRepo.findOne(id);
  }

  async update(page:UpdatePageDto): Promise<UpdatePageDto> {
    await this.getById(page.id);
    return this.pageRepo.save(page);
  }

  delete(id: string) {
   this.pageRepo.delete(id)
  }
}
