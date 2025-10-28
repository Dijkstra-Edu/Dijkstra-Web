
import { FeatureCarousel } from "@/components/login/feature-carousel"
import { SignInForm } from "@/components/login/sign-in-form"

export default function Home() {
  return (
    <div className="flex min-h-screen bg-[#ffffff]">
      <SignInForm />
      <FeatureCarousel />    
    </div>    
  )
}
