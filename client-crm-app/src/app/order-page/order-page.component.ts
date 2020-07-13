import { Component, OnInit } from '@angular/core'
import { NavigationEnd, Router } from '@angular/router'
import { MatDialog } from '@angular/material/dialog'
import { OrderDialogComponent } from './order-dialog/order-dialog.component'
import { OrderService } from './order.service'
import { OrderPosition } from '../common/interfaces/order'
import { Subscription } from 'rxjs'

@Component({
  selector: 'app-order-page',
  templateUrl: './order-page.component.html',
  styleUrls: ['./order-page.component.scss']
})
export class OrderPageComponent implements OnInit {

  constructor(private router: Router,
              private dialog: MatDialog,
              private orderService: OrderService) {
  }

  isRoot: boolean
  list: OrderPosition[] = []

  ngOnInit(): void {
    this.isRoot = this.router.url === '/order'
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.isRoot = this.router.url === '/order'
      }
    })

    this.list = this.orderService.list
  }

  completeOrder() {
    this.dialog.open(OrderDialogComponent)
  }
}
