import { CategoriesService } from './categories.service';
import { Category } from './category.schema';
export declare class CategoriesController {
    private readonly categoriesService;
    constructor(categoriesService: CategoriesService);
    create(category: Category): Promise<Category>;
    findAll(): Promise<Category[]>;
    findOne(id: string): Promise<Category>;
    update(id: string, category: Category): Promise<Category>;
    remove(id: string): Promise<void>;
}
