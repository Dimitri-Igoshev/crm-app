import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core'
import { OrdersService } from '../common/services/orders.service'
import { Subscription } from 'rxjs'
import { Order } from '../common/interfaces/order'

const LIMIT_STEP = 5

@Component({
  selector: 'app-history-page',
  templateUrl: './history-page.component.html',
  styleUrls: ['./history-page.component.scss']
})
export class HistoryPageComponent implements OnInit, OnDestroy {

  isFilterOpened: boolean = false
  ordersSub: Subscription
  offset = 0
  limit = LIMIT_STEP
  orders: Order[] = []
  isLoaded: boolean = false
  noMoreOrders: boolean = false

  constructor(private ordersService: OrdersService) {
  }

  ngOnInit(): void {
    this.fetch()
  }

  ngOnDestroy(): void {
    if (this.ordersSub) this.ordersSub.unsubscribe()
  }

  private fetch() {
    const params = {
      offset: this.offset,
      limit: this.limit
    }
    this.ordersSub = this.ordersService.fetch(params).subscribe(orders => {
        this.orders = orders
        this.noMoreOrders = orders.length === 0 ? true : false
      },
      error => console.log(error),
      () => this.isLoaded = true
    )
  }

  loadMore() {
    this.offset += LIMIT_STEP
    this.fetch()
  }

}
