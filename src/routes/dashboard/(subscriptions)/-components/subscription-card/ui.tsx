import type { ISubscription, SubscriptionStatus } from '~/shared/api/subscriptions'
import { useQueryClient } from '@tanstack/react-query'
import { format } from 'date-fns'
import { toast } from 'sonner'
import { useGetImageByIdQuery } from '~/shared/api/images'
import { useGetSubscriptionsQuery, useUpdateSubscriptionMutation } from '~/shared/api/subscriptions'
import { BillingPeriod } from '~/shared/types'
import { Avatar, AvatarFallback, AvatarImage } from '~/shared/ui/avatar'
import { Badge } from '~/shared/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '~/shared/ui/select'
import { Sheet, SheetContent, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from '~/shared/ui/sheet'
import { DeleteSubscription } from '../delete-subscription'
import { UpdateSubscription } from '../update-subscription'

export function SubscriptionCard({ subscription }: { subscription: ISubscription }) {
  const queryClient = useQueryClient()

  const { data: image } = useGetImageByIdQuery({
    variables: {
      id: subscription.file_id,
    },
    enabled: !!subscription.file_id,
  })

  const { mutate: updateSubscription } = useUpdateSubscriptionMutation()

  const formattedPrice = new Intl.NumberFormat('ru-RU', { style: 'currency', currency: subscription.currency }).format(
    subscription.price,
  )

  const getCycleLabel = () => {
    switch (subscription.billing_period) {
      case BillingPeriod.Dayly:
        return 'Ежедневно'
      case BillingPeriod.Weekly:
        return 'Еженедельно'
      case BillingPeriod.Monthly:
        return 'Ежемесячно'
      case BillingPeriod.Yearly:
        return 'Ежегодно'
    }
  }

  const getStatusVariant = () => {
    switch (subscription.status) {
      case 'active':
        return 'default'
      case 'paused':
        return 'secondary'
      case 'cancelled':
        return 'destructive'
    }
  }

  const handleStatusChange = (value: SubscriptionStatus) => {
    updateSubscription({
      id: subscription.id,
      status: value,
    }, {
      onSuccess: () => {
        toast.success('Статус подписки успешно изменен')
        queryClient.invalidateQueries({
          queryKey: useGetSubscriptionsQuery.getKey(),
        })
      },
    })
  }

  return (
    <Sheet>
      <SheetTrigger>
        <div className="flex items-center gap-5 rounded-lg border px-4 py-2">
          <Avatar className="h-15 w-15">
            <AvatarImage src={image?.payload.path} alt={subscription.service_name} />
            <AvatarFallback>{subscription.service_name.charAt(0)}</AvatarFallback>
          </Avatar>

          <div className="flex flex-col items-start">
            <div className="flex items-center gap-2">
              <h5 className="text-lg font-medium">{subscription.service_name}</h5>
              <Badge variant="outline">
                {getCycleLabel()}
              </Badge>
              <Badge variant={getStatusVariant()}>
                {subscription.status}
              </Badge>
            </div>

            <p className="text-muted-foreground">
              Следующий платеж в
              {' '}

              <span className="font-semibold">{format(new Date(subscription.next_billing_date), 'dd MMM YYY')}</span>
            </p>
          </div>

          <p className="ml-auto font-semibold">{formattedPrice}</p>
        </div>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <div className="flex items-center gap-4">
            <Avatar className="h-15 w-15">
              <AvatarImage src={image?.payload.path} alt={subscription.service_name} />
              <AvatarFallback>{subscription.service_name.charAt(0)}</AvatarFallback>
            </Avatar>
            <SheetTitle>{subscription.service_name}</SheetTitle>
          </div>
        </SheetHeader>

        <div className="flex flex-col gap-4 px-4">
          <div className="flex items-center justify-between gap-4">
            <p className="text-muted-foreground">Цена</p>
            <p className="font-semibold">{formattedPrice}</p>
          </div>

          <div className="flex items-center justify-between gap-4">
            <p className="text-muted-foreground">Категория</p>
            <p className="font-semibold">{subscription.category_name}</p>
          </div>

          <div className="flex items-center justify-between gap-4">
            <p className="text-muted-foreground">Дата начала</p>
            <p className="font-semibold">{format(new Date(subscription.start_date), 'dd-MM-yyyy')}</p>
          </div>

          <div className="flex items-center justify-between gap-4">
            <p className="text-muted-foreground">Дата следующего платежа</p>
            <p className="font-semibold">{format(new Date(subscription.next_billing_date), 'dd-MM-yyyy')}</p>
          </div>

          <div className="flex items-center justify-between gap-4">
            <p className="text-muted-foreground">Цикл платежей</p>
            <p className="font-semibold">{getCycleLabel()}</p>
          </div>

          <div className="flex items-center justify-between gap-4">
            <p className="text-muted-foreground">Статус</p>
            <Select
              defaultValue={subscription.status}
              onValueChange={handleStatusChange}
            >
              <SelectTrigger className="w-fit">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="active">Активна</SelectItem>
                <SelectItem value="paused">Приостановлена</SelectItem>
                <SelectItem value="cancelled">Отменена</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {subscription.notes && (
            <div className="flex items-center justify-between gap-4">
              <p className="text-muted-foreground">Заметки</p>
              <p className="font-semibold">{subscription.notes}</p>
            </div>
          )}
        </div>

        <SheetFooter className="space-y-0.5">
          <UpdateSubscription subscription={subscription} />
          <DeleteSubscription id={subscription.id} />
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
