import type { SubscriptionSort } from '~/shared/api/subscriptions'
import type { BillingPeriod } from '~/shared/types'
import { useNavigate, useSearch } from '@tanstack/react-router'
import { Button } from '~/shared/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuLabel, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuSeparator, DropdownMenuTrigger } from '~/shared/ui/dropdown-menu'

export function SubscriptionFilters() {
  const searchParams = useSearch({
    from: '/dashboard/(subscriptions)/',
  })
  const navigate = useNavigate()

  const handleSortChange = (value: string) => {
    navigate({
      to: '/dashboard',
      search: {
        ...searchParams,
        sort: value as SubscriptionSort,
      },
      replace: true,
    })
  }

  const handleBillingPeriodChange = (value: string) => {
    navigate({
      to: '/dashboard',
      search: {
        ...searchParams,
        billing_period: value as `${BillingPeriod}`,
      },
      replace: true,
    })
  }

  return (
    <div className="flex items-center gap-3">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">Фильтры</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuGroup>
            <DropdownMenuLabel>Сортировка</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuRadioGroup value={searchParams.sort} onValueChange={handleSortChange}>
              <DropdownMenuRadioItem value="created_at">Дата создания</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="price">Цена</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="date">Дата платежа</DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuGroup>

          <DropdownMenuSeparator />

          <DropdownMenuGroup>
            <DropdownMenuLabel>Цикл платежей</DropdownMenuLabel>
            <DropdownMenuRadioGroup value={searchParams.billing_period} onValueChange={handleBillingPeriodChange}>
              <DropdownMenuRadioItem value="1">Ежедневно</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="2">Еженедельно</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="3">Ежемесячно</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="4">Ежегодно</DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>

      {(searchParams.billing_period || searchParams.sort) && (
        <Button onClick={() => navigate({
          search: undefined,
        })}
        >
          Очистить фильтры
        </Button>
      )}
    </div>

  )
}
