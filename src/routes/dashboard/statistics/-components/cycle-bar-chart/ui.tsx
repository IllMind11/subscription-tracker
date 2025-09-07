import type { IStatistics } from '~/shared/api/statistics'
import type {
  ChartConfig,
} from '~/shared/ui/chart'
import { Pie, PieChart } from 'recharts'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '~/shared/ui/card'
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '~/shared/ui/chart'

const chartConfig = {
  visitors: {
    label: 'Visitors',
  },
  chrome: {
    label: 'Chrome',
    color: 'var(--chart-1)',
  },
  safari: {
    label: 'Safari',
    color: 'var(--chart-2)',
  },
  firefox: {
    label: 'Firefox',
    color: 'var(--chart-3)',
  },
  edge: {
    label: 'Edge',
    color: 'var(--chart-4)',
  },
  other: {
    label: 'Other',
    color: 'var(--chart-5)',
  },
} satisfies ChartConfig

const colors = ['var(--chart-1)', 'var(--chart-2)', 'var(--chart-3)', 'var(--chart-4)', 'var(--chart-5)']

export function CycleBarChart({ statistics }: { statistics: IStatistics }) {
  const chartData = statistics.subscriptions_by_period.map((p, index) => ({
    ...p,
    fill: colors[index],
  }))

  return (
    <Card className="mt-5 flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Циклы платежей</CardTitle>
      </CardHeader>

      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie data={chartData} dataKey="count" nameKey="period_name" />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
