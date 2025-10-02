import ComingSoonPage from "@/components/coming-soon"
import LandingPage from "@/components/landing-page"


export default function Home() {
   if (process.env.ENVIRONMENT === "QA" || process.env.ENVIRONMENT === "DEV" )
      return <LandingPage />
   else return <ComingSoonPage />
}
