import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { PositionsService } from '../../../../common/services/positions.service'
import { CategoriesService } from '../../../../common/services/categories.service'
import { Position } from '../../../../common/interfaces/position'
import { MatSnackBar } from '@angular/material/snack-bar'
import { Router } from '@angular/router'
import { Subscription } from 'rxjs'

@Component({
  selector: 'app-position-dialog',
  templateUrl: './position-dialog.component.html',
  styleUrls: ['./position-dialog.component.scss']
})
export class PositionDialogComponent implements OnInit, OnDestroy {

  constructor(private positionsService: PositionsService,
              private categoriesService: CategoriesService,
              private _snackBar: MatSnackBar) { }

  form: FormGroup
  isNew: boolean = true
  currentCategoryId: string
  positionSub: Subscription
  currentPosition: Position
  positions: Position[] = []


  ngOnInit(): void {
    this.currentCategoryId = this.categoriesService.getCurrentCategoryId()
    this.positions = this.positionsService.getCurrentPositions()
    this.currentPosition = this.positionsService.currentPosition
    this.isNew = this.positionsService.getIsNew()

    this.form = new FormGroup({
      title: new FormControl(null, [Validators.required]),
      price: new FormControl(null, [Validators.required, Validators.min(1)])
    })

    if (!this.isNew) {
      this.form.patchValue({
        title: this.currentPosition.name,
        price: this.currentPosition.cost
      })
    }
  }

  getTitleMessage() {
    if (this.form.get('title').hasError('required')) {
      return 'you must enter a value'
    }
  }

  getPriceMessage() {
    if (this.form.get('price').hasError('required')) {
      return 'you must enter a value'
    }

    return 'the price cannot be less than one'
  }

  onSubmit() {
    this.form.disable()

    const newPosition: Position = {
      name: this.form.value.title,
      cost: this.form.value.price,
      category: this.currentCategoryId
    }

    if (this.isNew) {
      this.positionSub = this.positionsService.create(newPosition).subscribe(
        position => {
          this.openSnackBar('Position was created', 'Close')
          this.positions.push(position)
          this.positionsService.setCurrentPositions(this.positions)
        },
        error => this.openSnackBar(error.error.message, 'Close'),
        () => this.form.enable()
      )
    } else if (!this.isNew) {
      newPosition._id = this.currentPosition._id
      this.positionSub = this.positionsService.update(newPosition).subscribe(
        position => {
          this.openSnackBar('Position was updated', 'Close')
          const idx = this.positions.findIndex(p => p._id === this.currentPosition._id)
          this.positions[idx] = position
          this.positionsService.setCurrentPositions(this.positions)
        },
        error => this.openSnackBar(error.error.message, 'Close'),
        () => this.form.enable()
      )
    }

  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 3000
    })
  }

  ngOnDestroy(): void {
    if (this.positionSub) this.positionSub.unsubscribe()
  }

}
