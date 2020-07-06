import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'

import { AppComponent } from './app.component'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { LoginPageComponent } from './login-page/login-page.component'
import { AppRoutingModule } from './app-routing.module'
import { AuthLayoutComponent } from './common/layouts/auth-layout/auth-layout.component'
import { MainLayoutComponent } from './common/layouts/main-layout/main-layout.component'
import { MatToolbarModule } from '@angular/material/toolbar'
import { MatButtonToggleModule } from '@angular/material/button-toggle'
import { MatButtonModule } from '@angular/material/button'
import { MatCardModule } from '@angular/material/card'
import { MatIconModule } from '@angular/material/icon'
import { MatInputModule } from '@angular/material/input'
import { ReactiveFormsModule } from '@angular/forms'
import { RegisterPageComponent } from './register-page/register-page.component'
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http'
import { TokenInterceptor } from './common/classes/token.interceptor'
import { MatSnackBarModule } from '@angular/material/snack-bar'
import { OverviewPageComponent } from './overview-page/overview-page.component'
import { MatSidenavModule } from '@angular/material/sidenav'
import { MatAutocompleteModule } from '@angular/material/autocomplete'
import { AnalyticsPageComponent } from './analytics-page/analytics-page.component'
import { HistoryPageComponent } from './history-page/history-page.component'
import { OrderPageComponent } from './order-page/order-page.component'
import { CategoriesPageComponent } from './categories-page/categories-page.component'
import { MatListModule } from '@angular/material/list';
import { LoaderComponent } from './common/components/loader/loader.component'
import { MatProgressBarModule } from '@angular/material/progress-bar'
import { MatTooltipModule } from '@angular/material/tooltip';
import { EditCategoryPageComponent } from './categories-page/edit-category-page/edit-category-page.component'
import { DragDropModule } from '@angular/cdk/drag-drop';
import { EditPositionPageComponent } from './categories-page/edit-category-page/edit-position-page/edit-position-page.component'
import { MatDialogModule } from '@angular/material/dialog';
import { DialogComponent } from './categories-page/edit-category-page/dialog/dialog.component'
import { MatTableModule } from '@angular/material/table';
import { PositionDialogComponent } from './categories-page/edit-category-page/edit-position-page/position-dialog/position-dialog.component'

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    AuthLayoutComponent,
    MainLayoutComponent,
    RegisterPageComponent,
    OverviewPageComponent,
    AnalyticsPageComponent,
    HistoryPageComponent,
    OrderPageComponent,
    CategoriesPageComponent,
    LoaderComponent,
    EditCategoryPageComponent,
    EditPositionPageComponent,
    DialogComponent,
    PositionDialogComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MatToolbarModule,
    MatButtonToggleModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatInputModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatSnackBarModule,
    MatSidenavModule,
    MatAutocompleteModule,
    MatListModule,
    MatProgressBarModule,
    MatTooltipModule,
    DragDropModule,
    MatDialogModule,
    MatTableModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      multi: true,
      useClass: TokenInterceptor
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
