import { metadata } from "@/app/metadata";
export function WelcomeSection() {

  return (
    <div className="text-center space-y-4">
      <h1 className="text-4xl font-bold text-primary animate-fade-in">
        {metadata.title || "Whispered Blessings · 轻语祝福"}
      </h1>
      <p className="text-lg text-muted-foreground md:text-white">
        {metadata.description || "默认描述"}
      </p>
    </div>
  )
} 