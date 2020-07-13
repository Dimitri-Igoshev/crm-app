import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../order-page/order.service'
import { Order } from '../../common/interfaces/order'

@Component({
  selector: 'app-history-dialog',
  templateUrl: './history-dialog.component.html',
  styleUrls: ['./history-dialog.component.scss']
})
export class HistoryDialogComponent implements OnInit {

  order: Order

  constructor(private orderService: OrderService) { }

  ngOnInit(): void {
    this.order = this.orderService.getCurrentOrder()
  }

  computeTotalPrice() {
    return this.order.list.reduce((acc, el) => {
      return acc += el.quantity * el.cost
    }, 0)
  }

}
