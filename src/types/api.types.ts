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

