import { Menu } from 'lucide-react'
import { Button } from '~/shared/ui/button'
import { Logo } from '~/shared/ui/logo'
import { Sheet, SheetContent, SheetTrigger } from '~/shared/ui/sheet'

export function NavigationSheet() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon">
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <Logo />
      </SheetContent>
    </Sheet>
  )
}
