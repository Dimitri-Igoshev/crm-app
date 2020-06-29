import { Component, OnDestroy, OnInit } from '@angular/core'
import { AuthService } from '../common/services/auth.service'
import { ActivatedRoute, Params, Router } from '@angular/router'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { Subscription } from 'rxjs'
import { MatSnackBar } from '@angular/material/snack-bar'

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss']
})
export class RegisterPageComponent implements OnInit, OnDestroy {

  constructor(private auth: AuthService,
              private router: Router,
              private route: ActivatedRoute,
              private _snackBar: MatSnackBar) {
  }

  form: FormGroup
  authSub: Subscription

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(8)])
    })

    this.route.queryParams.subscribe((params: Params) => {
      if (params['registered']) {
        this.openSnackBar('Now you can log in using your data.', 'Close')
      } else if (params['accessDenied']) {
        this.openSnackBar('First, log in to the system.', 'Close')
      }
    })
  }

  getEmailErrorMessage() {
    if (this.form.get('email').hasError('required')) {
      return 'you must enter a value'
    }

    return this.form.get('email').hasError('email') ? 'not a valid email' : ''
  }

  getPasswordMessage() {
    if (this.form.get('password').hasError('required')) {
      return 'you must enter a value'
    } else {
      return `enter yet ${8 - this.form.get('password').value.length} characters`
    }
  }

  onSubmit() {
    this.form.disable()
    this.authSub = this.auth.register(this.form.value).subscribe(
      () => this.router.navigate(['/login'], {
        queryParams: { registered: true }
      }),
      error => {
        this.openSnackBar(error.error.message, 'Close')
        this.form.enable()
      }
    )
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 5000
    })
  }

  ngOnDestroy(): void {
    if (this.authSub) this.authSub.unsubscribe()
  }

}
