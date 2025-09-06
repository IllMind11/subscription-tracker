import type { IRefreshResponse, ISignInPayload, ISignInResponse, ISignUpPayload, ISignUpResponse, IVerifyPayload } from './types'
import type { IResponse, IUser } from '~/shared/types'
import { createMutation, createSuspenseQuery } from 'react-query-kit'
import { httpClient } from '~/shared/lib/http-client'

export const useSignInMutation = createMutation({
  mutationFn: (payload: ISignInPayload) =>
    httpClient.post<IResponse<ISignInResponse>>('auth/sign-in', {
      json: payload,
    }).json(),
})

export const useSignUpMutation = createMutation({
  mutationFn: (payload: ISignUpPayload) =>
    httpClient.post<IResponse<ISignUpResponse>>('auth/sign-up', {
      json: payload,
    }).json(),
})

export const useVerifyUserMutation = createMutation({
  mutationFn: (payload: IVerifyPayload) =>
    httpClient.get<IResponse<ISignUpResponse>>('verify', {
      searchParams: {
        token: payload.token,
      },
    }).json(),
})

export const useProfileQuery = createSuspenseQuery({
  queryKey: ['profile'],
  fetcher: () => httpClient.get<IResponse<IUser>>('profile').json(),
})

export const useRefreshTokenMutation = createMutation({
  mutationFn: () =>
    httpClient.post<IResponse<IRefreshResponse>>('auth/refresh').json(),
})
