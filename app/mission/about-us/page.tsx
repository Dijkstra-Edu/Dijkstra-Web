"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  AreaChart,
  ArrowUpRightIcon,
  Globe,
  Heart,
  Lightbulb,
  ShieldCheck,
  Users,
} from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Types
type CompanyValue = {
  id: string;
  name: string;
  description: string;
  icon: React.ElementType;
  color: string;
  principles: string[];
  testimonial?: {
    quote: string;
    author: string;
    role: string;
    image: string;
  };
  image?: string;
};

// Company values data
const companyValues: CompanyValue[] = [
  {
    id: "innovation",
    name: "Innovation",
    description:
      "We constantly push boundaries and challenge the status quo, fostering a culture where creative thinking and experimentation are encouraged at all levels of the organization.",
    icon: Lightbulb,
    color: "text-amber-500",
    principles: [
      "Embrace experimentation and calculated risk-taking",
      "Challenge assumptions and existing processes",
      "Dedicate time and resources to exploring new ideas",
      "Learn from failures and iterate quickly",
    ],
    testimonial: {
      quote:
        "Working in an environment that truly values innovation isn&apos;t just about having the latest technology—it&apos;s about feeling empowered to question, experiment, and sometimes fail. This culture has allowed us to develop solutions no one else has thought of yet.",
      author: "Alex Chen",
      role: "Lead Product Engineer",
      image:
        "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?q=80&w=400",
    },
    image:
      "https://images.unsplash.com/photo-1534120247760-c44c3e4a62f1?q=80&w=800",
  },
  {
    id: "integrity",
    name: "Integrity",
    description:
      "We believe in transparency, honesty, and ethical conduct in everything we do. Trust is the foundation of our relationships with customers, partners, and each other.",
    icon: ShieldCheck,
    color: "text-blue-500",
    principles: [
      "Be honest and transparent in all communications",
      "Do what&apos;s right, even when it&apos;s difficult",
      "Keep commitments and take accountability for mistakes",
      "Protect private data and confidential information",
    ],
    testimonial: {
      quote:
        "In my ten years with the company, I&apos;ve seen us turn down lucrative opportunities that didn&apos;t align with our ethical standards. That consistent commitment to integrity isn&apos;t just good ethics—it&apos;s built an unparalleled level of trust with our customers.",
      author: "Sarah Johnson",
      role: "Senior Account Director",
      image:
        "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?q=80&w=400",
    },
    image:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=800",
  },
  {
    id: "collaboration",
    name: "Collaboration",
    description:
      "We achieve more together than alone. By combining diverse perspectives and skills, we create solutions that are stronger, more innovative, and more effective than any individual could produce.",
    icon: Users,
    color: "text-indigo-500",
    principles: [
      "Value and seek diverse perspectives",
      "Share knowledge openly across teams",
      "Give credit and celebrate team achievements",
      "Support colleagues and prioritize team success",
    ],
    testimonial: {
      quote:
        "The collaborative spirit here isn&apos;t just talk—it&apos;s built into how we work. Even as we&apos;ve grown to multiple offices globally, we&apos;ve maintained a culture where everyone&apos;s input is valued and people genuinely enjoy working together to solve challenging problems.",
      author: "Miguel Hernandez",
      role: "Global Operations Manager",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400",
    },
    image:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=800",
  },
  {
    id: "customer-focus",
    name: "Customer Focus",
    description:
      "Our customers are at the center of everything we do. We&apos;re committed to understanding their needs, exceeding their expectations, and building lasting relationships based on mutual success.",
    icon: Heart,
    color: "text-red-500",
    principles: [
      "Deeply understand customer needs and pain points",
      "Prioritize features that deliver true customer value",
      "Proactively gather and implement customer feedback",
      "Measure success through customer outcomes",
    ],
    testimonial: {
      quote:
        "I&apos;ve been amazed at how customer feedback directly shapes our product roadmap. When I joined, I expected the usual lip service to customer-centricity, but here, customer success genuinely drives every decision from product features to support policies.",
      author: "Avery Wilson",
      role: "Customer Success Lead",
      image:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=400",
    },
    image:
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=800",
  },
  {
    id: "excellence",
    name: "Excellence",
    description:
      "We strive for excellence in everything we do, from the quality of our products to our customer service. We set high standards and continuously work to exceed them through learning and improvement.",
    icon: AreaChart,
    color: "text-emerald-500",
    principles: [
      "Set ambitious goals and high standards",
      "Pursue continuous improvement through feedback",
      "Pay attention to details without losing sight of the big picture",
      "Take pride in delivering exceptional quality",
    ],
    testimonial: {
      quote:
        "The most inspiring thing about working here is how everyone strives for excellence while remaining humble. There&apos;s always a sense that we can do better—not from a place of dissatisfaction, but from genuine passion for creating the best possible experience for our users.",
      author: "Jordan Taylor",
      role: "Quality Assurance Director",
      image:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400",
    },
    image:
      "https://images.unsplash.com/photo-1515187029135-18ee286d815b?q=80&w=800",
  },
  {
    id: "sustainability",
    name: "Sustainability",
    description:
      "We are committed to creating a positive environmental and social impact. Our business decisions consider long-term sustainability and our responsibility to future generations.",
    icon: Globe,
    color: "text-green-500",
    principles: [
      "Minimize environmental impact in operations and products",
      "Support community initiatives and social causes",
      "Consider long-term sustainability in all business decisions",
      "Measure and report on environmental and social performance",
    ],
    testimonial: {
      quote:
        "When we announced our carbon-neutral initiative, I wasn&apos;t sure if it would be more than a marketing exercise. Three years later, we&apos;ve reduced emissions by 68%, switched to renewable energy, and built sustainability requirements into our entire supply chain. It&apos;s real change.",
      author: "Priya Patel",
      role: "Sustainability Program Manager",
      image:
        "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=400",
    },
    image:
      "https://images.unsplash.com/photo-1536859355448-76f92ebdc33d?q=80&w=800",
  },
];

