import { zodResolver } from '@hookform/resolvers/zod'
import { useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import z from 'zod'
import { useCategoriesQuery, useCreateCategoryMutation } from '~/shared/api'
import { Button } from '~/shared/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '~/shared/ui/dialog'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '~/shared/ui/form'
import { Input } from '~/shared/ui/input'

const formSchema = z.object({
  name: z.string().min(1, 'Должно быть не менее 1 символа'),
})

export function CreateCategory({
  children,
}: { children?: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)

  const queryClient = useQueryClient()

  const { mutate: createCategory, isPending: isCreateCategoryPending } = useCreateCategoryMutation()

  const form = useForm({
    defaultValues: {
      name: '',
    },
    resolver: zodResolver(formSchema),
  })

  const onSubmit = form.handleSubmit((data) => {
    createCategory({
      name: data.name,
    }, {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: useCategoriesQuery.getKey(),
        })
        setIsOpen(false)
      },
      onError: () => {
        toast.error('Категория не должна дублироваться')
      },
    })
  })

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {children || <Button>Создать категорию</Button>}

      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Новая категория</DialogTitle>

          <Form {...form}>
            <form
              className="mt-4 w-full space-y-4"
              onSubmit={onSubmit}
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Название</FormLabel>
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
              <Button
                type="submit"
                className="mt-4 w-full"
                isLoading={isCreateCategoryPending}
              >
                Создать
              </Button>
            </form>
          </Form>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}
