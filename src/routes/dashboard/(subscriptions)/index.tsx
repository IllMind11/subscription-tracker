import type { SubscriptionSort } from '~/shared/api/subscriptions'
import { createFileRoute } from '@tanstack/react-router'
import z from 'zod'
import { useGetSubscriptionsQuery } from '~/shared/api/subscriptions'
import { CreateSubscription, SubscriptionCard, SubscriptionFilters } from './-components'

const subscriptionsSearchSchema = z.object({
  sort: z.enum(['created_at', 'price', 'date']).optional(),
  billing_period: z.enum(['1', '2', '3', '4']).optional(),
})

export const Route = createFileRoute('/dashboard/(subscriptions)/')({
  validateSearch: search => subscriptionsSearchSchema.parse(search),
  component: RouteComponent,
})

function RouteComponent() {
  const searchParams = Route.useSearch()

  const { data: subscriptions } = useGetSubscriptionsQuery({
    variables: {
      sort: searchParams.sort as SubscriptionSort,
      billing_period: searchParams.billing_period as any,
    },
  })

  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <h2 className="text-2xl font-bold">Подписки</h2>
          <SubscriptionFilters />
        </div>

        <CreateSubscription />
      </div>

      <div className={`
        grid gap-4
        lg:grid-cols-2
      `}
      >
        {subscriptions.payload.data?.map(sub => (
          <SubscriptionCard key={sub.id} subscription={sub} />
        ))}
      </div>

      {!subscriptions.payload.data && (
        <div className={`
          mx-auto mt-20 flex flex-col items-center justify-center gap-4
        `}
        >
          <p>Нет подписок</p>
        </div>
      )}
    </div>
  )
}
