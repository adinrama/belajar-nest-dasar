import { Body, Controller, Get, Header, HttpCode, Param, Post, Res } from '@nestjs/common'
import { Response } from 'express'

const products = [
  {
    id: 1,
    product: 'Sepatu Vans',
    price: 500000,
    size: 'XL'
  },
  {
    id: 2,
    product: 'Tas Merk Dior',
    price: 2000000,
    size: 'L'
  }
]

@Controller('/api/products')
export class ProductController {
  @Get('/:id')
  @Header('Content-Type', 'application/json')
  @HttpCode(200)
  async getProductById(@Param('id') id: number, @Res() response: Response): Promise<object> {
    products.forEach((product) => {
      if (product['id'] == id) {
        return response.json({
          status: 'Success',
          message: `Succes get product with id ${id}`,
          data: product
        })
      }
    })
    return response.json({
      status: 'Failed',
      message: `Product with id ${id} not found`
    })
  }

  @Get()
  @Header('Content-Type', 'application/json')
  @HttpCode(200)
  async getProducts(@Res() response: Response): Promise<object> {
    return response.json({
      status: 'Success',
      message: 'Success get all products',
      data: products
    })
  }

  @Post()
  @Header('Content-Type', 'application/json')
  @HttpCode(201)
  async setProduct(
    @Body('id') id: number,
    @Body('product') product: string,
    @Body('price') price: number,
    @Body('size') size: string,
    @Res() response: Response
  ): Promise<object> {
    if (product == null || price == null || size == null) {
      return response.json({
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
}
