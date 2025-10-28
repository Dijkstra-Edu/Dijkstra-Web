
import HeroWithCanvasReveal from "@/components/hero-with-canvas-reveal"
import { LoginForm } from "@/components/login-form"
import { FeatureCarousel } from "@/components/login/feature-carousel"
import { SignInForm } from "@/components/login/sign-in-form"
import { GalleryVerticalEnd } from "lucide-react"

export default function Home() {
  return (
    <div className="flex min-h-screen bg-[#ffffff]">
      <SignInForm />
      <FeatureCarousel />
      {/*<div className="grid min-h-svh lg:grid-cols-2">
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
    </div>*/}
    </div>    
  )
}
