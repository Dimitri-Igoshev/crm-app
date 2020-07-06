import { Component, ElementRef, OnInit, ViewChild } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { ActivatedRoute, Params } from '@angular/router'
import { CategoriesService } from '../../common/services/categories.service'
import { switchMap } from 'rxjs/operators'
import { of } from 'rxjs'
import { MatSnackBar } from '@angular/material/snack-bar'
import { Category } from '../../common/interfaces/category'
import { MatDialog } from '@angular/material/dialog'
import { DialogComponent } from './dialog/dialog.component'

@Component({
  selector: 'app-edit-category-page',
  templateUrl: './edit-category-page.component.html',
  styleUrls: ['./edit-category-page.component.scss']
})
export class EditCategoryPageComponent implements OnInit {
  constructor(private route: ActivatedRoute,
              private categoriesService: CategoriesService,
              private _snackBar: MatSnackBar,
              public dialog: MatDialog) {
  }

  @ViewChild('fileInput') inputRef: ElementRef

  form: FormGroup
  image: File
  imagePreview: string | ArrayBuffer
  isNew: boolean = true
  currentCategory: Category
  title: string

  ngOnInit(): void {
    this.form = new FormGroup({
      title: new FormControl(null, [Validators.required])
    })

    this.form.disable()

    this.route.params
      .pipe(
        switchMap(
          (params: Params) => {
            if (params['id']) {
              this.isNew = false
              return this.categoriesService.findById(params['id'])
            }

            return of(null)
          }
        )
      )
      .subscribe(
        (category: Category) => {
          if (category) {
            this.currentCategory = category
            this.form.patchValue({
              title: category.title
            })
            this.imagePreview = category.imageSrc
            this.title = `Edit ${this.currentCategory.title} category`
          }

          this.form.enable()
        },
        error => {
          this.openSnackBar(error.error.message, 'Close')
        }
      )
  }

  getTitleMessage() {
    if (this.form.get('title').hasError('required')) {
      return 'you must enter a value'
    }
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 5000
    })
  }

  triggerClick() {
    this.inputRef.nativeElement.click()
  }

  onFileUpload(event: any) {
    const file = event.target.files[0]
    this.image = file
    const reader = new FileReader()
    reader.onload = () => {
      this.imagePreview = reader.result
    }
    reader.readAsDataURL(file)
  }

  onSubmit() {
    let obs$
    this.form.disable()
    if (this.isNew) {
      obs$ = this.categoriesService.create(this.form.value.title, this.image)
    } else {
      obs$ = this.categoriesService.update(this.currentCategory._id, this.form.value.title, this.image)
    }

    obs$.subscribe(
      category => {
        this.currentCategory = category
        this.form.enable()
        this.openSnackBar('Changes were saved.', 'Close')
      },
      error => {
        this.form.enable()
        this.openSnackBar(error.error.message, 'Close')
      }
    )
  }

  removeCategory() {
    this.categoriesService.setCurrentCategory(this.currentCategory)
    this.dialog.open(DialogComponent)
  }
}
