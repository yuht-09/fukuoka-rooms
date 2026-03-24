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
    <div className="py-20 flex flex-col items-center text-center">
      {icon && (
        <div className="relative text-muted-foreground/60 mb-6 [&>svg]:w-14 [&>svg]:h-14 animate-[float_3s_ease-in-out_infinite]">
          {/* Glow behind icon */}
          <div className="absolute inset-0 blur-xl bg-primary/10 rounded-full scale-150" />
          <div className="relative">{icon}</div>
        </div>
      )}
      <h3 className="text-lg font-semibold tracking-wide text-foreground">
        {title}
      </h3>
      <p className="text-muted-foreground text-sm mt-2 max-w-md leading-relaxed">
        {description}
      </p>
      {actionLabel && actionHref && (
        <Button
          className="mt-6 px-6 bg-primary hover:bg-primary/90 transition-all duration-200 hover:shadow-[0_0_20px_rgba(99,102,241,0.3)]"
          render={<Link href={actionHref} />}
        >
          {actionLabel}
        </Button>
      )}

      {/* Float animation keyframe via style tag */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
            @keyframes float {
              0%, 100% { transform: translateY(0); }
              50% { transform: translateY(-6px); }
            }
          `,
        }}
      />
    </div>
  )
}
