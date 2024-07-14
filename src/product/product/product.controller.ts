import { Body, Controller, Delete, Get, Header, HttpCode, Param, Patch, Post, Res } from '@nestjs/common'
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
    const product = products.find((item) => item['id'] == id)
    if (product) {
      return response.json({
        status: 'Success',
        message: `Succes get product with id ${id}`,
        data: product
      })
    }
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

  @Patch('/:id')
  @HttpCode(200)
  async editProduct(
    @Param('id') id: number,
    @Body('product') product: string,
    @Body('price') price: number,
    @Body('size') size: string,
    @Res() response: Response
  ): Promise<object> {
    const item = products.find((item) => item['id'] == id)
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
    return response.json({
      status: 'Failed',
      message: `Product with id ${id} not found`
    })
  }

  @Delete('/:id')
  @HttpCode(200)
  async deleteProduct(@Param('id') id: number, @Res() response: Response): Promise<object> {
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
    return response.json({
      status: 'Failed',
      message: `Product with id ${id} not found`
    })
  }
}
