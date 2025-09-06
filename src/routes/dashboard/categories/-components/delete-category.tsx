import { useQueryClient } from '@tanstack/react-query'
import { Trash } from 'lucide-react'
import { toast } from 'sonner'
import { useCategoriesQuery, useDeleteCategoryMutation } from '~/shared/api'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '~/shared/ui/alert-dialog'
import { Button } from '~/shared/ui/button'

export function DeleteCategory({ id }: { id: number }) {
  const queryClient = useQueryClient()

  const { mutate: deleteCategory } = useDeleteCategoryMutation({
    onSuccess: () => {
      toast.success('Категория успешно удалена')
      queryClient.invalidateQueries({
        queryKey: useCategoriesQuery.getKey(),
      })
    },
  })

  return (
    <AlertDialog>
      <AlertDialogTrigger><Trash className="h-5 w-5 text-red-400" /></AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Вы точно хотите удалить эту категорию?</AlertDialogTitle>
          <AlertDialogDescription>Все подписки в этой категории будут удалены.</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Отмена</AlertDialogCancel>
          <AlertDialogAction
            asChild
            onClick={() => deleteCategory({
              id,
            })}
          >
            <Button
              variant="destructive"
              className={`
                bg-destructive text-white
                hover:bg-destructive/90
              `}
            >
              Удалить
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
