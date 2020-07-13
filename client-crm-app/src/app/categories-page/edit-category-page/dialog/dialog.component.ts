import { Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core'
import { CategoriesService } from '../../../common/services/categories.service'
import { ActivatedRoute, Router } from '@angular/router'
import { MatSnackBar } from '@angular/material/snack-bar'
import { Category } from '../../../common/interfaces/category'

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {

  constructor(private categoriesService: CategoriesService,
              private route: ActivatedRoute,
              private _snackBar: MatSnackBar,
              private router: Router) {
  }

  currentCategory: Category

  ngOnInit(): void {
    this.currentCategory = this.categoriesService.getCurrentCategory()
  }

  removeCategory() {
    this.categoriesService.remove(this.currentCategory._id)
      .subscribe(
        response => this.openSnackBar(response.message, 'Close'),
        error => this.openSnackBar(error.error.message, 'Close'),
        () => {
          this.router.navigate(['/categories'])
        }
      )
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 3000
    })
  }

}
