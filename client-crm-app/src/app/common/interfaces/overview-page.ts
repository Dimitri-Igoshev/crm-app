export interface OverviewPage {
  revenue: OverviewPageItem,
  orders: OverviewPageItem
}

export interface OverviewPageItem {
  percent: number
  compare: number
  yesterday: number
  isHigher: boolean
}
