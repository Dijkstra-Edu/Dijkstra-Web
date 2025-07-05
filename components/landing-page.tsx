"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  CheckCircle,
  Code,
  Cpu,
  Github,
  Globe,
  Menu,
  MessageSquare,
  Moon,
  Sun,
  Twitter,
  X,
} from "lucide-react";
import Link from "next/link";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dotted-dialog";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { CloudPlatform } from "./interactive/cloud-platform";
import { AnalyticsPlatform } from "./interactive/analytics-platform";
import { SecurityPlatform } from "./interactive/security-platform";
import { TeamVisualization } from "./interactive/team-visualization";
import { useMediaQuery } from "@/hooks/use-media-query";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { IconBrandGithub } from "@tabler/icons-react";

export default function LandingPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const isVerySmall = useMediaQuery("(max-width: 500px)");
  const router = useRouter();
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const headerClass =
    scrollY > 50
      ? "py-4 bg-black/80 backdrop-blur-md border-gray-800/50"
      : "py-6 bg-transparent";

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* Header */}
      <header
        className={`fixed top-0 px-[300px] left-0 right-0 z-50 transition-all duration-300 ${headerClass}`}
      >
        <div className="container mx-auto px-4 flex justify-between items-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-2"
          >
            {/* <Cpu className="h-6 w-6 text-purple-500" />
            <span className="font-bold text-xl">TechNova</span> */}
            <a href="#" className="flex items-center gap-2">
              <img src="/icon.png" alt="Logo" className="h-12 w-auto" />
              <span className="font-bold text-xl">Dijkstra</span>
            </a>
          </motion.div>
          <nav className="hidden md:flex items-center gap-8">
            {["Mission", "Features", "Products", "About", "Testimonials"].map(
              (item, i) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                >
                  <Link
                    href={`#${item.toLowerCase()}`}
                    className="text-gray-300 hover:text-white transition-colors text-sm font-medium"
                  >
                    {item}
                  </Link>
                </motion.div>
              )
            )}
          </nav>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <div className="flex items-center gap-4">
              <Button
                className="bg-black hover:bg-neutral-900 border
             dark:bg-black dark:hover:bg-neutral-900 dark:text-white border-[#048304] text-[#048304] hover:opacity-90 cursor-pointer
             h-9 px-4 py-2"
                onClick={() => window.open("https://github.com/Dijkstra-Edu", "_blank")}
              >
                <IconBrandGithub className="h-5 w-5" />
              </Button>
              <Button
                className="bg-black hover:bg-neutral-900 border
                 dark:bg-black dark:hover:bg-neutral-900 dark:text-white border-[#048304] text-[#048304] hover:opacity-90 cursor-pointer
                 h-9 px-4 py-2"
                onClick={() => router.push("/login")}
              >
                Login
              </Button>
              <Button
                className="bg-black hover:bg-neutral-900 border
                 dark:bg-black dark:hover:bg-neutral-900 dark:text-white border-[#048304] text-[#048304] hover:opacity-90 cursor-pointer
                 h-9 px-4 py-2"
                onClick={() => router.push("/dashboard")}
              >
                Get Started
              </Button>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </motion.div>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed top-[72px] left-0 right-0 z-40 bg-black border-b border-gray-800 md:hidden"
          >
            <div className="container mx-auto px-4 py-6 flex flex-col gap-6">
              {["Features", "Products", "About", "Testimonials"].map((item) => (
                <Link
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="text-gray-300 hover:text-white transition-colors text-lg font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item}
                </Link>
              ))}
              <Button
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 w-full"
                onClick={() => {
                  setIsMenuOpen(false);
                  setIsModalOpen(true);
                }}
              >
                Get Started
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-[#048304]/20 to-black" />
          <div className="absolute top-0 left-0 right-0 h-[500px] bg-gradient-to-b from-[#048304]/10 to-transparent" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(5, 177, 5,0.1),transparent_65%)]" />
        </div>

        <div className="container mx-auto px-4 relative h-[100vh] z-10">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-4xl sm:text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white  to-white bg-clip-text text-transparent leading-tight"
            >
              Your Career in Software
              <br /> Starts Here
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-base sm:text-lg md:text-xl text-gray-300 mb-10 max-w-2xl mx-auto"
            >
              Welcome to Dijkstra, an open source free for all platform designed
              to help you crack software engineering jobs with ease.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <Button
                onClick={() => setIsModalOpen(true)}
                className="bg-gradient-to-r from-white to-white hover:from-purple-700 hover:to-blue-700 text-black px-4 sm:px-8 py-4 sm:py-6 rounded-full text-sm sm:text-lg font-medium shadow-lg shadow-purple-900/30 hover:shadow-purple-900/50 transition-all duration-300"
              >
                Get Started Now
                <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
              </Button>
            </motion.div>
          </div>
          <div>
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.8 }}
              className="relative w-full max-w-5xl mx-auto"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-lg blur-3xl" />
              <div className="relative bg-gray-900/50 backdrop-blur-sm border border-gray-800/50 rounded-lg overflow-hidden shadow-2xl">
                <Image
                  src="/dashboard.png"
                  alt="Hero Image"
                  width={1200}
                  height={1200}
                  className="max-w-full h-auto rounded-lg shadow-lg"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Dijkstra's Mission */}
      {/* - For Student By Students Banner */}

      {/* How Does this work? */}
      {/* 
      - One stop spot to track your progress across all platforms - Preparation has become quite crazy, this is a one stop solution for it all.
      - Complete Tasks, improve your profile, and see yourself level up in terms of skills for jobs
      - Based on tasks completed, you will be able to better guage the potential for you landing a job, an internship or a project.
      - If you don't have any experience, that's alright! Go through the Crash course on how to learn and compelte projects, and then start contributing to Dijkstra's codebase! (We'll give you a certificate for the same! Leverage your experience contributing to open source here for other opportunities!)
      - Give back to the community by writing articles, pushing code, thereby improving your credibility to the tech world.
      */}

      {/* Features Section */}
      {/* 
      - Dashboard - A single place to track progress on Github, Leetcode, etc, along with your resume and CV updates, articles and blogs, and more!
      - Learning Center - Not the most conventional learning center, but a place that teaches you how to learn, how to build projects, and ton of resources (all open source and free!)
        - Community - A place to connect with other students, share your progress, and get help from mentors.
        - Projects - A place to find projects to work on, contribute to open source, and build your portfolio.
        - Articles - A place to read and write articles, share your knowledge, and learn from others.
        - Mentorship - A place to connect with mentors, get guidance, and improve your skills.
        - Dijkstra GPT - A place to get help from AI, ask questions, and get answers.
        - Opportunities - A place to find internships, jobs, and projects (All based on your rank and skills gained through the platform)

      */}

      {/* Open Source, GitHub based, Community facing work */}

      {/* Our Members have gone on to work in the following companies */}

      {/* Testimonials */}

      {/* Ready to Get Started? Onboarding */}

      {/* Contact Us */}

      {/* About Us */}

      {/* Features Section */}
      <section
        id="features"
        className="py-24 bg-white relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(5, 177, 5,0.1),transparent_50%)]" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl md:text-5xl font-bold mb-4 text-black">
                Powerful Features
              </h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                Our platform offers a comprehensive suite of tools designed to
                enhance your productivity and streamline your workflow.
              </p>
            </motion.div>
          </div>

          <div className="grid md:grid-cols-2 px-[300px]  lg:grid-cols-3 gap-8">
            {[
              {
                icon: <Code className="h-10 w-10 text-purple-500" />,
                title: "Advanced API",
                description:
                  "Integrate seamlessly with our robust API designed for developers with comprehensive documentation and examples.",
              },
              {
                icon: <Globe className="h-10 w-10 text-blue-500" />,
                title: "Global CDN",
                description:
                  "Lightning-fast content delivery across our worldwide network with 99.9% uptime guarantee.",
              },
              {
                icon: <CheckCircle className="h-10 w-10 text-green-500" />,
                title: "Reliable Security",
                description:
                  "Enterprise-grade security with end-to-end encryption and compliance with industry standards.",
              },
              {
                icon: <Cpu className="h-10 w-10 text-red-500" />,
                title: "AI-Powered",
                description:
                  "Leverage the power of artificial intelligence to optimize your workflow and gain valuable insights.",
              },
              {
                icon: <MessageSquare className="h-10 w-10 text-yellow-500" />,
                title: "24/7 Support",
                description:
                  "Our dedicated team is always available to assist you with any issues through multiple channels.",
              },
              {
                icon: <Github className="h-10 w-10 text-gray-400" />,
                title: "Open Source",
                description:
                  "Contribute to our growing ecosystem of open-source tools and libraries with active community support.",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="h-full bg-gradient-to-b from-gray-900 to-gray-950 p-[1px] rounded-xl">
                  <div className="h-full bg-gradient-to-b from-gray-900 to-gray-950 p-6 rounded-xl border border-gray-800/50 hover:border-purple-500/50 transition-colors backdrop-blur-sm">
                    <div className="mb-4 p-3 bg-gray-800/30 rounded-lg inline-block">
                      {feature.icon}
                    </div>
                    <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                    <p className="text-gray-400">{feature.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section id="products" className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(5, 177, 5,0.1),transparent_50%)]" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl md:text-5xl font-bold mb-4">
                Our Products
              </h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                Explore our suite of innovative products designed to transform
                your digital experience.
              </p>
            </motion.div>
          </div>

          <div className="space-y-24">
            {/* TechNova Cloud */}
            <div className="grid md:grid-cols-2 px-[300px] gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="space-y-6"
              >
                <h3 className="text-3xl font-bold">TechNova Cloud</h3>
                <p className="text-gray-300 text-lg">
                  A scalable cloud platform that adapts to your needs. Deploy
                  applications with ease and manage resources efficiently.
                </p>
                <ul className="space-y-3">
                  {[
                    "Auto-scaling",
                    "Global distribution",
                    "Pay-as-you-go pricing",
                    "99.9% uptime SLA",
                  ].map((feature, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-purple-500" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                  Learn More
                </Button>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <div className="bg-gradient-to-br from-purple-500/20 to-blue-500/20 p-1 rounded-lg">
                  <div className="relative h-[300px] md:h-[400px] w-full rounded-lg overflow-hidden">
                    <CloudPlatform />
                  </div>
                </div>
              </motion.div>
            </div>

            {/* TechNova Analytics */}
            <div className="grid md:grid-cols-2 px-[300px] gap-8 md:gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="order-1 md:order-last space-y-4 md:space-y-6"
              >
                <h3 className="text-2xl md:text-3xl font-bold">
                  TechNova Analytics
                </h3>
                <p className="text-gray-300 text-base md:text-lg">
                  Gain valuable insights from your data with our powerful
                  analytics platform. Make data-driven decisions with
                  confidence.
                </p>
                <ul className="space-y-2 md:space-y-3">
                  {[
                    "Real-time dashboards",
                    "Custom reports",
                    "AI-powered predictions",
                    "Data visualization",
                  ].map((feature, i) => (
                    <li key={i} className="flex items-center gap-2 md:gap-3">
                      <CheckCircle className="h-4 w-4 md:h-5 md:w-5 text-purple-500 flex-shrink-0" />
                      <span className="text-sm md:text-base">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                  Learn More
                </Button>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="order-2 md:order-first"
              >
                <div className="bg-gradient-to-br from-purple-500/20 to-blue-500/20 p-1 rounded-lg">
                  <div className="relative h-[300px] md:h-[400px] w-full rounded-lg overflow-hidden">
                    <AnalyticsPlatform />
                  </div>
                </div>
              </motion.div>
            </div>

            {/* TechNova Security */}
            <div className="grid md:grid-cols-2 px-[300px] gap-8 md:gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="space-y-4 md:space-y-6 order-1 md:order-1"
              >
                <h3 className="text-2xl md:text-3xl font-bold">
                  TechNova Security
                </h3>
                <p className="text-gray-300 text-base md:text-lg">
                  Protect your digital assets with our comprehensive security
                  solution. Stay ahead of threats with advanced protection.
                </p>
                <ul className="space-y-2 md:space-y-3">
                  {[
                    "Threat detection",
                    "Vulnerability scanning",
                    "Compliance monitoring",
                    "24/7 security operations",
                  ].map((feature, i) => (
                    <li key={i} className="flex items-center gap-2 md:gap-3">
                      <CheckCircle className="h-4 w-4 md:h-5 md:w-5 text-purple-500 flex-shrink-0" />
                      <span className="text-sm md:text-base">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                  Learn More
                </Button>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="order-2 md:order-2"
              >
                <div className="bg-gradient-to-br from-purple-500/20 to-blue-500/20 p-1 rounded-lg">
                  <div className="relative h-[300px] md:h-[400px] w-full rounded-lg overflow-hidden">
                    <SecurityPlatform />
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(5, 177, 5,0.1),transparent_60%)]" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid md:grid-cols-2 px-[300px] gap-8 md:gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="order-1 md:order-1"
            >
              <h2 className="text-2xl md:text-3xl lg:text-5xl font-bold mb-4 md:mb-6">
                About Our Mission
              </h2>
              <p className="text-gray-300 mb-4 md:mb-6 text-sm sm:text-base md:text-lg">
                Founded in 2023, TechNova was created with a singular vision: to
                democratize access to cutting-edge technology. We believe that
                powerful tools should be accessible to everyone, regardless of
                technical expertise.
              </p>
              <p className="text-gray-300 mb-4 md:mb-6 text-sm sm:text-base md:text-lg">
                Our team of passionate engineers and designers work tirelessly
                to create intuitive, powerful solutions that solve real-world
                problems and empower our users to achieve more.
              </p>
              <div className="flex flex-wrap gap-2 sm:gap-3 md:gap-4 mb-6 md:mb-8">
                <div className="bg-gray-800/50 backdrop-blur-sm px-2 sm:px-3 md:px-4 py-1 sm:py-1.5 md:py-2 rounded-full text-xs sm:text-sm md:text-base">
                  <span className="text-purple-400 font-medium">50+</span> Team
                  Members
                </div>
                <div className="bg-gray-800/50 backdrop-blur-sm px-2 sm:px-3 md:px-4 py-1 sm:py-1.5 md:py-2 rounded-full text-xs sm:text-sm md:text-base">
                  <span className="text-purple-400 font-medium">10k+</span>{" "}
                  Customers
                </div>
                <div className="bg-gray-800/50 backdrop-blur-sm px-2 sm:px-3 md:px-4 py-1 sm:py-1.5 md:py-2 rounded-full text-xs sm:text-sm md:text-base">
                  <span className="text-purple-400 font-medium">99.9%</span>{" "}
                  Uptime
                </div>
              </div>
              <Button
                variant="outline"
                className="border-purple-500 text-purple-500 hover:bg-purple-950 text-sm sm:text-base"
              >
                Learn More About Us
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="order-2 md:order-2"
            >
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-lg blur-xl" />
                <div className="relative rounded-lg overflow-hidden">
                  <div className="w-full h-[300px] md:h-[400px]">
                    <TeamVisualization />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section
        id="testimonials"
        className="py-24 relative overflow-hidden px-[300px]"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(5, 177, 5,0.1),transparent_50%)]" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl md:text-5xl font-bold mb-4">
                What Our Clients Say
              </h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                Don't just take our word for it. Here's what our clients have to
                say about their experience with TechNova.
              </p>
            </motion.div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah Johnson",
                role: "CTO, TechStart Inc.",
                image: "https://avatar.vercel.sh/jill",
                content:
                  "TechNova has completely transformed our development workflow. The platform's intuitive design and powerful features have increased our team's productivity by over 40%.",
              },
              {
                name: "Michael Chen",
                role: "Founder, DataFlow",
                image: "https://avatar.vercel.sh/jill",
                content:
                  "Implementing TechNova was one of the best decisions we've made. The seamless integration and robust API have allowed us to focus on what matters most - building great products.",
              },
              {
                name: "Emily Rodriguez",
                role: "Lead Developer, InnovateCorp",
                image: "https://avatar.vercel.sh/jill",
                content:
                  "As a developer, I appreciate the attention to detail in TechNova's platform. The documentation is comprehensive, and the support team is always ready to help.",
              },
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="h-full bg-gradient-to-b from-gray-900 to-gray-950 p-[1px] rounded-xl">
                  <div className="h-full bg-gradient-to-b from-gray-900 to-gray-950 p-8 rounded-xl border border-gray-800/50 backdrop-blur-sm">
                    <div className="flex items-center mb-6">
                      <div className="relative w-12 h-12 rounded-full overflow-hidden mr-4">
                        <Image
                          src={testimonial.image || "/placeholder.svg"}
                          alt={testimonial.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <h4 className="font-bold">{testimonial.name}</h4>
                        <p className="text-gray-400 text-sm">
                          {testimonial.role}
                        </p>
                      </div>
                    </div>
                    <p className="text-gray-300 italic">
                      "{testimonial.content}"
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section
        id="contact"
        className="py-24 relative overflow-hidden px-[300px] bg-white"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(5, 177, 5,0.9),transparent_50%)]" />

        <div className="container mx-auto px-4 relative z-10 bg-w">
          <div className="max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-5xl font-bold mb-4 text-black">
                Ready to Get Started?
              </h2>
              <p className="text-gray-300 mb-8 text-lg">
                Join thousands of satisfied users who have already transformed
                their workflow with TechNova.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="bg-gradient-to-b from-gray-900 to-gray-950 p-[1px] rounded-xl">
                <div className="bg-gradient-to-b from-gray-900 to-gray-950 p-8 rounded-xl border border-gray-800/50 backdrop-blur-sm">
                  <h3 className="text-2xl font-bold mb-6">Contact Us</h3>
                  <form className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="name" className="text-gray-300">
                          Name
                        </Label>
                        <Input
                          id="name"
                          type="text"
                          placeholder="Enter your name"
                          className="bg-gray-800/50 border-gray-700 focus:border-purple-500 h-12"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-gray-300">
                          Email
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="Enter your email"
                          className="bg-gray-800/50 border-gray-700 focus:border-purple-500 h-12"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="subject" className="text-gray-300">
                        Subject
                      </Label>
                      <Input
                        id="subject"
                        type="text"
                        placeholder="Enter subject"
                        className="bg-gray-800/50 border-gray-700 focus:border-purple-500 h-12"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="message" className="text-gray-300">
                        Message
                      </Label>
                      <textarea
                        id="message"
                        rows={4}
                        placeholder="Enter your message"
                        className="w-full px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                      ></textarea>
                    </div>
                    <Button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 h-12 text-base">
                      Send Message
                    </Button>
                  </form>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 border-t border-gray-800/50 px-[300px] relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,rgba(5, 177, 5,0.1),transparent_70%)]" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
            <div>
              <div className="flex items-center gap-2 mb-6">
                {/* <Cpu className="h-6 w-6 text-purple-500" />
                <span className="font-bold text-xl">TechNova</span> */}
                <a href="#" className="flex items-center gap-2">
                  <img src="/icon.png" alt="Logo" className="h-12 w-auto" />
                  <span className="font-bold text-xl">Dijkstra</span>
                </a>
              </div>
              <p className="text-gray-400 mb-6">For Students, By Students.</p>
              <div className="flex space-x-4">
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <Twitter className="h-5 w-5" />
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <Github className="h-5 w-5" />
                </a>
              </div>
            </div>

            <div>
              <h4 className="font-bold text-lg mb-6">Get Started</h4>
              <ul className="space-y-4">
                {[
                  "Onboarding",
                  "Dashboard",
                  "Opportunities",
                  "API",
                  "Documentation",
                ].map((item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-lg mb-6">Organization</h4>
              <ul className="space-y-4">
                {["Mission", "About Us", "Blog", "Press", "Partners"].map(
                  (item) => (
                    <li key={item}>
                      <a
                        href="#"
                        className="text-gray-400 hover:text-white transition-colors"
                      >
                        {item}
                      </a>
                    </li>
                  )
                )}
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-lg mb-6">Legal</h4>
              <ul className="space-y-4">
                {["Terms", "Privacy", "Cookies", "Licenses", "Contact"].map(
                  (item) => (
                    <li key={item}>
                      <a
                        href="#"
                        className="text-gray-400 hover:text-white transition-colors"
                      >
                        {item}
                      </a>
                    </li>
                  )
                )}
              </ul>
            </div>
          </div>

          <div className="mt-16 pt-8 border-t border-gray-800/50 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">
              &copy; {new Date().getFullYear()} JRS Studios. All rights
              reserved.
            </p>
            <div className="flex gap-6">
              <a
                href="#"
                className="text-gray-400 hover:text-white text-sm transition-colors"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white text-sm transition-colors"
              >
                Terms of Service
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white text-sm transition-colors"
              >
                Cookies
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* Modal */}
      <Dialog
        open={isModalOpen}
        onOpenChange={(open) => !open && setIsModalOpen(false)}
      >
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-2xl">Get Early Access</DialogTitle>
            <DialogDescription>
              Join our exclusive beta program and be among the first to
              experience the future of technology.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="modal-email">Email</Label>
              <Input
                id="modal-email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-gray-800/50 border-gray-700 focus:border-purple-500"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="modal-name">Full Name</Label>
              <Input
                id="modal-name"
                type="text"
                placeholder="Enter your full name"
                className="bg-gray-800/50 border-gray-700 focus:border-purple-500"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="modal-company">Company (Optional)</Label>
              <Input
                id="modal-company"
                type="text"
                placeholder="Enter your company name"
                className="bg-gray-800/50 border-gray-700 focus:border-purple-500"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
              onClick={() => {
                alert("Thank you for your interest! We'll be in touch soon.");
                setIsModalOpen(false);
              }}
            >
              Submit
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
