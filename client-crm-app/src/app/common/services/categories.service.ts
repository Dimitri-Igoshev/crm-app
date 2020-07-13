import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Category } from '../interfaces/category'
import { Observable, Subscription } from 'rxjs'
import { Message } from '../interfaces/message'

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private http: HttpClient) {
  }

  private currentCategory: Category
  private currentCategoryId: string

  fetch(): Observable<Category[]> {
    return this.http.get<Category[]>('/api/category')
  }

  findById(id: string): Observable<Category>{
    return this.http.get<Category>(`/api/category/${id}`)
  }

  create(title: string, image?: File): Observable<Category> {
    const fd = new FormData()

    fd.append('title', title)
    if (image) fd.append('image', image, image.name)

    return this.http.post<Category>('/api/category', fd)
  }

  update(id: string, title: string, image?: File): Observable<Category> {
    const fd = new FormData()

    fd.append('title', title)
    if (image) fd.append('image', image, image.name)

    return this.http.patch<Category>(`/api/category/${id}`, fd)
  }
  
  remove(id: string): Observable<Message> {
    return this.http.delete<Message>(`/api/category/${id}`)
  }


  getCurrentCategory(): Category {
    return this.currentCategory
  }

  setCurrentCategory(value: Category) {
    this.currentCategory = value
  }

  getCurrentCategoryId(): string {
    return this.currentCategoryId
  }

  setCurrentCategoryId(id: string) {
    this.currentCategoryId = id
  }

}