export default function AboutSectionCompanyValues() {
  const [activeValue, setActiveValue] = useState<string>(companyValues[0].id);

  // Get active value object
  const currentValue =
    companyValues.find((value) => value.id === activeValue) || companyValues[0];

  return (
    <section className="py-24 px-[300px]">
      <div className="container mx-auto px-4 md:px-6 2xl:max-w-[1400px]">
        <div className="mx-auto mb-16 max-w-3xl space-y-4 text-center">
          <div className="bg-primary/10 text-primary inline-block rounded-lg px-3 py-1 text-sm">
            Core Values
          </div>
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
            What Guides Our Decisions
          </h2>
          <p className="text-muted-foreground">
            Our values aren&apos;t just words on a wall—they&apos;re the
            principles that guide our daily actions and long-term vision,
            shaping our culture and driving our success.
          </p>
        </div>

        <Tabs
          value={activeValue}
          onValueChange={setActiveValue}
          className="space-y-8"
        >
          {/* Value selection - Tabs for md+ screens, Dropdown for smaller screens */}
          <div className="mb-8 flex justify-center">
            {/* Dropdown for small screens */}
            <div className="w-full md:hidden">
              <Select value={activeValue} onValueChange={setActiveValue}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a value" />
                </SelectTrigger>
                <SelectContent>
                  {companyValues.map((value) => (
                    <SelectItem key={value.id} value={value.id}>
                      {value.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Tabs for medium screens and above */}
            <TabsList className="hidden h-auto bg-transparent p-1 md:flex">
              {companyValues.map((value) => (
                <TabsTrigger
                  key={value.id}
                  value={value.id}
                  className={cn(
                    "data-[state=active]:bg-muted gap-2",
                    "data-[state=active]:border-border border border-transparent",
                  )}
                >
                  {React.createElement(value.icon, { className: cn("h-4 w-4", value.color) })}
                  <span>{value.name}</span>
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          {/* Value content */}
          <div className="grid items-center gap-8 md:grid-cols-12">
            {/* Left column: Value details */}
            <div className="space-y-6 md:col-span-6">
              <div className="mb-4 flex items-center gap-4">
                <div className={cn("rounded-xl p-2.5", "bg-muted")}>
                  {React.createElement(currentValue.icon, {
                    className: cn("h-7 w-7", currentValue.color),
                  })}
                </div>
                <h3 className="text-2xl font-bold">{currentValue.name}</h3>
              </div>

              <p className="text-muted-foreground text-lg">
                {currentValue.description}
              </p>

              <div className="space-y-3 pt-2">
                <h4 className="font-medium">Key Principles:</h4>
                <ul className="space-y-2">
                  {currentValue.principles.map((principle, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <ArrowUpRightIcon
                        className={cn("mt-0.5 h-5 w-5", currentValue.color)}
                      />
                      <span>{principle}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {currentValue.testimonial && (
                <Card className="bg-muted/30 mt-6 p-0">
                  <CardContent className="p-6">
                    <div className="mb-4 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
                      <div className="relative h-12 w-12 flex-shrink-0 overflow-hidden rounded-full">
                        <Image
                          src={currentValue.testimonial.image}
                          alt={currentValue.testimonial.author}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <h4 className="font-semibold">
                          {currentValue.testimonial.author}
                        </h4>
                        <p className="text-muted-foreground text-sm">
                          {currentValue.testimonial.role}
                        </p>
                      </div>
                    </div>
                    <p className="text-muted-foreground italic">
                      &quot;{currentValue.testimonial.quote}&quot;
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Right column: Value image */}
            <div className="md:col-span-6">
              {currentValue.image ? (
                <div className="relative aspect-[4/3] overflow-hidden rounded-xl shadow-lg">
                  <Image
                    src={currentValue.image}
                    alt={`Illustration of our ${currentValue.name} value`}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <div className="absolute right-0 bottom-0 left-0 p-6">
                    <div
                      className={cn(
                        "inline-block rounded-lg px-3 py-1 text-sm text-white",
                        "bg-black/30 backdrop-blur-sm",
                      )}
                    >
                      {currentValue.name}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-muted flex aspect-[4/3] items-center justify-center rounded-xl">
                  {React.createElement(currentValue.icon as React.ElementType, {
                    className: cn(
                      "h-24 w-24",
                      currentValue.color,
                      "opacity-25",
                    ),
                  })}
                </div>
              )}
            </div>
          </div>
        </Tabs>

        {/* Call-to-action */}
        <div className="mt-16 text-center">
          <p className="text-muted-foreground mx-auto mb-6 max-w-2xl">
            These values guide every aspect of our work. Want to be part of a
            team that lives these values every day?
          </p>
          <Button asChild size="lg">
            <Link href="/careers">Join Our Team</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
