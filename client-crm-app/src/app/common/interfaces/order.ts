export interface Order {
  _id?: string
  date?: Date
  order?: number
  user?: string
  list: OrderPosition[]
}

export interface OrderPosition {
  name: string
  cost: number
  quantity: number
  _id?: string
}
