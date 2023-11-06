type ResponseData = Candy | Tag

export type Response<T extends ResponseData> = SuccessResponse<T> | FailResponse | ErrorResponse

type SuccessResponse<T> = {
  status: 'success',
  data: T[] | TaggedCandy<T>
}

type ErrorResponse = {
  status: 'error',
  message: 'string'
}

type FailResponse = {
  status: 'fail',
  data: Error[]
}

interface Error {
  [key: string] : string[]
}

type TaggedCandy<T> = Tag & {products: T[]} 

export type CheckoutBasketItem = {
  product_id: number,
  qty: number,
  item_price: number,
  item_total: number
}

export interface OrderData {
  id: number
}

export interface Order {
  customer_first_name: string,
	customer_last_name: string,
	customer_address: string,
	customer_postcode: string,
	customer_city: string,
	customer_email: string,
	customer_phone: string,
	order_total: number,
  order_items: Item[]
}

export interface Item {
  product_id: number,
  qty: number,
  item_price: number,
  item_total: number
}

export interface Candy {
  id: number,
  name: string,
  price: number,
  on_sale: boolean,
  images: Images,
  stock_status: 'instock' | 'outofstock',
  stock_quantity: number,
  tags?: Tag[],
}

interface Images {
  thumbnail: string,
  large: string
}

interface Tag {
  id: number,
  name: string,
  slug: string
}

