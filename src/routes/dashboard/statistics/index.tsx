import { createFileRoute } from '@tanstack/react-router'
import { PieChart } from 'lucide-react'
import { useStatisticsQuery } from '~/shared/api/statistics'
import { Card, CardContent, CardHeader, CardTitle } from '~/shared/ui/card'
import { CycleBarChart } from './-components'

export const Route = createFileRoute('/dashboard/statistics/')({
  component: RouteComponent,
})

function RouteComponent() {
  const { data: statistics } = useStatisticsQuery()

  const formatCurrency = ({ value, currency }: { value: number, currency: string }) => new Intl.NumberFormat('ru-RU', { style: 'currency', currency }).format(value)

  return (
    <div>
      <div className="mb-2 flex items-center justify-between space-y-2">
        <h1 className="text-2xl font-bold tracking-tight">Статистика</h1>
      </div>

      <div className={`
        mt-10 grid gap-4
        sm:grid-cols-2
        xl:grid-cols-4
      `}
      >
        <Card>
          <CardHeader className={`
            flex flex-row items-center justify-between space-y-0 pb-2
          `}
          >
            <CardTitle className="text-sm font-medium">
              Сумма платежей в месяц
            </CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-lg font-bold">
              {statistics.payload.total_monthly_spending.map(t => (
                <p key={t.amount}>
                  <span>
                    {t.currency}
                    :
                    {' '}
                  </span>

                  <span>
                    {t.amount}
                  </span>
                </p>
              ))}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className={`
            flex flex-row items-center justify-between space-y-0 pb-2
          `}
          >
            <CardTitle className="text-sm font-medium">
              Сумма платежей в год
            </CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-lg font-bold">
              {statistics.payload.total_yearly_spending.map(t => (
                <p key={t.amount}>
                  <span>
                    {t.currency}
                    :
                    {' '}
                  </span>

                  <span>
                    {t.amount}
                  </span>
                </p>
              ))}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className={`
            flex flex-row items-center justify-between space-y-0 pb-2
          `}
          >
            <CardTitle className="text-sm font-medium">
              Активные подписки
            </CardTitle>
            <PieChart className="size-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {statistics.payload.active_subscriptions}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className={`
            flex flex-row items-center justify-between space-y-0 pb-2
          `}
          >
            <CardTitle className="text-sm font-medium">
              Общие подписки
            </CardTitle>
            <PieChart className="size-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {statistics.payload.total_subscriptions}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="mt-4">
        <CardContent>

          <CardTitle className="text-lg">Предстоящие платежи</CardTitle>

          <div className="mt-4 flex flex-col gap-2">
            {statistics.payload.upcoming_renewals.map(upcoming => (
              <div
                key={upcoming.id}
                className={`
                  flex items-center justify-between gap-4 rounded-lg border px-3
                  py-2
                `}
              >
                <div>
                  <p>{upcoming.service_name}</p>
                  <p className="text-muted-foreground">
                    осталось
                    {' '}
                    <span>{upcoming.days_until_renewal}</span>
                    {' '}
                    дней
                  </p>
                </div>

                <p className="font-semibold">
                  {formatCurrency({
                    value: upcoming.price,
                    currency: upcoming.currency,
                  })}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <CycleBarChart statistics={statistics.payload} />
    </div>
  )
}
