import type { VariantProps } from 'class-variance-authority'
import { cva } from 'class-variance-authority'
import * as React from 'react'
import { cn } from '../lib/cn'

const spinnerVariants = cva(
  'relative inline-block aspect-square transform-gpu',
  {
    variants: {
      variant: {
        default: '[&>div]:bg-foreground',
        primary: '[&>div]:bg-primary',
        secondary: '[&>div]:bg-secondary',
        destructive: '[&>div]:bg-destructive',
        muted: '[&>div]:bg-muted-foreground',
      },
      size: {
        sm: 'size-4',
        default: 'size-5',
        lg: 'size-8',
      },
    },
    defaultVariants: { variant: 'default', size: 'default' },
  },
)

export interface SpinnerProps
  extends React.HTMLAttributes<HTMLDivElement>,
  Omit<VariantProps<typeof spinnerVariants>, 'size'> {
  className?: string
  size?: VariantProps<typeof spinnerVariants>['size'] | number
}

function Spinner({ className, variant, size = 'default' }: SpinnerProps) {
  return (
    <div
      role="status"
      aria-label="Loading"
      className={cn(
        typeof size === 'string'
          ? spinnerVariants({ variant, size })
          : spinnerVariants({ variant }),
        className,
      )}
      style={typeof size === 'number' ? { width: size, height: size } : undefined}
    >
      {Array.from({ length: 12 }).map((_, i) => (
        <div
          // eslint-disable-next-line react/no-array-index-key
          key={i}
          className={`
            absolute top-[4.4%] left-[46.5%] h-[24%] w-[7%] origin-[center_190%]
            animate-spinner rounded-full opacity-10 will-change-transform
          `}
          style={{
            transform: `rotate(${i * 30}deg)`,
            animationDelay: `${(i * 0.083).toFixed(3)}s`,
          }}
          aria-hidden="true"
        />
      ))}
      <span className="sr-only">Loading...</span>
    </div>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export { Spinner, spinnerVariants }
