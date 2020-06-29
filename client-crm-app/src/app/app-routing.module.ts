import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { AuthLayoutComponent } from './common/layouts/auth-layout/auth-layout.component'
import { MainLayoutComponent } from './common/layouts/main-layout/main-layout.component'
import { LoginPageComponent } from './login-page/login-page.component'
import { RegisterPageComponent } from './register-page/register-page.component'
import { AuthGuard } from './common/classes/auth.guard'

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
    children: []
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
