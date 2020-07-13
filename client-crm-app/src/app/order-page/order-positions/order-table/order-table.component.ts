import { Component, OnInit } from '@angular/core'
import { OrderService } from '../../order.service'
import { OrderPosition } from '../../../common/interfaces/order'

@Component({
  selector: 'app-order-table',
  templateUrl: './order-table.component.html',
  styleUrls: ['./order-table.component.scss']
})
export class OrderTableComponent implements OnInit {

  constructor(private orderService: OrderService) {
  }

  displayedColumns: string[] = ['name', 'cost', 'quantity']
  dataSource: OrderPosition[] = []
  orderPrice: number = 0

  ngOnInit(): void {
    this.dataSource = this.orderService.list
    this.orderPrice = this.orderService.getTotalPrice()
  }

  removePosition(element: OrderPosition) {
    this.orderService.remove(element)
    this.dataSource = this.orderService.list
    this.orderPrice = this.orderService.price
  }
}
