import type { ICreateSubscriptionPayload, IGetSubscriptionsParams, ISubscriptionsResponse, IUpdateSubscriptionPayload } from './types'
import type { IResponse } from '~/shared/types'
import { createMutation, createSuspenseQuery } from 'react-query-kit'
import { httpClient } from '~/shared/lib/http-client'

export const useCreateSubscriptionMutation = createMutation({
  mutationFn: (payload: ICreateSubscriptionPayload) =>
    httpClient.post('subscription', {
      json: payload,
    }).json(),
})

export const useGetSubscriptionsQuery = createSuspenseQuery({
  queryKey: ['subscriptions'],
  fetcher: (params: IGetSubscriptionsParams) =>
    httpClient.get<IResponse<ISubscriptionsResponse>>('subscription', {
      searchParams: {
        ...(params?.category_id ? { category_id: params.category_id } : {}),
        ...(params?.sort ? { sort: params.sort } : {}),
        ...(params?.billing_period ? { billing_period: params.billing_period } : {}),
      },
    }).json(),
})

export const useDeleteSubscriptionMutation = createMutation({
  mutationFn: ({ id }: { id: number }) =>
    httpClient.delete(`subscription/${id}`).json(),
})

export const useUpdateSubscriptionMutation = createMutation({
  mutationFn: (payload: IUpdateSubscriptionPayload) =>
    httpClient.put(`subscription/${payload.id}`, {
      json: payload,
    }).json(),
})
