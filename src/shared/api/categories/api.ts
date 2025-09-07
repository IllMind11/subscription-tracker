import type { ICategory, ICreateCategoryPayload, IUpdateCategoryPayload } from './types'
import type { IResponse } from '~/shared/types'
import { createMutation, createSuspenseQuery } from 'react-query-kit'
import { httpClient } from '~/shared/lib/http-client'

export const useCategoriesQuery = createSuspenseQuery({
  queryKey: ['categories'],
  fetcher: () => httpClient.get<IResponse<ICategory[]>>('category').json(),
})

export const useDeleteCategoryMutation = createMutation({
  mutationFn: ({ id }: { id: number }) =>
    httpClient.delete(`category/${id}`).json(),
})

export const useCreateCategoryMutation = createMutation({
  mutationFn: (payload: ICreateCategoryPayload) =>
    httpClient.post('category', {
      json: payload,
    }).json(),
})

export const useUpdateCategoryMutation = createMutation({
  mutationFn: (payload: IUpdateCategoryPayload) =>
    httpClient.put(`category/${payload.id}`, {
      json: {
        name: payload.name,
      },
    }).json(),
})

export const useActiveCategoriesQuery = createSuspenseQuery({
  queryKey: ['active-categories'],
  fetcher: () => httpClient.get<IResponse<ICategory[]>>('category/active').json(),
})
