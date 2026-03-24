import { ReactNode } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

type EmptyStateProps = {
  icon?: ReactNode
  title: string
  description: string
  actionLabel?: string
  actionHref?: string
}

export function EmptyState({
  icon,
  title,
  description,
  actionLabel,
  actionHref,
}: EmptyStateProps) {
  return (
    <div className="py-16 flex flex-col items-center text-center">
      {icon && (
        <div className="text-muted-foreground mb-4 [&>svg]:w-12 [&>svg]:h-12">
          {icon}
        </div>
      )}
      <h3 className="text-lg font-medium">{title}</h3>
      <p className="text-muted-foreground text-sm mt-1 max-w-sm">
        {description}
      </p>
      {actionLabel && actionHref && (
        <Button className="mt-4" render={<Link href={actionHref} />}>
          {actionLabel}
        </Button>
      )}
    </div>
  )
}
