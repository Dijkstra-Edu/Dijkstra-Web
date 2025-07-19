import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { BrainCircuit, MessageSquare, Wrench, Github } from "lucide-react"
import Link from "next/link"

export default function ContactForm() {
  return (
    <div className="container mx-auto px-4 md:px-6 2xl:max-w-[1400px]">
      {/* Title */}
      <div className="mx-auto max-w-xl text-center">
        <h1 className="text-3xl font-bold text-black sm:text-4xl">Contact us</h1>
        <p className="text-muted-foreground mt-3">Feel free to reach out!</p>
      </div>

      <div className="mx-auto mt-12 max-w-lg">
        <Card className="p-0">
          <CardContent className="p-6">
            <h2 className="mb-8 text-xl font-semibold">Fill in the form</h2>
            <form>
              <div className="grid gap-4 lg:gap-6">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:gap-6">
                  <div>
                    <Label htmlFor="firstname" className="mb-2">
                      First Name
                    </Label>
                    <Input type="text" id="firstname" placeholder="Enter your first name" />
                  </div>
                  <div>
                    <Label htmlFor="lastname" className="mb-2">
                      Last Name
                    </Label>
                    <Input type="text" id="lastname" placeholder="Enter your last name" />
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:gap-6">
                  <div>
                    <Label htmlFor="email" className="mb-2">
                      Email
                    </Label>
                    <Input type="email" id="email" placeholder="Enter your email" />
                  </div>
                  <div>
                    <Label htmlFor="phone" className="mb-2">
                      Phone Number
                    </Label>
                    <Input type="tel" id="phone" placeholder="Enter your phone" />
                  </div>
                </div>

                <div>
                  <Label htmlFor="message" className="mb-2">
                    Details
                  </Label>
                  <Textarea id="message" placeholder="Tell us about your project" rows={4} />
                </div>
              </div>

              <div className="mt-6 grid">
                <Button type="submit" size="lg">
                  Send inquiry
                </Button>
              </div>

              <div className="mt-3 text-center">
                <p className="text-muted-foreground text-sm">We&apos;ll get back to you in 1-2 business days.</p>
              </div>

              {/* Horizontal separator with "or" */}
              <div className="relative mt-6">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">or</span>
                </div>
              </div>

              {/* Social buttons */}
              <div className="mt-6 flex justify-center gap-3">
                <Button variant="outline" size="sm" asChild>
                  <Link href="https://discord.com" target="_blank" rel="noopener noreferrer">
                    <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z" />
                    </svg>
                    Discord
                  </Link>
                </Button>

                <Button variant="outline" size="sm" asChild>
                  <Link href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                    <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                    LinkedIn
                  </Link>
                </Button>

                <Button variant="outline" size="sm" asChild>
                  <Link href="https://github.com" target="_blank" rel="noopener noreferrer">
                    <Github className="mr-2 h-4 w-4" />
                    GitHub
                  </Link>
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>

      <div className="mt-12 grid items-center gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
        <Link href={"#"} className="group hover:bg-muted flex h-full flex-col rounded-lg p-4 text-center sm:p-6">
          <BrainCircuit className="text-muted-foreground mx-auto size-9" />
          <div className="mt-5">
            <h3 className="text-lg text-black font-semibold">Knowledgebase</h3>
            <p className="text-muted-foreground mt-1">We&apos;re here to help with any questions or code.</p>
            <p className="text-primary mt-5 inline-flex items-center gap-x-1 font-medium">
              Contact support
              <svg
                className="size-4 transition ease-in-out group-hover:translate-x-1"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m9 18 6-6-6-6" />
              </svg>
            </p>
          </div>
        </Link>

        <Link href={"#"} className="group hover:bg-muted flex h-full flex-col rounded-lg p-4 text-center sm:p-6">
          <MessageSquare className="text-muted-foreground mx-auto size-9" />
          <div className="mt-5">
            <h3 className="text-lg text-black font-semibold">FAQ</h3>
            <p className="text-muted-foreground mt-1">Search our FAQ for answers to anything you might ask.</p>
            <p className="text-primary mt-5 inline-flex items-center gap-x-1 font-medium">
              Visit FAQ
              <svg
                className="size-4 transition ease-in-out group-hover:translate-x-1"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m9 18 6-6-6-6" />
              </svg>
            </p>
          </div>
        </Link>

        <Link href={"#"} className="group hover:bg-muted flex h-full flex-col rounded-lg p-4 text-center sm:p-6">
          <Wrench className="text-muted-foreground mx-auto size-9" />
          <div className="mt-5">
            <h3 className="text-lg text-black font-semibold">Developer APIs</h3>
            <p className="text-muted-foreground mt-1">Check out our development quickstart guide.</p>
            <p className="text-primary mt-5 inline-flex items-center gap-x-1 font-medium">
              Contact sales
              <svg
                className="size-4 transition ease-in-out group-hover:translate-x-1"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m9 18 6-6-6-6" />
              </svg>
            </p>
          </div>
        </Link>
      </div>
    </div>
  )
}
