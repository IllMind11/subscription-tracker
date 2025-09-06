import { createFileRoute, redirect } from '@tanstack/react-router'
import z from 'zod'
import { useVerifyUserMutation } from '~/shared/api'

const authSearchSchema = z.object({
  token: z.string().optional(),
})

export const Route = createFileRoute('/auth')({
  validateSearch: search => authSearchSchema.parse(search),
  beforeLoad: async ({ context, search }) => {
    if (search.token) {
      try {
        await useVerifyUserMutation.mutationFn({
          token: search.token,
        })

        throw redirect({
          to: '/dashboard',
        })
      }
      catch {
        throw redirect({
          to: '/dashboard',
        })
      }
    }

    if (context.user) {
      throw redirect({
        to: '/dashboard',
      })
    }
  },
})
