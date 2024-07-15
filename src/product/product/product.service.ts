import { Injectable } from '@nestjs/common'

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

@Injectable()
export class ProductService {
  getProductById(id: number) {
    const product = products.find((item) => item['id'] == id)
    return product
  }

  getAllProducts() {
    return products
  }

  checkProduct(product: string, price: number, size: string) {
    if (product == null || price == null || size == null) return true
    else return false
  }
}
