import { zodResolver } from '@hookform/resolvers/zod'
import { useQueryClient } from '@tanstack/react-query'
import { format } from 'date-fns'
import { CalendarIcon, ImagePlus } from 'lucide-react'
import { useCallback, useEffect, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import z from 'zod'
import { CreateCategory } from '~/features/create-category'
import { useCategoriesQuery } from '~/shared/api'
import { useUploadImageMutation } from '~/shared/api/images'
import { useStatisticsQuery } from '~/shared/api/statistics'
import { useCreateSubscriptionMutation, useGetSubscriptionsQuery } from '~/shared/api/subscriptions'
import { cn } from '~/shared/lib/cn'
import { Button } from '~/shared/ui/button'
import { Calendar } from '~/shared/ui/calendar'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '~/shared/ui/dialog'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '~/shared/ui/form'
import { Input } from '~/shared/ui/input'
import { Popover, PopoverContent, PopoverTrigger } from '~/shared/ui/popover'
import { RadioGroup, RadioGroupItem } from '~/shared/ui/radio-group'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '~/shared/ui/select'
import { Textarea } from '~/shared/ui/textarea'

const formSchema = z.object({
  image: z.instanceof(File),
  billing_period: z.literal(['1', '2', '3', '4']),
  category_id: z.string(),
  currency: z.string().min(1),
  notes: z.string().optional(),
  price: z.string(),
  service_name: z.string().min(1),
  start_date: z.date(),
})

export function CreateSubscription() {
  const [preview, setPreview] = useState<string | ArrayBuffer | null>('')

  const [isOpen, setIsOpen] = useState(false)

  const queryClient = useQueryClient()

  const { data: categories } = useCategoriesQuery()

  const { mutate: uploadImage, isPending: isUploadImagePending } = useUploadImageMutation()
  const { mutate: createSubscription, isPending: isCreateSubscriptionPending } = useCreateSubscriptionMutation()

  const form = useForm({
    defaultValues: {
      image: new File([''], 'filename'),
    },
    resolver: zodResolver(formSchema),
  })

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const reader = new FileReader()
      try {
        reader.onload = () => setPreview(reader.result)
        reader.readAsDataURL(acceptedFiles[0])
        form.setValue('image', acceptedFiles[0])
        form.clearErrors('image')
      }
      catch {
        setPreview(null)
        form.resetField('image')
      }
    },
    [form],
  )

  const { getRootProps, getInputProps, fileRejections }
    = useDropzone({
      onDrop,
      maxFiles: 1,
      maxSize: 1000000,
      accept: { 'image/png': [], 'image/jpg': [], 'image/jpeg': [] },
    })

  useEffect(() => {
    if (fileRejections.length !== 0) {
      toast.error('Фото должно быть png, jpg или jpeg форматом и не более 1MB')
    }
  }, [fileRejections.length])

  const onSubmit = form.handleSubmit((data) => {
    const handleCreateSubscription = (fileId?: number) => {
      createSubscription({
        ...data,
        start_date: format(data.start_date, 'yyyy-MM-dd'),
        price: +data.price,
        category_id: +data.category_id,
        billing_period: +data.billing_period,
        file_id: fileId ?? 0,
      }, {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: useGetSubscriptionsQuery.getKey(),
          })
          queryClient.resetQueries({
            queryKey: useStatisticsQuery.getKey(),
          })

          setIsOpen(false)
          setPreview(null)
          form.reset()
        },
        onError: () => {
          toast.error('Категория не должна дублироваться')
        },
      })
    }

    if (data.image) {
      uploadImage({
        file: data.image,
      }, {
        onSuccess: (res) => {
          handleCreateSubscription(res.payload.file_id)
        },
        onError: () => {
          toast.error('Что-то пошло не так с загрузкой изображения, попробуйте еще раз')
        },
      })
    }
    else {
      handleCreateSubscription()
    }
  })

  const handleOpenChange = (open: boolean) => {
    form.reset()
    setPreview(null)
    setIsOpen(open)
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button>Создать</Button>

      </DialogTrigger>
      <DialogContent className={`
        max-h-screen overflow-y-scroll
        lg:max-w-screen-md
      `}
      >
        <DialogHeader>
          <DialogTitle>Новая подписка</DialogTitle>

          <Form {...form}>
            <form
              className="mt-4 flex w-full flex-col gap-5"
              onSubmit={onSubmit}
            >
              <div className="flex items-center gap-6">
                <FormField
                  control={form.control}
                  name="image"
                  render={() => (
                    <FormItem className="w-fit">
                      <FormControl>
                        <div
                          {...getRootProps()}
                          className={`
                            size-28 max-w-28 overflow-hidden rounded-full
                            object-cover
                          `}
                        >
                          {preview && (
                            <img
                              src={preview as string}
                              alt="Uploaded image"
                              className={`
                                h-full w-full rounded-full object-cover
                              `}
                            />
                          )}
                          {!preview && (
                            <div className="rounded-full border p-6">
                              <ImagePlus
                                className="size-full text-muted-foreground"
                              />
                            </div>
                          )}
                          <Input {...getInputProps()} type="file" />
                        </div>
                      </FormControl>
                    </FormItem>
                  )}
                />

                <div className="flex flex-1 flex-col gap-2">
                  <FormField
                    control={form.control}
                    name="service_name"
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

                  <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Цена</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            className="w-full"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <div className="flex w-full items-center gap-4">
                <FormField
                  control={form.control}
                  name="currency"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Валюта</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="w-full">
                            <SelectValue />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="TJS">TJS</SelectItem>
                          <SelectItem value="USD">USD</SelectItem>
                          <SelectItem value="EUR">EUR</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="category_id"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel className={`
                        flex items-center justify-between gap-2
                      `}
                      >
                        <span>Категория</span>

                        <CreateCategory>
                          <button type="button" className="text-xs">+ Создать</button>
                        </CreateCategory>
                      </FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value?.toString()}>
                        <FormControl>
                          <SelectTrigger className="w-full">
                            <SelectValue />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {categories.payload.map(category => (
                            <SelectItem key={category.id} value={category.id?.toString()}>
                              {category.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="start_date"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Дата начала</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            className={cn(
                              'w-full pl-3 text-left font-normal',
                              !field.value && 'text-muted-foreground',
                            )}
                          >
                            {field.value
                              && (
                                format(field.value, 'PPP')
                              )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          captionLayout="dropdown"
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="billing_period"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel>Цикл платежей</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value?.toString()}
                        className="flex flex-wrap items-center gap-4"
                      >
                        <FormItem className="flex items-center gap-3">
                          <FormControl>
                            <RadioGroupItem value="1" />
                          </FormControl>
                          <FormLabel className="font-normal">
                            Ежедневно
                          </FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center gap-3">
                          <FormControl>
                            <RadioGroupItem value="2" />
                          </FormControl>
                          <FormLabel className="font-normal">
                            Еженедельно
                          </FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center gap-3">
                          <FormControl>
                            <RadioGroupItem value="3" />
                          </FormControl>
                          <FormLabel className="font-normal">Ежемесячно</FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center gap-3">
                          <FormControl>
                            <RadioGroupItem value="4" />
                          </FormControl>
                          <FormLabel className="font-normal">Ежегодно</FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="notes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Заметки</FormLabel>
                    <FormControl>
                      <Textarea
                        className="resize-none"
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
                isLoading={isCreateSubscriptionPending || isUploadImagePending}
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
