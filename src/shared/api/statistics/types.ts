export interface IStatistics {
  active_subscriptions: number
  spending_by_category: {
    category_id: number
    category_name: string
    count: number
    currency: string
    total_amount: number
  }[]
  spending_by_currency: {
    count: number
    currency: string
    total_amount: number
  }[]
  subscriptions_by_period: {
    billing_period: number
    count: number
    period_name: string
  }[]
  total_monthly_spending: number
  total_subscriptions: number
  total_yearly_spending: number
  upcoming_renewals: {
    category_name: string
    currency: string
    days_until_renewal: number
    id: number
    next_billing_date: string
    price: number
    service_name: string
  }[]
}

export interface IGetStatisticsParams {
  date_from?: string
  date_to?: string
  currency?: string
}
