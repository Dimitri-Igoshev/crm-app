import { Component, OnDestroy, OnInit } from '@angular/core'
import { OrderService } from '../order.service'
import { Order, OrderPosition } from '../../common/interfaces/order'
import { OrdersService } from '../../common/services/orders.service'
import { MatSnackBar } from '@angular/material/snack-bar'
import { Subscription } from 'rxjs'

@Component({
  selector: 'app-order-dialog',
  templateUrl: './order-dialog.component.html',
  styleUrls: ['./order-dialog.component.scss']
})
export class OrderDialogComponent implements OnInit, OnDestroy {

  constructor(private orderService: OrderService,
              private orderHttpService: OrdersService,
              private _snackBar: MatSnackBar) {
  }

  list: OrderPosition[] = []
  pending: boolean = false
  orderSub: Subscription

  ngOnInit(): void {
    this.list = this.orderService.list
  }

  ngOnDestroy(): void {
    if (this.orderSub) this.orderSub.unsubscribe()
  }

  submit() {
    this.pending = true

    const order: Order = {
      list: this.orderService.list.map(el => {
        delete el._id
        return el
      })
    }

    this.orderSub = this.orderHttpService.create(order).subscribe(
      newOrder => {
        this.openSnackBar(`Your order №${newOrder.order} was received`, 'Close')
      },
      error => {
        this.openSnackBar(error.error.message || 'Error, try again', 'Close')
      },
      () => {
        this.orderService.clear()
        this.pending = false
      }
    )
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 3000
    })
  }

}
