import { createFileRoute, Link } from '@tanstack/react-router'
import { ArrowUpRight } from 'lucide-react'
import { Button } from '~/shared/ui/button'

export const Route = createFileRoute('/(landing)/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="flex min-h-[80vh] items-center justify-center px-6">
      <div className="max-w-2xl text-center">

        <h1 className={`
          mt-6 text-4xl font-bold
          sm:text-5xl
          md:text-6xl md:leading-[1]
        `}
        >
          Управляйте подписками легко
        </h1>
        <p className={`
          mt-6 text-[17px]
          md:text-lg
        `}
        >
          Напоминания о платежах и статистика расходов всегда под рукой
        </p>
        <div className="mt-12 flex items-center justify-center gap-4">
          <Button size="lg" className="rounded-full text-base" asChild>
            <Link to="/auth/signup">
              🚀 Приступить сейчас
              <ArrowUpRight className="!h-5 !w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
