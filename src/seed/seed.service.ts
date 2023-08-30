import { Injectable } from '@nestjs/common';
import { ProductsService } from 'src/products/products.service';
import { initialData } from './data/seed-data';

@Injectable()
export class SeedService {
  constructor(private readonly productoService: ProductsService) {}

  async runSeed() {
    this.insertProducts();
    return 'SEED EXECUTED';
  }

  private async insertProducts() {
    await this.productoService.deleteAllProducts();
    const products = initialData.products;
    const insertPromise = [];
    products.forEach((product) => {
      insertPromise.push(this.productoService.create(product));
    });
    await Promise.all(insertPromise);
    return true;
  }
}
