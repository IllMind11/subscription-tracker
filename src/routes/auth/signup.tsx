import { zodResolver } from '@hookform/resolvers/zod'
import { useQueryClient } from '@tanstack/react-query'
import { createFileRoute, Link } from '@tanstack/react-router'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'
import { useSignUpMutation } from '~/shared/api'
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

export const Route = createFileRoute('/auth/signup')({
  component: RouteComponent,
})

const formSchema = z.object({
  username: z.string().min(3, 'Имя должно быть не менее 3 символов'),
  email: z.email(),
  password: z.string().min(6, 'Пароль должен быть не менее 5 символов'),
})

function RouteComponent() {
  const navigate = Route.useNavigate()
  const queryClient = useQueryClient()

  const { mutate: signUp, isPending: isSignUpPending } = useSignUpMutation()

  const form = useForm({
    defaultValues: {
      username: '',
      email: '',
      password: '',
    },
    resolver: zodResolver(formSchema),
  })

  const onSubmit = form.handleSubmit((data) => {
    signUp({
      username: data.username,
      email: data.email,
      password: data.password,
    }, {
      onSuccess: (res) => {
        queryClient.resetQueries()
        navigate({
          to: '/dashboard',
        })
        localStorage.setItem('token', res.payload.token)
      },
      onError: () => {
        toast.error('Что то пошло не так')
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

            <p className="text-xl font-bold">Зарегистрироваться</p>
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
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
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
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
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
                isLoading={isSignUpPending}
              >
                Продолжить
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      <p className="text-sm text-muted-foreground">
        У вас уже есть аккаунт?
        {' '}
        <Link
          to="/auth/signin"
          className="text-primary underline underline-offset-4"
        >
          Войдите
        </Link>
      </p>
    </div>
  )
}
