import { createFileRoute } from '@tanstack/react-router'
import { useGetSubscriptionsQuery } from '~/shared/api/subscriptions'
import { SubscriptionCard } from '../(subscriptions)/-components'

export const Route = createFileRoute('/dashboard/categories/$categoryId')({
  component: RouteComponent,
})

function RouteComponent() {
  const { categoryId } = Route.useParams()

  const { data: subscriptions } = useGetSubscriptionsQuery({
    variables: {
      category_id: +categoryId,
    },
  })

  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-2xl font-bold">Подписки</h2>
      </div>

      <div className={`
        grid gap-4
        lg:grid-cols-2
      `}
      >
        {subscriptions.payload?.data?.map(sub => (
          <SubscriptionCard key={sub.id} subscription={sub} />
        ))}
      </div>
    </div>
  )
}
