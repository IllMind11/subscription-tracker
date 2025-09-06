import ky, { HTTPError } from 'ky'
import { useRefreshTokenMutation } from '../api'

export const httpClient = ky.create({
  prefixUrl: `${import.meta.env.VITE_API_URL}/api`,
  retry: {
    statusCodes: [401],
    limit: 1,
  },
  hooks: {
    beforeRequest: [
      (request) => {
        const token = localStorage.getItem('token')
        if (token) {
          request.headers.set('Authorization', `Bearer ${token}`)
        }
      },
    ],
    beforeRetry: [
      // Handle Refresh Token
      async ({ request, error }) => {
        const token = localStorage.getItem('token')

        if (error instanceof HTTPError
          && error.response.status === 401 && token) {
          try {
            const { payload } = await useRefreshTokenMutation.mutationFn()

            if (payload.token) {
              localStorage.setItem('token', payload.token)
              request.headers.set('Authorization', `Bearer ${payload.token}`)
            }
            else {
              localStorage.removeItem('token')
            }
          }
          catch {
            console.error('Refresh token error')
          }
        }
      },
    ],
  },
})
