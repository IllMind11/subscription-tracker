import { useQueryClient } from '@tanstack/react-query'
import { Trash } from 'lucide-react'
import { toast } from 'sonner'
import { useDeleteSubscriptionMutation, useGetSubscriptionsQuery } from '~/shared/api/subscriptions'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '~/shared/ui/alert-dialog'
import { Button } from '~/shared/ui/button'

export function DeleteSubscription({ id }: { id: number }) {
  const queryClient = useQueryClient()

  const { mutate: deleteSubscription } = useDeleteSubscriptionMutation({
    onSuccess: () => {
      toast.success('Подписка успешно удалена')
      queryClient.invalidateQueries({
        queryKey: useGetSubscriptionsQuery.getKey(),
      })
    },
  })

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive">
          <Trash className="h-5 w-5" />
          {' '}
          Удалить
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Вы точно хотите удалить эту подписку?</AlertDialogTitle>
          <AlertDialogDescription>Это действие не может быть отменено.</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Отмена</AlertDialogCancel>
          <AlertDialogAction
            asChild
            onClick={() => deleteSubscription({
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
