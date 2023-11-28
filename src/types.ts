export type Product = {
  _id: string
  name: string
  price: number
  slug: string
  description: string
  sold: number
  quantity: number
  createdAt?: NativeDate
  updatedAt?: NativeDate
}
export type productInput = Omit<Product, ' slug'>

export interface Error {
  status?: number
  message?: string
}
///type because we are using typescriot 
export type EmailDataType = {
  email:string;
  subject: string;
  html: string;
}

