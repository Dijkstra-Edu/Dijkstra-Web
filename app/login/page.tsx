
import HeroWithCanvasReveal from "@/components/hero-with-canvas-reveal"
import { LoginForm } from "@/components/login-form"
import { GalleryVerticalEnd } from "lucide-react"

export default function Home() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <LoginForm />
          </div>
        </div>
      </div>
      <div className="bg-muted relative hidden lg:block">
        <HeroWithCanvasReveal />
      </div>
    </div>
  )
}
