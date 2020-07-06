import { Component, OnInit } from '@angular/core'
import { AuthService } from '../../services/auth.service'
import { Router } from '@angular/router'

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent implements OnInit {

  constructor(private auth: AuthService,
              private router: Router) {
  }

  links = [
    { url: '/overview', name: 'Overview' },
    { url: '/analytics', name: 'Analytics' },
    { url: '/history', name: 'History' },
    { url: '/order', name: 'Add order' },
    { url: '/categories', name: 'Assortment' }
  ]

  focus: boolean = false

  ngOnInit(): void {
  }

  logout() {
    this.auth.logout()
    this.router.navigate(['/login'])
  }

  onFocus() {
    this.focus = true
    setTimeout(() => this.focus = false, 3000)
  }
}
