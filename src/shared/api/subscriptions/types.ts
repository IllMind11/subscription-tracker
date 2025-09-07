import type { BillingPeriod } from '~/shared/types'

export type SubscriptionStatus = 'active' | 'paused' | 'cancelled'

export interface IGetSubscriptionsParams {
  category_id?: number
}

export interface ICreateSubscriptionPayload {
  file_id: number
  billing_period: BillingPeriod
  category_id: number
  currency: string
  notes?: string
  price: number
  service_name: string
  start_date: string

}

export interface ISubscription {
  billing_period: BillingPeriod
  category_id: number
  category_name: string
  created_at: string
  currency: string
  file_id: number
  id: number
  next_billing_date: string
  notes: string
  price: number
  service_name: string
  start_date: string
  status: SubscriptionStatus
}

export interface ISubscriptionsResponse {
  data: ISubscription[]
  limit: number
  page: number
  total: number
  total_pages: number
}

export interface IUpdateSubscriptionPayload extends Partial<ICreateSubscriptionPayload> {
  id: number
  status?: SubscriptionStatus
}
