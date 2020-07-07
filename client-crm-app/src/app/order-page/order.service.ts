import { Injectable } from '@angular/core'
import { Position } from '../common/interfaces/position'
import { OrderPosition } from '../common/interfaces/order'

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  public list: OrderPosition[] = []
  public price = 0

  add(position: Position) {
    const orderPosition: OrderPosition = Object.assign({}, {
      name: position.name,
      cost: position.cost,
      quantity: position.quantity,
      _id: position._id
    })

    const isInOrder = this.list.find(el => el._id === position._id)

    if (isInOrder) {
      isInOrder.quantity += position.quantity
    } else {
      this.list.push(orderPosition)
    }

  }

  remove(position: OrderPosition) {
    this.list = this.list.filter(el => el._id !== position._id)
    this.price -= position.cost * position.quantity
  }

  clear() {
    this.list = []
    this.price = 0
  }

  getTotalPrice() {
    this.price = 0
    this.list.forEach(el => {
      this.price += el.cost * el.quantity
    })
    return this.price
  }


}
