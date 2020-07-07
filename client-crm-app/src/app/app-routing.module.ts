import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { AuthLayoutComponent } from './common/layouts/auth-layout/auth-layout.component'
import { MainLayoutComponent } from './common/layouts/main-layout/main-layout.component'
import { LoginPageComponent } from './login-page/login-page.component'
import { RegisterPageComponent } from './register-page/register-page.component'
import { AuthGuard } from './common/classes/auth.guard'
import { OverviewPageComponent } from './overview-page/overview-page.component'
import { AnalyticsPageComponent } from './analytics-page/analytics-page.component'
import { HistoryPageComponent } from './history-page/history-page.component'
import { OrderPageComponent } from './order-page/order-page.component'
import { CategoriesPageComponent } from './categories-page/categories-page.component'
import { EditCategoryPageComponent } from './categories-page/edit-category-page/edit-category-page.component'
import { OrderCategoriesComponent } from './order-page/order-categories/order-categories.component'
import { OrderPositionsComponent } from './order-page/order-positions/order-positions.component'

const routes: Routes = [
  {
    path: '', component: AuthLayoutComponent, children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: 'login', component: LoginPageComponent },
      { path: 'registration', component: RegisterPageComponent }
    ]
  },
  {
    path: '',
    component: MainLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'overview', component: OverviewPageComponent },
      { path: 'analytics', component: AnalyticsPageComponent },
      { path: 'history', component: HistoryPageComponent },
      { path: 'order', component: OrderPageComponent,
        children: [
          { path: '', component: OrderCategoriesComponent },
          { path: ':id', component: OrderPositionsComponent }
        ]
      },
      { path: 'categories', component: CategoriesPageComponent },
      { path: 'categories/new', component: EditCategoryPageComponent },
      { path: 'categories/:id', component: EditCategoryPageComponent }
    ]
  }
]

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {
}
