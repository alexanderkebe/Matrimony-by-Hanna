import { cn } from "@/lib/utils"
import Image from "next/image"

interface LogoProps {
  className?: string
  size?: "sm" | "md" | "lg" | "xl"
  variant?: "vertical" | "horizontal"
}

export function Logo({ className, size = "md", variant = "horizontal" }: LogoProps) {
  const verticalSizeClasses = {
    sm: { container: "h-10 w-10", image: 40 },
    md: { container: "h-14 w-14", image: 56 },
    lg: { container: "h-20 w-20", image: 80 },
    xl: { container: "h-32 w-32", image: 128 },
  }

  const horizontalSizeClasses = {
    sm: { container: "h-8 w-auto", width: 120, height: 32 },
    md: { container: "h-10 w-auto", width: 150, height: 40 },
    lg: { container: "h-14 w-auto", width: 210, height: 56 },
    xl: { container: "h-20 w-auto", width: 300, height: 80 },
  }

  if (variant === "horizontal") {
    const sizeConfig = horizontalSizeClasses[size]
    return (
      <div className={cn("relative", sizeConfig.container, className)}>
        <Image
          src="/images/logo-horizontal.png"
          alt="Matrimony by Hanna"
          width={sizeConfig.width}
          height={sizeConfig.height}
          className="h-full w-auto object-contain"
          priority
        />
      </div>
    )
  }

  // Vertical logo (original stacked version)
  const sizeConfig = verticalSizeClasses[size]
  return (
    <div className={cn("relative", sizeConfig.container, className)}>
      <Image
        src="/images/logo.png"
        alt="Matrimony by Hanna"
        width={sizeConfig.image}
        height={sizeConfig.image}
        className="w-full h-full object-contain"
        priority
      />
    </div>
  )
}
