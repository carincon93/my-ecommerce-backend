export interface CartItem {
    id: string
    name: string
    slug: string
    price: number
    image: string
    quantity: number
    stock: Stock
}

export interface Stock {
    id: string
    productId: string
    size: string
    quantity: number
    sku: string
}
