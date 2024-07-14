import { Test, TestingModule } from '@nestjs/testing'
import { ProductController } from './product.controller'
import * as httpMock from 'node-mocks-http'

describe('ProductController', () => {
  let controller: ProductController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductController]
    }).compile()

    controller = module.get<ProductController>(ProductController)
  })

  it('should can get product by id', async () => {
    const response = httpMock.createResponse()
    controller.getProductById(5, response)
    expect(response.statusCode).toBe(200)
    expect(response._getJSONData()).toEqual({
      status: 'Failed',
      message: 'Product with id 5 not found'
    })
  })

  it('should can get product by id', async () => {
    const response = httpMock.createResponse()
    controller.getProductById(1, response)
    expect(response.statusCode).toBe(200)
    expect(response._getJSONData()).toEqual({
      status: 'Success',
      message: 'Succes get product with id 1',
      data: {
        id: 1,
        product: 'Sepatu Vans',
        price: 500000,
        size: 'XL'
      }
    })
  })

  it('should can get all products', async () => {
    const response = httpMock.createResponse()
    controller.getProducts(response)
    expect(response.statusCode).toBe(200)
    expect(response._getJSONData()).toEqual({
      status: 'Success',
      message: 'Success get all products',
      data: [
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
    })
  })
})
