import { createFileRoute } from '@tanstack/react-router'
import { CreateCategory } from '~/features/create-category'
import { useCategoriesQuery } from '~/shared/api'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '~/shared/ui/table'
import { UpdateCategory } from './-components'
import { DeleteCategory } from './-components/delete-category'

export const Route = createFileRoute('/dashboard/categories/')({
  component: RouteComponent,
})

function RouteComponent() {
  const { data: categories } = useCategoriesQuery()

  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-2xl font-bold">Категории</h2>

        <CreateCategory />
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px] font-semibold">#</TableHead>
            <TableHead className="font-semibold">Название</TableHead>
            <TableHead className="text-right" />
          </TableRow>
        </TableHeader>
        <TableBody>
          {categories?.payload.map((category, index) => (
            <TableRow key={category.id}>
              <TableCell className="font-medium">{index + 1}</TableCell>
              <TableCell>{category.name}</TableCell>
              <TableCell className="flex justify-end">
                {!category.is_global
                  && (
                    <div className="ml-auto flex items-center gap-2">
                      <UpdateCategory category={category} />
                      <DeleteCategory id={category.id} />
                    </div>
                  )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
