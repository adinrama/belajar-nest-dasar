import { Body, Controller, Delete, Get, Header, HttpCode, Param, Patch, Post, Res } from '@nestjs/common'
import { Response } from 'express'
import { ProductService } from './product.service'

@Controller('/api/products')
export class ProductController {
  constructor(private service: ProductService) {}

  @Get('/:id')
  @Header('Content-Type', 'application/json')
  @HttpCode(200)
  async getProductById(@Param('id') id: number, @Res() response: Response): Promise<object> {
    const product = this.service.getProductById(id)
    if (product) {
      return response.json({
        status: 'Success',
        message: `Succes get product with id ${id}`,
        data: product
      })
    }
    return response.status(404).json({
      status: 'Failed',
      message: `Product with id ${id} not found`
    })
  }

  @Get()
  @Header('Content-Type', 'application/json')
  @HttpCode(200)
  async getProducts(@Res() response: Response): Promise<object> {
    const products = this.service.getAllProducts()
    return response.json({
      status: 'Success',
      message: 'Success get all products',
      data: products
    })
  }

  @Post()
  @HttpCode(201)
  async setProduct(
    @Body('id') id: number,
    @Body('product') product: string,
    @Body('price') price: number,
    @Body('size') size: string,
    @Res() response: Response
  ): Promise<object> {
    const validation = this.service.checkProduct(product, price, size)
    const products = this.service.getAllProducts()
    if (validation) {
      return response.status(422).json({
        status: 'Failed',
        message: 'You must fill out all the sections'
      })
    }
    id = products.length + 1
    products.push({ id, product, price, size })
    return response.json({
      status: 'Success',
      message: 'Success add new product',
      data: { id, product, price, size }
    })
  }

  @Patch('/:id')
  @HttpCode(200)
  async editProduct(
    @Param('id') id: number,
    @Body('product') product: string,
    @Body('price') price: number,
    @Body('size') size: string,
    @Res() response: Response
  ): Promise<object> {
    const item = this.service.getProductById(id)
    if (item) {
      if (product !== undefined) item['product'] = product
      if (price !== undefined) item['price'] = price
      if (size !== undefined) item['size'] = size
      return response.json({
        status: 'Success',
        message: `Success edit product with id ${id}`,
        data: item
      })
    }
    return response.status(404).json({
      status: 'Failed',
      message: `Product with id ${id} not found`
    })
  }

  @Delete('/:id')
  @HttpCode(200)
  async deleteProduct(@Param('id') id: number, @Res() response: Response): Promise<object> {
    const products = this.service.getAllProducts()
    let i = 0
    for (i; i < products.length; i++) {
      if (products[i]['id'] == id) {
        products.splice(i, 1)
        return response.json({
          status: 'Success',
          message: `Success delete product with id ${id}`
        })
      }
    }
    return response.status(404).json({
      status: 'Failed',
      message: `Product with id ${id} not found`
    })
  }
}
