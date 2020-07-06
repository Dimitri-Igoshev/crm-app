import { Component, OnInit } from '@angular/core'
import { CategoriesService } from '../common/services/categories.service'
import { Observable } from 'rxjs'
import { Category } from '../common/interfaces/category'

@Component({
  selector: 'app-categories-page',
  templateUrl: './categories-page.component.html',
  styleUrls: ['./categories-page.component.scss']
})
export class CategoriesPageComponent implements OnInit {

  constructor(private categoriesService: CategoriesService) {
  }

  categories$: Observable<Category[]>
  categories: Category [] = []

  ngOnInit(): void {
    this.categories$ = this.categoriesService.fetch()
  }

}
