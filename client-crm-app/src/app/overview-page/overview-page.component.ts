import { Component, OnInit } from '@angular/core';
import { AnalyticsService } from '../common/services/analytics.service'
import { Observable } from 'rxjs'
import { OverviewPage } from '../common/interfaces/overview-page'

@Component({
  selector: 'app-overview-page',
  templateUrl: './overview-page.component.html',
  styleUrls: ['./overview-page.component.scss']
})
export class OverviewPageComponent implements OnInit {

  data$: Observable<OverviewPage>
  date: Date = new Date

  constructor(private analyticsService: AnalyticsService) { }

  ngOnInit(): void {
    this.date.setDate(this.date.getDate() - 1)
    this.data$ = this.analyticsService.getOverview().pipe()
  }

}
