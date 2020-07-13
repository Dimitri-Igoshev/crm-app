import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { Order } from '../../common/interfaces/order'
import { MatDialog } from '@angular/material/dialog'
import { HistoryDialogComponent } from '../history-dialog/history-dialog.component'
import { OrderService } from '../../order-page/order.service'

@Component({
  selector: 'app-history-list',
  templateUrl: './history-list.component.html',
  styleUrls: ['./history-list.component.scss']
})
export class HistoryListComponent implements OnInit {

  @Input() orders: Order[]
  @Input() noMoreOrders: boolean
  @Output() onLoadMore = new EventEmitter()
  displayedColumns: string[] = ['order', 'date', 'time', 'amount']
  dataSource = []

  constructor(private dialog: MatDialog,
              private orderService: OrderService) {
  }

  ngOnInit(): void {
    this.dataSource = this.orders
  }

  loadMore() {
    this.onLoadMore.emit()

    setTimeout(() => this.dataSource = [...this.dataSource, ...this.orders], 100)
  }

  computePrice(order: Order): number {
    return order.list.reduce((acc, el) => {
      return acc += el.quantity * el.cost
    }, 0)
  }

  selectOrder(order: Order) {
    this.dialog.open(HistoryDialogComponent)
    this.orderService.setCurrentOrder(order)
  }
}


