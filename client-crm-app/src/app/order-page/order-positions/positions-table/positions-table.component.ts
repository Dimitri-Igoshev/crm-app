import { Component, OnDestroy, OnInit } from '@angular/core'
import { OrderService } from '../../order.service'
import { ActivatedRoute } from '@angular/router'
import { PositionsService } from '../../../common/services/positions.service'
import { Subscription } from 'rxjs'
import { Position } from '../../../common/interfaces/position'
import { MatSnackBar } from '@angular/material/snack-bar'

@Component({
  selector: 'app-positions-table',
  templateUrl: './positions-table.component.html',
  styleUrls: ['./positions-table.component.scss']
})
export class PositionsTableComponent implements OnInit, OnDestroy {

  constructor(private route: ActivatedRoute,
              private positionsService: PositionsService,
              private orderService: OrderService,
              private _snackBar: MatSnackBar) {
  }

  posSub: Subscription
  displayedColumns: string[] = ['name', 'cost', 'quantity']
  dataSource: Position[] = []

  ngOnInit(): void {
    const id = this.route.snapshot.params['id']
    this.posSub = this.positionsService.fetch(id)
      .subscribe(
        positions => {
          this.dataSource = positions
        },
        error => error.log(error),
        () => {
          this.dataSource.forEach(p => p.quantity = 1)
        }
      )
  }

  ngOnDestroy(): void {
    if (this.posSub) this.posSub.unsubscribe()
  }

  addToOrder(element: Position) {
    this.orderService.add(element)

    if (element.quantity === 1) {
      this.openSnackBar(`${element.name} was added to the order`, 'Close')
    } else {
      this.openSnackBar(`${element.quantity} ${element.name} were added to the order`, 'Close')
    }

    element.quantity = 1
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000
    })
  }

}
