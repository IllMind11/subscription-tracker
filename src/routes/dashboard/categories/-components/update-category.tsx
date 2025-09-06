import type { ICategory } from '~/shared/api/categories/types'
import { zodResolver } from '@hookform/resolvers/zod'
import { useQueryClient } from '@tanstack/react-query'
import { PenBox } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import z from 'zod'
import { useCategoriesQuery, useUpdateCategoryMutation } from '~/shared/api'
import { Button } from '~/shared/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '~/shared/ui/dialog'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '~/shared/ui/form'
import { Input } from '~/shared/ui/input'

const formSchema = z.object({
  name: z.string().min(1, 'Должно быть не менее 1 символа'),
})

export function UpdateCategory({
  category,
}: { category: ICategory }) {
  const [isOpen, setIsOpen] = useState(false)

  const queryClient = useQueryClient()

  const { mutate: updateCategory, isPending: isUpdateCategoryPending } = useUpdateCategoryMutation()

  const form = useForm({
    values: {
      name: category.name,
    },
    resolver: zodResolver(formSchema),
  })

  const onSubmit = form.handleSubmit((data) => {
    updateCategory({
      id: category.id,
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
        <PenBox className="h-5 w-5" />
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Редактирование категории</DialogTitle>

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
                isLoading={isUpdateCategoryPending}
              >
                Сохранить
              </Button>
            </form>
          </Form>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}
