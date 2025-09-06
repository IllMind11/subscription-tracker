import { zodResolver } from '@hookform/resolvers/zod'
import { useQueryClient } from '@tanstack/react-query'
import { createFileRoute, Link } from '@tanstack/react-router'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'
import { useSignInMutation } from '~/shared/api'
import { Button } from '~/shared/ui/button'
import { Card, CardContent, CardTitle } from '~/shared/ui/card'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '~/shared/ui/form'
import { Input } from '~/shared/ui/input'
import { Logo } from '~/shared/ui/logo'

export const Route = createFileRoute('/auth/signin')({
  component: RouteComponent,
})

const formSchema = z.object({
  login: z.string().min(3, 'Должно быть не менее 3 символов'),
  password: z.string().min(1, 'Пароль должен быть не менее 1 символа'),
})

function RouteComponent() {
  const navigate = Route.useNavigate()
  const queryClient = useQueryClient()

  const { mutate: signIn, isPending: isSignInPending } = useSignInMutation()

  const form = useForm({
    defaultValues: {
      login: '',
      password: '',
    },
    resolver: zodResolver(formSchema),
  })

  const onSubmit = form.handleSubmit((data) => {
    signIn({
      login: data.login,
      password: data.password,
    }, {
      onSuccess: (res) => {
        queryClient.resetQueries()
        localStorage.setItem('token', res.payload.token)
        navigate({
          to: '/dashboard',
        })
      },
      onError: () => {
        toast.error('Логин или пароль неверны')
      },
    })
  })

  return (
    <div className={`
      flex min-h-screen flex-col items-center justify-center gap-5
    `}
    >
      <Card className="flex w-full max-w-sm flex-col items-center">
        <CardTitle>
          <div className="flex flex-col items-center gap-6">
            <Link to="/">
              <Logo />
            </Link>

            <p className="text-xl font-bold">Войти</p>
          </div>
        </CardTitle>

        <CardContent className="w-full">
          <Form {...form}>
            <form
              className="w-full space-y-4"
              onSubmit={onSubmit}
            >
              <FormField
                control={form.control}
                name="login"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username или Email</FormLabel>
                    <FormControl>
                      <Input
                        className="w-full"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Пароль</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        className="w-full"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                className="mt-4 w-full"
                isLoading={isSignInPending}
              >
                Продолжить
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      <p className="text-sm text-muted-foreground">
        У вас ещё нет аккаунта?
        {' '}
        <Link
          to="/auth/signup"
          className="text-primary underline underline-offset-4"
        >
          Зарегистрируйтесь
        </Link>
      </p>
    </div>
  )
}
