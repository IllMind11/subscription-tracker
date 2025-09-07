import { createFileRoute } from '@tanstack/react-router'
import { useGetSubscriptionsQuery } from '~/shared/api/subscriptions'
import { CreateSubscription, SubscriptionCard } from './-components'

export const Route = createFileRoute('/dashboard/(subscriptions)/')({
  component: RouteComponent,
})

function RouteComponent() {
  const { data: subscriptions } = useGetSubscriptionsQuery()

  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-2xl font-bold">Подписки</h2>

        <CreateSubscription />
      </div>

      <div className={`
        grid gap-4
        lg:grid-cols-2
      `}
      >
        {subscriptions.payload.data.map(sub => (
          <SubscriptionCard key={sub.id} subscription={sub} />
        ))}
      </div>
    </div>
  )
}
