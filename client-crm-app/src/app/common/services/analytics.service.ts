import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { OverviewPage } from '../interfaces/overview-page'
import { Observable } from 'rxjs'
import { AnalyticsPage } from '../interfaces/analytics-page'

@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {
  constructor(private http: HttpClient) { }

  getOverview(): Observable<OverviewPage> {
    return this.http.get<OverviewPage>('/api/analytics/overview')
  }

  getAnalytics(): Observable<AnalyticsPage> {
    return this.http.get<AnalyticsPage>('/api/analytics/analytics')
  }

}
