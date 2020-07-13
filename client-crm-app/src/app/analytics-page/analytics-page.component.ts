import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core'
import { AnalyticsService } from '../common/services/analytics.service'
import { AnalyticsPage } from '../common/interfaces/analytics-page'
import { Subscription } from 'rxjs'
import { Chart } from 'chart.js'

@Component({
  selector: 'app-analytics-page',
  templateUrl: './analytics-page.component.html',
  styleUrls: ['./analytics-page.component.scss']
})
export class AnalyticsPageComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('revenue') revenueRef: ElementRef
  @ViewChild('orders') ordersRef: ElementRef

  analyticsSub: Subscription
  average: number
  pending: boolean = true

  constructor(private analyticsService: AnalyticsService) {
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    const revenueConfig: any = {
      label: 'Revenue',
      color: '#ff4081'
    }

    const ordersConfig: any = {
      label: 'Orders',
      color: '#37479F'
    }

    this.analyticsSub = this.analyticsService.getAnalytics().subscribe((data: AnalyticsPage) => {
      this.average = data.average

      revenueConfig.labels = data.chart.map(item => item.label)
      revenueConfig.data = data.chart.map(item => item.revenue)

      ordersConfig.labels = data.chart.map(item => item.label)
      ordersConfig.data = data.chart.map(item => item.order)

      const revenueCtx = this.revenueRef.nativeElement.getContext('2d')
      const ordersCtx = this.ordersRef.nativeElement.getContext('2d')

      new Chart(revenueCtx, createChatConfig(revenueConfig))

      new Chart(ordersCtx, createChatConfig(ordersConfig))

      this.pending = false
    })
  }

  ngOnDestroy(): void {
    if (this.analyticsSub) this.analyticsSub.unsubscribe()
  }

}

function createChatConfig({labels, data, label, color}) {
  return {
    type: 'line',
    options: {
      responsive: true
    },
    data: {
      labels,
      datasets: [
        {
          label, data,
          borderColor: color,
          steppedLine: false,
          fill: false
        }
      ]
    }
  }
}
