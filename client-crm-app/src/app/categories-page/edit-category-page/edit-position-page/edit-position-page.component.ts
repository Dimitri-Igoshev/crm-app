import { Component, Input, OnDestroy, OnInit } from '@angular/core'
import { PositionsService } from '../../../common/services/positions.service'
import { Subscription } from 'rxjs'
import { MatDialog } from '@angular/material/dialog'
import { PositionDialogComponent } from './position-dialog/position-dialog.component'
import { Position } from '../../../common/interfaces/position'
import { CategoriesService } from '../../../common/services/categories.service'
import { MatSnackBar } from '@angular/material/snack-bar'
import { log } from 'util'

@Component({
  selector: 'app-edit-position-page',
  templateUrl: './edit-position-page.component.html',
  styleUrls: ['./edit-position-page.component.scss']
})
export class EditPositionPageComponent implements OnInit, OnDestroy {

  constructor(private positionsService: PositionsService,
              private dialog: MatDialog,
              public categoriesService: CategoriesService,
              private _snackBar: MatSnackBar) {
  }

  @Input('categoryId') categoryId: string
  positions: Position[] = []
  positionSub: Subscription
  removeSub: Subscription

  ngOnInit(): void {
    this.positionSub = this.positionsService.fetch(this.categoryId)
      .subscribe(positions => {
        this.positions = positions
        this.positionsService.setCurrentPositions(positions)
      }
    )
  }

  ngOnDestroy(): void {
    if (this.positionSub) this.positionSub.unsubscribe()
    if (this.removeSub) this.removeSub.unsubscribe()
  }

  openPositionDialog() {
    const dialogRef = this.dialog.open(PositionDialogComponent)
    this.categoriesService.setCurrentCategoryId(this.categoryId)
    this.positionsService.setIsNew(true)
  }

  onPositionSelect(position: Position) {
    const dialogRef = this.dialog.open(PositionDialogComponent)
    this.categoriesService.setCurrentCategoryId(this.categoryId)
    this.positionsService.setCurrentPosition(position)
    this.positionsService.setIsNew(false)
  }

  removePosition(position: Position) {
    this.removeSub = this.positionsService.remove(position).subscribe(
      () => {
        this.openSnackBar('Position was deleted', 'Close')
        this.positions = this.positions.filter(p => p._id !== position._id)
        this.positionsService.setCurrentPositions(this.positions)
      },
      error => {
        this.openSnackBar('Position was not deleted', 'Close')
      }
    )
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 3000
    })
  }

}
