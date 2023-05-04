import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Schema } from 'mongoose';
import { Product, ProductDocument } from './schema/product.schema';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
  ) {}

  async create(createProductDto: CreateProductDto) {
    const product = await this.productModel.create(createProductDto);
    return product;
  }

  async findAll() {
    const list = await this.productModel.find();
    return list;
  }

  async findOne(id: Schema.Types.ObjectId) {
    const product = await this.productModel.findById(id);
    return product;
  }

  async update(id: Schema.Types.ObjectId, updateProductDto: UpdateProductDto) {
    return await this.productModel.updateOne({ _id: id }, updateProductDto);
  }

  async remove(id: Schema.Types.ObjectId) {
    return await this.productModel.findByIdAndDelete(id);
  }
}
