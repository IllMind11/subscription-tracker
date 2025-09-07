import type { IGetImageByIdResponse, IUploadImageResponse } from './types'
import type { IResponse } from '~/shared/types'
import { createMutation, createQuery } from 'react-query-kit'
import { httpClient } from '~/shared/lib/http-client'

export const useUploadImageMutation = createMutation({
  mutationFn: ({ file }: { file: File }) => {
    const formData = new FormData()
    formData.append('image', file)

    return httpClient.post<IResponse<IUploadImageResponse>>('image/upload', {
      body: formData,
    }).json()
  },
})

export const useGetImageByIdQuery = createQuery({
  queryKey: ['image'],
  fetcher: ({ id }: { id: number }) =>
    httpClient.get<IResponse<IGetImageByIdResponse>>(`image/${id}`).json(),
})
