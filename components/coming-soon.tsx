"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { Mail, Github, Twitter, Linkedin, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import BackgroundPaths from "./kokonutui/background-paths";

export default function ComingSoonPage() {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [countdown, setCountdown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  // Set launch date to 30 days from now
  useEffect(() => {
    const launchDate = new Date();
    launchDate.setDate(launchDate.getDate() + 60);

    const timer = setInterval(() => {
      const now = new Date();
      const difference = launchDate.getTime() - now.getTime();

      if (difference <= 0) {
        clearInterval(timer);
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setCountdown({ days, hours, minutes, seconds });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the email to your backend
    console.log("Email submitted:", email);
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 3000);
    setEmail("");
  };

  return (
    <BackgroundPaths title="" showButton={false}>
      <div className="flex flex-col items-center justify-center bg-gradient-to-b from-background to-secondary/90 p-12">
        <div className="w-full max-w-3xl text-center space-y-8">
          <center><img src="/icon.png" alt="Logo" className="h-36 w-auto" /></center>
          <h4 className="text-2xl md:text-4xl font-semibold tracking-tight">
            The Future of CS Education is{" "}
            <span className="text-primary">Coming Soon...</span>
          </h4>

          <p className="text-xl text-muted-foreground max-w-xl mx-auto">
            We're working hard to bring you something extraordinary. Stay tuned
            and be the first to know when we launch.
          </p>

          <div className="grid grid-cols-4 gap-4 max-w-lg mx-auto">
            {Object.entries(countdown).map(([unit, value]) => (
              <Card
                key={unit}
                className="p-4 flex flex-col items-center justify-center"
              >
                <span className="text-3xl font-bold">{value}</span>
                <span className="text-xs text-muted-foreground capitalize">
                  {unit}
                </span>
              </Card>
            ))}
          </div>

          {/* <div className="max-w-md mx-auto">
            <form
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row gap-2"
            >
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="flex-grow"
              />
              <Button type="submit" className="whitespace-nowrap">
                Notify Me <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </form>
            {isSubmitted && (
              <p className="mt-2 text-sm text-green-600">
                Thanks! We'll notify you when we launch.
              </p>
            )}
          </div> */}

          <div className="flex justify-center gap-6 mt-8">
            {/* <a
              href="#"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <Twitter className="h-6 w-6" />
              <span className="sr-only">Twitter</span>
            </a> */}
            <a
              href="https://github.com/Dijkstra-Edu"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <Github className="h-6 w-6" />
              <span className="sr-only">GitHub</span>
            </a>
            <a
              href="https://www.linkedin.com/company/dijkstra-edu/"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <Linkedin className="h-6 w-6" />
              <span className="sr-only">LinkedIn</span>
            </a>
            <a
              href="mailto:hello@dijkstra.org.in"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <Mail className="h-6 w-6" />
              <span className="sr-only">Email</span>
            </a>
          </div>
        </div>
      </div>
    </BackgroundPaths>
  );
}
