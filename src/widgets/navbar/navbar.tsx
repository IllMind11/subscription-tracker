import { Link, useRouteContext } from '@tanstack/react-router'
import { Avatar, AvatarFallback } from '~/shared/ui/avatar'
import { Button, buttonVariants } from '~/shared/ui/button'
import { Logo } from '~/shared/ui/logo'

export function Navbar() {
  const { user } = useRouteContext({
    from: '/(landing)/',
  })

  return (
    <div>
      <nav className="h-16 border-b bg-background">
        <div className={`
          mx-auto flex h-full max-w-screen-xl items-center justify-between px-4
          sm:px-6
          lg:px-8
        `}
        >
          <Logo />

          <div className="flex items-center gap-3">
            {user
              ? (
                  <Link to="/dashboard">
                    <Avatar>
                      <AvatarFallback>{user.username.charAt(0).toUpperCase()}</AvatarFallback>
                    </Avatar>
                  </Link>

                )
              : (
                  <>
                    <Button
                      variant="outline"
                      className={`
                        hidden
                        sm:inline-flex
                      `}
                      asChild
                    >
                      <Link to="/auth/signin">
                        Войти
                      </Link>
                    </Button>
                    <Link to="/auth/signup" className={buttonVariants()}>
                      Зарегистрироваться
                    </Link>
                  </>
                )}

            {/* Mobile Menu */}
            {/* <div className="md:hidden">
              <NavigationSheet />
            </div> */}
          </div>
        </div>
      </nav>
    </div>
  )
}
