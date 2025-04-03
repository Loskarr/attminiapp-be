import { TagService } from './tag.service';
import { Tag } from './tag.schema';
export declare class TagController {
  private readonly tagService;
  constructor(tagService: TagService);
  create(tag: Tag): Promise<Tag>;
  findAll(): Promise<Tag[]>;
  findOne(id: string): Promise<Tag>;
  update(id: string, tag: Tag): Promise<Tag>;
  remove(id: string): Promise<void>;
}
