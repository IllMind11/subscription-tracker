/// <reference types="vite/client" />
import type { QueryClient } from '@tanstack/react-query'
import type { IUser } from '~/shared/types'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { createRootRouteWithContext, HeadContent, Scripts } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import * as React from 'react'
import { DefaultCatchBoundary, ThemeProvider } from '~/app/providers'
import appCss from '~/app/styles/app.css?url'
import { useProfileQuery } from '~/shared/api'
import { seo } from '~/shared/lib/seo'
import { NotFound } from '~/shared/ui/not-found'
import { Toaster } from '~/shared/ui/sonner'

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient
  user: IUser | null
}>()({
  ssr: false,
  beforeLoad: async ({ context }) => {
    try {
      const { payload } = await context.queryClient.ensureQueryData(useProfileQuery.getFetchOptions())

      return {
        user: payload,
      }
    }
    catch (error) {
      console.error(error)
    }
  },
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      ...seo({
        title:
          'Трекер подписок | Управляйте подписками легко',
        description: `Трекер подписок позволяет управлять подписками легко. Напоминания о платежах и статистика расходов всегда под рукой.`,
      }),
    ],
    links: [
      { rel: 'stylesheet', href: appCss },
      {
        rel: 'apple-touch-icon',
        sizes: '180x180',
        href: '/apple-touch-icon.png',
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '32x32',
        href: '/favicon-32x32.png',
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '16x16',
        href: '/favicon-16x16.png',
      },
      { rel: 'manifest', href: '/site.webmanifest', color: '#fffff' },
      { rel: 'icon', href: '/favicon.ico' },
    ],
    scripts: [
      {
        src: '/customScript.js',
        type: 'text/javascript',
      },
    ],
  }),
  errorComponent: DefaultCatchBoundary,
  notFoundComponent: () => <NotFound />,
  shellComponent: RootDocument,
})

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body>
        <ThemeProvider defaultTheme="system" attribute="class" forcedTheme="light">
          {children}

          <Toaster position="top-center" />
          <ReactQueryDevtools buttonPosition="bottom-right" />
          <TanStackRouterDevtools position="bottom-right" />
          <Scripts />
        </ThemeProvider>
      </body>
    </html>
  )
}
