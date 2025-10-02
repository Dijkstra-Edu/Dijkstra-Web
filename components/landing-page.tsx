"use client";

import { useState, useEffect, useMemo, useRef } from "react";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  CheckCircle,
  Code,
  Github,
  Menu,
  Clock,
  FileSearch,
  Building,
  AlertCircle,
  Calendar,
  X,
  Eye,
  BrainCircuit,
  Target,
  Users,
  Workflow,
  LogIn,
  Terminal,
  Lightbulb,
  Hourglass,
  Brain,
  Handshake,
  BookOpen,
  FolderKanban,
  Trophy,
  ChevronDown,
  Cpu,
  Globe,
  MessageSquare,
  Wrench,
  Book,
  Crosshair,
  XCircle,
  CircleAlert,
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
import { motion, AnimatePresence, color } from "framer-motion";
import Image from "next/image";
import { CloudPlatform } from "./interactive/cloud-platform";
import { AnalyticsPlatform } from "./interactive/analytics-platform";
import { SecurityPlatform } from "./interactive/security-platform";
import { TeamVisualization } from "./interactive/team-visualization";
import { useMediaQuery } from "@/hooks/use-media-query";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import {
  IconBrandDiscord,
  IconBrandGithub,
  IconBrandLinkedin,
} from "@tabler/icons-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { addWeeks, format } from "date-fns";
import Masonry from "./masonry";
import ContactForm from "./contact-form";
import { items } from '../data/masonry'; // adjust the path as needed
import { cn } from "@/lib/tiptap-utils";

type TimelineSubItem = {
  title: string;
  content: React.ReactNode;
};

type TimelineItemProps = {
  title: string;
  description: string;
  content: React.ReactNode;
  icon: React.ComponentType<{ className?: string }>;
  isLast?: boolean;
  cumulativeTime?: string;
  date?: Date | null;
  subItems?: TimelineSubItem[];
};

const TimelineItem = ({
  title,
  description,
  content,
  icon: Icon,
  isLast = false,
  cumulativeTime,
  date,
  subItems = [],
}: TimelineItemProps) => (
  <div className="flex">
    <div className="flex flex-col items-center mr-4">
      <div className="flex items-center justify-center w-10 h-10 rounded-full border-2 border-primary bg-background">
        <Icon className="w-5 h-5 text-primary" />
      </div>
      {!isLast && <div className="w-0.5 h-full bg-primary mt-2"></div>}
    </div>
    <div className="flex-1 mb-6">
      <Card className="mb-2">
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent>
          {content}
          {date && (
            <p className="mt-2 text-sm text-muted-foreground">
              <Calendar className="inline mr-2" />
              Estimated date: {format(date, "dd MMM yyyy")}
            </p>
          )}
        </CardContent>
      </Card>
      {subItems.map((item, index) => (
        <Card key={index} className="ml-8 mt-2 border-dashed">
          <CardHeader>
            <CardTitle className="text-sm">{item.title}</CardTitle>
          </CardHeader>
          <CardContent>{item.content}</CardContent>
        </Card>
      ))}
      {cumulativeTime && (
        <div className="mt-2 text-right">
          <span className="bg-muted px-2 py-1 rounded text-sm font-semibold text-black">
            {cumulativeTime}
          </span>
        </div>
      )}
    </div>
  </div>
);

export default function LandingPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const isVerySmall = useMediaQuery("(max-width: 500px)");
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false)
  const [activeMegaMenu, setActiveMegaMenu] = useState<string | null>(null)
  const headerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }

    handleScroll()
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])



  // useEffect(() => {
  //   const handleScroll = () => {
  //     setScrollY(window.scrollY);
  //   };

  //   window.addEventListener("scroll", handleScroll);
  //   return () => window.removeEventListener("scroll", handleScroll);
  // }, []);

  const headerClass =
    scrollY > 50
      ? "py-4 bg-black/90 backdrop-blur-md border-gray-800/50"
      : "py-6 bg-transparent";

  const NUM_ROWS = 14;
  const SEGMENTS_PER_ROW = 4;
  const SAFE_ZONE_VERTICAL = [40, 60]; // % from top
  const SAFE_ZONE_HORIZONTAL = [30, 70]; // % from left

  const segments = useMemo(() => {
    const allSegments = [];

    for (let row = 0; row < NUM_ROWS; row++) {
      const top = (row / NUM_ROWS) * 100;

      for (let i = 0; i < SEGMENTS_PER_ROW; i++) {
        const width = 5 + Math.random() * 15; // width between 5% and 20%
        const left = Math.random() * (100 - width); // ensure it doesn't overflow

        // Skip if the row intersects the vertical center zone
        const inVerticalSafeZone =
          top > SAFE_ZONE_VERTICAL[0] && top < SAFE_ZONE_VERTICAL[1];
        const inHorizontalSafeZone =
          left < SAFE_ZONE_HORIZONTAL[1] &&
          left + width > SAFE_ZONE_HORIZONTAL[0];

        if (inVerticalSafeZone && inHorizontalSafeZone) continue;

        allSegments.push({ top, left, width });
      }
    }

    return allSegments;
  }, []);

  const [startDate, setStartDate] = useState<Date | null>(new Date());

  const calculateDate = (weeks: number) => {
    return startDate ? addWeeks(startDate, weeks) : null;
  };

  const renderAbsoluteBeginners = () => (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold mt-6 mb-4 text-black">
        Path 1: Absolute Beginners
      </h2>
      <TimelineItem
        title="0) Onboarding with Dijkstra"
        description="Get started by Setting up everything you need, From important sites to code editors. Time taken depends on your knoweldge of Git (or) other version control systems."
        icon={LogIn}
        content={
          <p>
            <Clock className="inline mr-2" />
            Takes anywhere between 30mins to 3 hours to get up and running.
          </p>
        }
        cumulativeTime="Start"
        date={startDate}
      />
      <TimelineItem
        title="1) Learning to Code"
        description="Get started with the fundamentals of Coding. Start by learning the basics, building up to knowledge for both projects, as well as technical interviews."
        icon={Code}
        content={
          <p>
            <Clock className="inline mr-2" />
            This can take anywhere between 4-8 weeks.
          </p>
        }
        cumulativeTime="6 weeks"
        date={calculateDate(6)}
      />
      <TimelineItem
        title="2) Gaining Value from Learning to Code"
        description="Now the fun begins! Start by building simple projects, while progressing in your understanding of logic through DSA."
        icon={FileSearch}
        content={
          <p>
            <Clock className="inline mr-2" />
            Can take anywhere between 1-2 months.
          </p>
        }
        subItems={[
          {
            title: "Start working on Projects",
            content: (
              <p>
                <Clock className="inline mr-2" />
                Depends on the length of projects. Anywhere from 3 hours to a
                week. The expectation is to complete multiple projects to better
                understand how to use code practically.
              </p>
            ),
          },
          {
            title: "Getting started with DSA and Leetcode",
            content: (
              <p>
                <Clock className="inline mr-2" />
                Understanding DSA goes a long way in being able to code what you
                think in an effective manner! This can take a while, potentially
                a month of serious study
              </p>
            ),
          },
        ]}
        cumulativeTime="8 weeks"
        date={calculateDate(8)}
      />
      {renderFinalSteps(2)}
    </div>
  );

  const renderUniversityandExperienced = () => (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold mt-6 mb-4 text-black">
        Path 2: For University and Experienced Students
      </h2>
      <TimelineItem
        title="0) Onboarding with Dijkstra"
        description="Get started by Setting up everything you need, From important sites to code editors. Time taken depends on your knoweldge of Git (or) other version control systems."
        icon={LogIn}
        content={
          <p>
            <Clock className="inline mr-2" />
            Takes anywhere between 30mins to 3 hours to get up and running.
          </p>
        }
        cumulativeTime="Start"
        date={startDate}
      />
      <TimelineItem
        title="1) Getting Started with Leetcode"
        description="Start by improving your DSA skills by practicing 2 problems a day."
        icon={Terminal}
        content={
          <p>
            <Clock className="inline mr-2" />
            Takes anywhere between 30mins to 3 hours to get up and running.
          </p>
        }
        cumulativeTime="6 weeks"
        date={calculateDate(6)}
      />
      <TimelineItem
        title="2) Refactoring Approach to Projects"
        description="Revamping profiles, portfolios and resumes to better reflect your skills and experience."
        icon={Building}
        content={
          <p>
            <Clock className="inline mr-2" />
            Can take anywhere between 2-4 weeks.
          </p>
        }
        cumulativeTime="8 weeks"
        date={calculateDate(8)}
      />
      <TimelineItem
        title="3) Approaching opportunities with Dijkstra and partner organizations"
        description="Putting to use everything you've learned so far, with the help of Dijkstra and our partner organizations."
        icon={CheckCircle}
        content={<p>
            <Clock className="inline mr-2" />
            Ideally 1-2 months of work within open source projects.
          </p>}
        cumulativeTime="10 weeks"
        date={calculateDate(10)}
      />
      <TimelineItem
        title="4) Start applying to other Open Source Opportunities"
        description="These include fellowships like GSOC, LFX, Outreachy, MLH Fellowship, etc."
        icon={FileSearch}
        content={
          <p>
            <Clock className="inline mr-2" />Anywhere between 3-6 months, depending on time of year
          </p>
        }
        // subItems={[
        //   {
        //     title: "Information Requests",
        //     content: (
        //       <p>
        //         <Clock className="inline mr-2" />
        //         Land-owning agencies: 5 business days to respond to requests
        //       </p>
        //     ),
        //   },
        // ]}
        cumulativeTime="18 weeks"
        date={calculateDate(18)}
      />
      {renderFinalSteps(0)}
    </div>
  );

  const renderFinalSteps = (previousWeeks: number) => (
    <>
      <TimelineItem
        title="Start Applying to S-tier Opportunities"
        description="These could be top of the line industry opportunities, research positions, or partner companies."
        icon={Lightbulb}
        content={
          <>
            <p className="mb-2">
              <Clock className="inline mr-2" />
              Keep working on Leetcode and DSA, preferrably company specific
              problems.
            </p>
            <p className="mb-2">
              <FileSearch className="inline mr-2" />
              Have your Resume, CV and your story in order.
            </p>
            <p className="mb-2">
              <Clock className="inline mr-2" />
              Mock Interviews with members from the community
            </p>
            <p>
              <AlertCircle className="inline mr-2" />
              Brush up on general knoweldge. Everything on your Resume is fair
              game!
            </p>
            <p className="mt-4 text-sm text-muted-foreground"></p>
          </>
        }
        cumulativeTime={`${previousWeeks + 4} weeks`}
        date={calculateDate(previousWeeks + 4)}
      />
      <TimelineItem
        title="Prepare to Slow down work @Dijkstra"
        description="You've done it! You've achieved a top tier job, hopefully one that's well compensated. All the Hardwork has paid off! Around here you are moved away from development within Dijkstra to focus on your new chapter."
        icon={Hourglass}
        content={<p>Final decision on property acquisition</p>}
        cumulativeTime={`${previousWeeks + 4} weeks`}
        date={calculateDate(previousWeeks + 4)}
      />
      <TimelineItem
        title="Mentoring + Management @Dijkstra"
        description="You have the option to continue to work at Dijkstra as a Mentor or as a Technical Lead in Dijkstra's various projects. This could be experience that you can use to leverage better opportunities in your own career. The other option would be to step down into a community member role, a Passive, but lifelong member of the Dijkstra community :)"
        icon={CheckCircle}
        isLast={true}
        content={<p>Final decision on property acquisition</p>}
        cumulativeTime={`♾ weeks`}
        date={calculateDate(previousWeeks + 54)}
      />
    </>
  );

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* Header */}
      <header
        ref={headerRef}
        onMouseLeave={() => setActiveMegaMenu(null)}
        className={cn(
          "fixed top-0 left-0 right-0 z-50",
          "transition-all duration-500 ease-out",
          // scrolled
          //   ? activeMegaMenu
          //     ? "bg-black/80 backdrop-blur-2xl border-b border-white/10"
          //     : "bg-black/95 backdrop-blur-md border-b border-gray-800/50"
          //   : "bg-black/80 backdrop-blur-xl border-b border-white/10",
          scrolled
            ? activeMegaMenu
              ? "bg-black/80 backdrop-blur-2xl border-b border-white/10"
              : "bg-black/95 backdrop-blur-md border-b border-gray-800/50"
            : "bg-black/80 backdrop-blur-xl border-b border-white/10",
        )}
        style={{
          paddingTop: activeMegaMenu ? "1.5rem" : scrolled ? "1rem" : "1.5rem",
          paddingBottom: activeMegaMenu ? "2rem" : scrolled ? "1rem" : "1.5rem",
        }}
      >
        <div className="container mx-auto px-4">
          {/* Top Navigation Bar */}
          <div className="flex justify-between items-center">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-2"
            >
              <a href="#" className="flex items-center gap-2">
                <img src="/icon.png" alt="Logo" className="h-12 w-auto" />
                <span className="font-bold text-xl">Dijkstra</span>
              </a>

            </motion.div>

            <nav className="hidden md:flex items-center gap-8">
              {/* Features Mega Menu */}
              <div className="relative" onMouseEnter={() => setActiveMegaMenu("features")}>
                <button className="flex items-center gap-1 text-gray-300 hover:text-white transition-colors duration-300 text-sm font-medium py-2">
                  Features
                  <ChevronDown
                    className={cn(
                      "h-3 w-3 transition-transform duration-300",
                      activeMegaMenu === "features" && "rotate-180",
                    )}
                  />
                </button>
              </div>

              {/* Products Mega Menu */}
              <div className="relative" onMouseEnter={() => setActiveMegaMenu("products")}>
                <button className="flex items-center gap-1 text-gray-300 hover:text-white transition-colors duration-300 text-sm font-medium py-2">
                  Products
                  <ChevronDown
                    className={cn(
                      "h-3 w-3 transition-transform duration-300",
                      activeMegaMenu === "products" && "rotate-180",
                    )}
                  />
                </button>
              </div>

              {/* About Mega Menu */}
              <div className="relative" onMouseEnter={() => setActiveMegaMenu("about")}>
                <button className="flex items-center gap-1 text-gray-300 hover:text-white transition-colors duration-300 text-sm font-medium py-2">
                  About
                  <ChevronDown
                    className={cn(
                      "h-3 w-3 transition-transform duration-300",
                      activeMegaMenu === "about" && "rotate-180",
                    )}
                  />
                </button>
              </div>

              {/* Pricing - Simple Link */}
              <Link
                href="#pricing"
                className="text-gray-300 hover:text-white transition-colors duration-300 text-sm font-medium"
              >
                Pricing
              </Link>

              {/* Testimonials - Simple Link */}
              <Link
                href="#testimonials"
                className="text-gray-300 hover:text-white transition-colors duration-300 text-sm font-medium"
              >
                Testimonials
              </Link>
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
                onClick={() =>
                  window.open("https://github.com/Dijkstra-Edu", "_blank")
                }
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
                onClick={() => router.push("/onboarding")}
              >
                Get Started
              </Button>
            </div>
              <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </motion.div>
          </div>

          {/* Expanded Mega Menu Content */}
          <AnimatePresence>
            {activeMegaMenu && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                <div className="pt-8 pb-4">
                  {/* Features Content */}
                  {activeMegaMenu === "features" && (
                    <motion.div
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                      className="grid grid-cols-12 gap-8"
                    >
                      {/* Column 1 - Main Info */}
                      <div className="col-span-3 border-r border-gray-800/30 pr-8">
                        <h3 className="text-2xl font-bold mb-2">Features</h3>
                        <p className="text-gray-400 text-sm mb-6">Powerful tools to enhance your workflow</p>
                        <a
                          href="#features"
                          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-[#048304] text-[#048304] hover:bg-[#048304]/10 transition-colors text-sm font-medium"
                        >
                          All Features
                          <ArrowRight className="h-4 w-4" />
                        </a>
                      </div>

                      {/* Column 2 - Main Features */}
                      <div className="col-span-6">
                        <div className="grid grid-cols-2 gap-6">
                          <div>
                            <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">
                              Core Features
                            </h4>
                            <div className="space-y-3">
                              <a
                                href="#features"
                                className="group/item flex items-start gap-3 p-2 rounded-lg hover:bg-white/5 transition-colors"
                              >
                                <div className="p-2 bg-purple-500/10 rounded-lg group-hover/item:bg-purple-500/20 transition-colors">
                                  <Code className="h-4 w-4 text-purple-400" />
                                </div>
                                <div>
                                  <div className="font-medium text-sm group-hover/item:text-purple-400 transition-colors">
                                    Advanced API
                                  </div>
                                  <div className="text-xs text-gray-400">Robust developer tools</div>
                                </div>
                              </a>

                              <a
                                href="#features"
                                className="group/item flex items-start gap-3 p-2 rounded-lg hover:bg-white/5 transition-colors"
                              >
                                <div className="p-2 bg-blue-500/10 rounded-lg group-hover/item:bg-blue-500/20 transition-colors">
                                  <Globe className="h-4 w-4 text-blue-400" />
                                </div>
                                <div>
                                  <div className="font-medium text-sm group-hover/item:text-blue-400 transition-colors">
                                    Global CDN
                                  </div>
                                  <div className="text-xs text-gray-400">Lightning-fast delivery</div>
                                </div>
                              </a>

                              <a
                                href="#features"
                                className="group/item flex items-start gap-3 p-2 rounded-lg hover:bg-white/5 transition-colors"
                              >
                                <div className="p-2 bg-green-500/10 rounded-lg group-hover/item:bg-green-500/20 transition-colors">
                                  <CheckCircle className="h-4 w-4 text-green-400" />
                                </div>
                                <div>
                                  <div className="font-medium text-sm group-hover/item:text-green-400 transition-colors">
                                    Enterprise Security
                                  </div>
                                  <div className="text-xs text-gray-400">Bank-grade protection</div>
                                </div>
                              </a>
                            </div>
                          </div>

                          <div>
                            <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">
                              Advanced
                            </h4>
                            <div className="space-y-3">
                              <a
                                href="#features"
                                className="group/item flex items-start gap-3 p-2 rounded-lg hover:bg-white/5 transition-colors"
                              >
                                <div className="p-2 bg-red-500/10 rounded-lg group-hover/item:bg-red-500/20 transition-colors">
                                  <Cpu className="h-4 w-4 text-red-400" />
                                </div>
                                <div>
                                  <div className="font-medium text-sm group-hover/item:text-red-400 transition-colors">
                                    AI-Powered
                                  </div>
                                  <div className="text-xs text-gray-400">Smart automation</div>
                                </div>
                              </a>

                              <a
                                href="#features"
                                className="group/item flex items-start gap-3 p-2 rounded-lg hover:bg-white/5 transition-colors"
                              >
                                <div className="p-2 bg-yellow-500/10 rounded-lg group-hover/item:bg-yellow-500/20 transition-colors">
                                  <MessageSquare className="h-4 w-4 text-yellow-400" />
                                </div>
                                <div>
                                  <div className="font-medium text-sm group-hover/item:text-yellow-400 transition-colors">
                                    24/7 Support
                                  </div>
                                  <div className="text-xs text-gray-400">Always available</div>
                                </div>
                              </a>

                              <a
                                href="#features"
                                className="group/item flex items-start gap-3 p-2 rounded-lg hover:bg-white/5 transition-colors"
                              >
                                <div className="p-2 bg-gray-500/10 rounded-lg group-hover/item:bg-gray-500/20 transition-colors">
                                  <Github className="h-4 w-4 text-gray-400" />
                                </div>
                                <div>
                                  <div className="font-medium text-sm group-hover/item:text-gray-300 transition-colors">
                                    Open Source
                                  </div>
                                  <div className="text-xs text-gray-400">Community-driven</div>
                                </div>
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Column 3 - Resources */}
                      <div className="col-span-3 border-l border-gray-800/30 pl-8">
                        <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">Resources</h4>
                        <div className="space-y-2">
                          <a
                            href="https://docs.dijkstra.org.in/"
                            className="block px-3 py-2 text-sm hover:text-[#048304] transition-colors rounded-lg hover:bg-white/5"
                          >
                            Documentation
                          </a>
                          <a
                            href="#"
                            className="block px-3 py-2 text-sm hover:text-[#048304] transition-colors rounded-lg hover:bg-white/5"
                          >
                            API Reference
                          </a>
                          <a
                            href="#"
                            className="block px-3 py-2 text-sm hover:text-[#048304] transition-colors rounded-lg hover:bg-white/5"
                          >
                            Changelog
                          </a>
                          <a
                            href="https://discord.gg/Ct82yF3KAU"
                            className="block px-3 py-2 text-sm hover:text-[#048304] transition-colors rounded-lg hover:bg-white/5"
                          >
                            Community
                          </a>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* Products Content */}
                  {activeMegaMenu === "products" && (
                    <motion.div
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                      className="grid grid-cols-12 gap-8"
                    >
                      {/* Column 1 - Main Info */}
                      <div className="col-span-3 border-r border-gray-800/30 pr-8">
                        <h3 className="text-2xl font-bold mb-2">Products</h3>
                        <p className="text-gray-400 text-sm mb-6">Enterprise solutions for modern teams</p>
                        <a
                          href="#products"
                          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-[#048304] text-[#048304] hover:bg-[#048304]/10 transition-colors text-sm font-medium"
                        >
                          All Products
                          <ArrowRight className="h-4 w-4" />
                        </a>
                      </div>

                      {/* Column 2 - Products List */}
                      <div className="col-span-6">
                        <div className="space-y-6">
                          <div>
                            <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">
                              Infrastructure
                            </h4>
                            <div className="space-y-3">
                              <a
                                href="#products"
                                className="group/item flex items-start gap-4 p-3 rounded-lg hover:bg-white/5 transition-colors"
                              >
                                <div className="p-3 bg-green-500/10 rounded-xl group-hover/item:bg-green-500/20 transition-colors">
                                  <Brain className="h-5 w-5 text-green-400" />
                                </div>
                                <div className="flex-1">
                                  <div className="font-semibold mb-1 group-hover/item:text-green-400 transition-colors">
                                    Dijkstra GPT
                                  </div>
                                  <div className="text-sm text-gray-400">
                                    A smart GPT catered towards students aiming to break into tech
                                  </div>
                                </div>
                              </a>
                            </div>
                          </div>

                          <div>
                            <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">
                              Analytics & Security
                            </h4>
                            <div className="space-y-3">
                              <a
                                href="#products"
                                className="group/item flex items-start gap-4 p-3 rounded-lg hover:bg-white/5 transition-colors"
                              >
                                <div className="p-3 bg-red-500/10 rounded-xl group-hover/item:bg-red-500/20 transition-colors">
                                  <Book className="h-5 w-5 text-red-400" />
                                </div>
                                <div className="flex-1">
                                  <div className="font-semibold mb-1 group-hover/item:text-red-400 transition-colors">
                                    Resume Builder
                                  </div>
                                  <div className="text-sm text-gray-400">
                                    Data-driven insights and real-time dashboards
                                  </div>
                                </div>
                              </a>

                              <a
                                href="#products"
                                className="group/item flex items-start gap-4 p-3 rounded-lg hover:bg-white/5 transition-colors"
                              >
                                <div className="p-3 bg-yellow-500/10 rounded-xl group-hover/item:bg-yellow-500/20 transition-colors">
                                  <Trophy className="h-5 w-5 text-yellow-400" />
                                </div>
                                <div className="flex-1">
                                  <div className="font-semibold mb-1 group-hover/item:text-yellow-400 transition-colors">
                                    Ranking Algorithm
                                  </div>
                                  <div className="text-sm text-gray-400">
                                    Advanced protection for your digital assets
                                  </div>
                                </div>
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Column 3 - Explore Further */}
                      <div className="col-span-3 border-l border-gray-800/30 pl-8">
                        <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">
                          Explore Further
                        </h4>
                        <div className="space-y-2">
                          <a
                            href="#pricing"
                            className="block px-3 py-2 text-sm hover:text-[#048304] transition-colors rounded-lg hover:bg-white/5"
                          >
                            Plans & Pricing
                          </a>
                          <a
                            href="#"
                            className="block px-3 py-2 text-sm hover:text-[#048304] transition-colors rounded-lg hover:bg-white/5"
                          >
                            Product Roadmap
                          </a>
                          <a
                            href="#"
                            className="block px-3 py-2 text-sm hover:text-[#048304] transition-colors rounded-lg hover:bg-white/5"
                          >
                            Integrations
                          </a>
                          <a
                            href="#"
                            className="block px-3 py-2 text-sm hover:text-[#048304] transition-colors rounded-lg hover:bg-white/5"
                          >
                            Comparisons
                          </a>
                          <a
                            href="#"
                            className="block px-3 py-2 text-sm hover:text-[#048304] transition-colors rounded-lg hover:bg-white/5"
                          >
                            Case Studies
                          </a>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* About Content */}
                  {activeMegaMenu === "about" && (
                    <motion.div
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                      className="grid grid-cols-12 gap-8"
                    >
                      {/* Column 1 - Main Info */}
                      <div className="col-span-3 border-r border-gray-800/30 pr-8">
                        <h3 className="text-2xl font-bold mb-2">About</h3>
                        <p className="text-gray-400 text-sm mb-6">Learn more about our mission and team</p>
                        <a
                          href="#about"
                          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-[#048304] text-[#048304] hover:bg-[#048304]/10 transition-colors text-sm font-medium"
                        >
                          About Us
                          <ArrowRight className="h-4 w-4" />
                        </a>
                      </div>

                      {/* Column 2 - Links */}
                      <div className="col-span-5">
                        <div className="space-y-3">
                          <a href="#about" className="block p-3 rounded-lg hover:bg-white/5 transition-colors">
                            <div className="font-medium mb-1 hover:text-[#048304] transition-colors">Our Mission</div>
                            <div className="text-sm text-gray-400">Democratizing technology for everyone</div>
                          </a>

                          <a href="#about" className="block p-3 rounded-lg hover:bg-white/5 transition-colors">
                            <div className="font-medium mb-1 hover:text-[#048304] transition-colors">Team</div>
                            <div className="text-sm text-gray-400">Meet the people behind TechNova</div>
                          </a>

                          <a href="#" className="block p-3 rounded-lg hover:bg-white/5 transition-colors">
                            <div className="font-medium mb-1 hover:text-[#048304] transition-colors">Careers</div>
                            <div className="text-sm text-gray-400">Join our growing team</div>
                          </a>

                          <a href="#contact" className="block p-3 rounded-lg hover:bg-white/5 transition-colors">
                            <div className="font-medium mb-1 hover:text-[#048304] transition-colors">Contact Us</div>
                            <div className="text-sm text-gray-400">Get in touch with our team</div>
                          </a>
                        </div>
                      </div>

                      {/* Column 3 - Featured Article */}
                      <div className="col-span-4 border-l border-gray-800/30 pl-8">
                        <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">
                          Featured Article
                        </h4>
                        <a href="#" className="block group/article">
                          <div className="aspect-video bg-gradient-to-br from-red-500/20 to-blue-500/20 rounded-lg mb-3 overflow-hidden">
                            <img
                              src="/blog.png"
                              alt="Featured article"
                              className="w-full h-full object-cover opacity-80 group-hover/article:opacity-100 transition-opacity"
                            />
                          </div>
                          <h5 className="font-semibold mb-2 group-hover/article:text-red-600 transition-colors">
                            Dijkstra Blog is Live!
                          </h5>
                          <p className="text-sm text-gray-400 mb-3">
                            Discover how students are sharing what they've learnt through Dijkstra blog...
                          </p>
                          <span className="text-sm text-red-600 font-medium inline-flex items-center gap-1">
                            Read more
                            <ArrowRight className="h-3 w-3" />
                          </span>
                        </a>
                      </div>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
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
          <div className="absolute inset-0 bg-gradient-to-b from-black to-[#048304]/20" />
          <div className="absolute top-0 left-0 right-0 h-[500px] bg-gradient-to-b from-black via-[#048304]/10 to-transparent" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(5, 177, 5,0.1),transparent_65%)]" />
          {/* Sparkling Stars 
          <div className="absolute inset-0 overflow-hidden">
            {Array.from({ length: 50 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-white rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  opacity: [0, 1, 0],
                  scale: [0, 1, 0],
                }}
                transition={{
                  duration: Math.random() * 6 + 2,
                  repeat: Number.POSITIVE_INFINITY,
                  delay: Math.random() * 5,
                }}
              />
            ))}
          </div>*/}
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
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Button
                onClick={() => router.push("/onboarding")}
                className="group bg-green-700 hover:bg-green-800 cursor-pointer text-white px-8 py-6 rounded-xl text-base font-semibold transition-colors duration-300"
              >
                <span className="flex items-center gap-2">
                  Get Started Now
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </Button>

              <Button
                variant="ghost"
                onClick={() => router.push("/dashboard")}
                className="group px-8 py-6 rounded-xl text-base font-medium cursor-pointer text-gray-400 hover:text-white hover:bg-white/5 transition-all duration-300"
              >
                <span className="flex items-center gap-2">
                  Go to Dashboard
                  <svg
                    className="h-5 w-5 group-hover:translate-x-1 transition-transform"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </span>
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
      <section className="relative h-[40vh] flex items-center justify-center overflow-hidden bg-white">
        {/* Background Segments */}
        <div className="absolute inset-0 z-0">
          {segments.map((seg, i) => (
            <div
              key={i}
              className="absolute h-[2px] bg-gray-500/70 rounded-full"
              style={{
                top: `${seg.top}%`,
                left: `${seg.left}%`,
                width: `${seg.width}%`,
              }}
            />
          ))}
        </div>

        {/* Banner Text */}
        <div className="relative z-10 text-center px-6">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-black mb-3 tracking-tight">
            For Students, By Students
          </h1>
          <p className="text-green-600 text-lg sm:text-xl md:text-2xl font-semibold tracking-wide">
            Dijkstra
          </p>
        </div>
      </section>

      {/* What is Dijkstra */}
<section
  id="features"
  className="py-24 relative overflow-hidden bg-gradient-to-b from-white to-gray-50"
>
  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(34,197,94,0.08),transparent_60%)]" />

  <div className="container mx-auto px-6 relative z-10">
    <div className="text-center mb-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-4xl md:text-5xl font-extrabold mb-6 text-gray-900">
          So what's Dijkstra?
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
          Dijkstra is a one-stop, open-source platform for aspiring Software Engineers 
          to prepare and crack jobs in today’s competitive landscape.  
          <br /> <br />
          At its core, Dijkstra works on the following principles:
        </p>
      </motion.div>
    </div>

    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
      {[
        {
          icon: <Eye className="h-6 w-6 text-purple-500" />,
          title: "Visibility",
          description:
            "Track your progress across platforms like GitHub, LinkedIn, Leetcode, Codeforces, and more. See yourself level up through validated Proof of Work."
        },
        {
          icon: <BrainCircuit className="h-6 w-6 text-blue-500" />,
          title: "Develop Skills",
          description:
            "Sharpen your DSA, Software Engineering, and Systems Design with tasks like code pushes, articles, mentoring, and leading projects."
        },
        {
          icon: <CheckCircle className="h-6 w-6 text-green-500" />,
          title: "Proof of Work",
          description:
            "Your growth is visible across multiple platforms. Dijkstra helps gamify this journey, guiding you to plan and execute effectively."
        },
        {
          icon: <Target className="h-6 w-6 text-red-500" />,
          title: "Efficiency",
          description:
            "A project can double up as a research paper or portfolio piece. Dijkstra helps you align efforts to maximize output."
        },
        {
          icon: <Users className="h-6 w-6 text-yellow-500" />,
          title: "Community",
          description:
            "Give back by writing, coding, mentoring, and contributing. Build credibility and grow with the global tech community."
        },
        {
          icon: <Workflow className="h-6 w-6 text-gray-500" />,
          title: "Growth Mindset",
          description:
            "Everything leads to something bigger — internships, articles, or research. Dijkstra helps connect the dots for your career."
        },
      ].map((feature, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          <div className="h-full bg-white p-8 rounded-2xl shadow-sm border border-gray-200 hover:shadow-xl hover:scale-[1.02] transition-all duration-300">
            <div className="mb-6 flex items-center justify-center w-14 h-14 rounded-xl bg-gray-100">
              {feature.icon}
            </div>
            <h3 className="text-xl font-semibold mb-3 text-gray-900">
              {feature.title}
            </h3>
            <p className="text-gray-600 leading-relaxed">
              {feature.description}
            </p>
          </div>
        </motion.div>
      ))}
    </div>
  </div>
</section>


      {/* How Does this work? */}
      {/* 
      - One stop spot to track your progress across all platforms - Preparation has become quite crazy, this is a one stop solution for it all.
      - Complete Tasks, improve your profile, and see yourself level up in terms of skills for jobs
      - Based on tasks completed, you will be able to better guage the potential for you landing a job, an internship or a project.
      - If you don't have any experience, that's alright! Go through the Crash course on how to learn and compelte projects, and then start contributing to Dijkstra's codebase! (We'll give you a certificate for the same! Leverage your experience contributing to open source here for other opportunities!)
      - Give back to the community by writing articles, pushing code, thereby improving your credibility to the tech world.
      */}
      <section
        id="features"
        className="py-12 bg-white relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(5, 177, 5,0.1),transparent_50%)]" />

        <div className="container-max mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl md:text-5xl font-bold mb-4 text-black">
                So how does this work?
              </h2>
              <p className="text-gray-700 max-w-2xl mx-auto">
                Dijkstra helps you track progress and prepare towards CS roles.
                This is mainly aimed towards aspiring Software Engineers still
                in University. It can still be used by anyone who would like to
                break into tech!
              </p>
            </motion.div>
          </div>

          <div className="flex justify-center mb-6">
            <div>
              <label
                htmlFor="start-date"
                className="block text-sm font-medium text-gray-700 mb-2 text-center"
              >
                On starting Today:
              </label>
              <Input
                type="date"
                id="start-date"
                value={startDate ? startDate.toISOString().split("T")[0] : ""}
                onChange={(e) => setStartDate(new Date(e.target.value))}
                className="w-full max-w-xs text-gray-700"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 px-[300px] gap-8">
            {renderAbsoluteBeginners()}
            {renderUniversityandExperienced()}
          </div>

          <div className="mt-16">
            <h3 className="text-center text-gray-600 text-sm uppercase mb-6 tracking-wider">
              Our Members have gone on to work in the following companies:
            </h3>
            <div className="flex justify-center items-center gap-10 flex-wrap">
              {[
                "/logos/CERN.png",
                "/logos/microsoft.png",
                "/logos/apple.png",
                "/logos/hsbc.png",
                "/logos/hyperface.png",
                "/logos/balkan.jpeg",
                "/logos/HP.png",
                "/logos/phillips.png",
                "/logos/pwc.png",
                "/logos/signify.png",
                "/logos/tcs.png",
              ].map((src, idx) => (
                <img
                  key={idx}
                  src={src}
                  alt={`Company logo ${idx + 1}`}
                  className="h-18 w-auto filter grayscale hover:grayscale-0 transition duration-300 ease-in-out"
                />
              ))}
            </div>
          </div>
        </div>
      </section>

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
      {/* Features Section */}
      {/* <section id="features" className="py-24 relative overflow-hidden bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950"> */}
      <section id="features" className="py-24 relative overflow-hidden">  

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(34,197,94,0.12),transparent_60%)]" />

        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl md:text-5xl font-extrabold mb-6 text-white">
                Features
              </h2>
              <p className="text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed">
                Our platform provides a suite of powerful tools designed to enhance productivity 
                and streamline your workflow.
              </p>
            </motion.div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {[
              {
                icon: <Brain className="h-6 w-6 text-purple-500" />,
                title: "Dijkstra GPT",
                description:
                  "Integrate seamlessly with our API — developer-friendly with full documentation and examples."
              },
              {
                icon: <Trophy className="h-6 w-6 text-blue-500" />,
                title: "Ranking & Tracking",
                description:
                  "Track performance globally with lightning-fast metrics and uptime reliability."
              },
              {
                icon: <BookOpen className="h-6 w-6 text-green-500" />,
                title: "Learning Center",
                description:
                  "Expand knowledge through structured resources backed by enterprise-grade security."
              },
              {
                icon: <FolderKanban className="h-6 w-6 text-red-500" />,
                title: "Projects Hub",
                description:
                  "Collaborate on open-source projects and leverage AI-powered insights for growth."
              },
              {
                icon: <Handshake className="h-6 w-6 text-yellow-500" />,
                title: "Mentorship",
                description:
                  "Connect with experienced mentors and build credibility through guided learning."
              },
              {
                icon: <Github className="h-6 w-6 text-gray-300" />,
                title: "Open Source",
                description:
                  "Join our growing open-source ecosystem and contribute to community-driven tools."
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="h-full bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 hover:shadow-2xl hover:shadow-green-500/10 hover:scale-[1.02] transition-all duration-300">
                  <div className="mb-6 flex items-center justify-center w-14 h-14 rounded-xl bg-white/10">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-white">
                    {feature.title}
                  </h3>
                  <p className="text-gray-400 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>


      {/* Pricing Section */}
      <section id="pricing" className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(4,131,4,0.15),transparent_50%)]" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl md:text-5xl font-bold mb-4">Simple, Transparent Pricing</h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                Choose the perfect plan for your needs. All plans include our core features with no hidden fees.
              </p>
            </motion.div>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Starter Plan */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="h-full bg-gradient-to-b from-gray-900 to-gray-950 p-[1px] rounded-xl">
                <div className="h-full bg-gradient-to-b from-gray-900 to-gray-950 p-8 rounded-xl border border-gray-800/50 hover:border-green-500/30 transition-all duration-300">
                  <div className="mb-6">
                    <h3 className="text-2xl font-bold mb-2">Free</h3>
                    <p className="text-gray-400 text-sm">Perfect for small projects and testing</p>
                  </div>

                  <div className="mb-8">
                    <div className="flex items-baseline gap-2">
                      <span className="text-5xl font-bold">₹0</span>
                      <span className="text-gray-400">/month</span>
                    </div>
                  </div>

                  <Button className="w-full mb-8 bg-gray-800 hover:bg-gray-700 text-white">Get Started</Button>

                  <div className="space-y-4">
                    <p className="text-sm font-semibold text-gray-300 mb-4">What's included:</p>
                    {[
                      "Dijkstra Predictive Ranking",
                      "Stats Aggregation",
                    ].map((feature, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-gray-300">{feature}</span>
                      </div>
                    ))}
                    {[
                      "Can upgrade to pro based on contributions",
                      "API access based on contributions",
                      "Limited and generic support",
                    ].map((feature, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <CircleAlert className="h-5 w-5 text-yellow-500 flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-gray-300">{feature}</span>
                      </div>
                    ))}
                    {[
                      "Need to setup personal DB",
                      "Need to setup Gemini Key",
                      "No AI Resume Optimization",                      
                    ].map((feature, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <XCircle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-gray-300">{feature}</span>
                      </div>
                    ))}                    
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Professional Plan (Popular) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="h-full relative">
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                  <span className="bg-gradient-to-r from-green-600 to-emerald-600 text-white text-xs font-semibold px-4 py-1 rounded-full">
                    MOST POPULAR
                  </span>
                </div>

                <div className="h-full bg-gradient-to-b from-green-900/20 to-gray-950 p-[1px] rounded-xl">
                  <div className="h-full bg-gradient-to-b from-gray-900 to-gray-950 p-8 rounded-xl border border-green-500/50 shadow-lg shadow-green-900/20">
                    <div className="mb-6">
                      <h3 className="text-2xl font-bold mb-2">Basic</h3>
                      <p className="text-gray-400 text-sm">For growing teams and businesses</p>
                    </div>

                    <div className="mb-8">
                      <div className="flex items-baseline gap-2">
                        <span className="text-5xl font-bold">₹999</span>
                        <span className="text-gray-400">/month</span>
                      </div>
                    </div>

                    <Button className="w-full mb-8 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700">
                      Get Started
                    </Button>

                    <div className="space-y-4">
                      <p className="text-sm font-semibold text-gray-300 mb-4">Everything in Free, plus:</p>
                      {[
                        "Has Access to DIjkstra GPT (Limited Credits)",
                        "DIjkstra maintains DB (option to maintain it yourself)",
                        "Resume optimization",
                        "Daily tasks",
                        "Study notes for interviews - Per company",
                        "Resume AI optimization",
                        "Advanced analytics",
                        "Personalized study plan support",
                      ].map((feature, i) => (
                        <div key={i} className="flex items-start gap-3">
                          <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                          <span className="text-sm text-gray-300">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Enterprise Plan */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="h-full bg-gradient-to-b from-gray-900 to-gray-950 p-[1px] rounded-xl">
                <div className="h-full bg-gradient-to-b from-gray-900 to-gray-950 p-8 rounded-xl border border-gray-800/50 hover:border-green-500/30 transition-all duration-300">
                  <div className="mb-6">
                    <h3 className="text-2xl font-bold mb-2">Pro</h3>
                    <p className="text-gray-400 text-sm">For Universities and Large Organizations</p>
                  </div>

                  <div className="mb-8">
                    <div className="flex items-baseline gap-2">
                      <span className="text-5xl font-bold">₹2999</span>
                    </div>
                    <p className="text-gray-400 text-sm mt-2">Tailored to your needs</p>
                  </div>

                  <Button className="w-full mb-8 bg-gray-800 hover:bg-gray-700 text-white">Contact Sales</Button>

                  <div className="space-y-4">
                    <p className="text-sm font-semibold text-gray-300 mb-4">Everything in Basic, plus:</p>
                    {[
                      "Dijkstra gpt (unlimited, dgpt3): Completely context aware of students profile",
                      "Dijkstra maintains DB",
                      "Dijkstra Learning Hub",
                      "AI Resume optimization",
                      "Entry into Dijkstra's Company pool",
                      "Personalized plan + daily tasks + reminders: personalized reminders, personalized goal setting",
                      "Study notes for interviews + interview tips and tricks",
                      "On-premise deployment",
                    ].map((feature, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-gray-300">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* FAQ or Additional Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-16 text-center"
          >
            <p className="text-gray-400 mb-4">All plans include a 14-day free trial. No credit card required.</p>
            <div className="flex flex-wrap justify-center gap-8 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span>Cancel anytime</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span>No setup fees</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span>Secure payments</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Open Source, GitHub based, Community facing work */}

      {/* Our Members have gone on to work in the following companies */}

      {/* Testimonials */}

      {/* Ready to Get Started? Onboarding */}

      {/* Contact Us */}

      {/* About Us */}

      {/* Products Section */}
      <section id="products" className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(5, 177, 5,0.1),transparent_50%)]" />

        <div className="container-max mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl md:text-5xl font-bold mb-4">
                The DIjkstra Platform Suite
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
                <h3 className="text-3xl font-bold">Dijkstra GPT</h3>
                <p className="text-gray-300 text-lg">
                  Our in-house AI Model, trained on data pertaining to Software
                  Engineering prep. Consider it that senior in UNiversity who
                  could advise you on a thing or two XD
                </p>
                <ul className="space-y-3">
                  {[
                    "Auto-scaling",
                    "Global distribution",
                    "Pay-as-you-go pricing",
                    "99.9% uptime SLA",
                  ].map((feature, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  variant="outline"
                  className="group border-2 border-gray-700 hover:border-green-500 bg-gray-900/50 hover:bg-gray-800/50 text-white transition-all duration-300"
                >
                  <span className="flex items-center gap-2">
                    Learn More
                    <ArrowRight className="h-4 w-4 text-gray-400 group-hover:text-green-500 group-hover:translate-x-1 transition-all" />
                  </span>
                </Button>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <div className="bg-gradient-to-br from-green-500/20 to-gray-500/20 p-1 rounded-lg">
                  <div className="relative h-[300px] md:h-auto w-full rounded-lg overflow-hidden">
                    {/* <CloudPlatform /> */}
                    <Image
                      src="/dijkstra-gpt.png"
                      alt="Hero Image"
                      width={1200}
                      height={1200}
                      className="max-w-full h-auto rounded-lg shadow-lg"
                    />
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
                  Dijkstra Analytics & Tracking
                </h3>
                <p className="text-gray-300 text-base md:text-lg">
                  Gain valuable insights across all your platforms, be it
                  Leetcode, GitHub to research, all in one place.
                </p>
                <ul className="space-y-2 md:space-y-3">
                  {[
                    "Real-time dashboards",
                    "Custom reports",
                    "AI-powered predictions",
                    "Data visualization",
                  ].map((feature, i) => (
                    <li key={i} className="flex items-center gap-2 md:gap-3">
                      <CheckCircle className="h-4 w-4 md:h-5 md:w-5 text-green-500 flex-shrink-0" />
                      <span className="text-sm md:text-base">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  variant="outline"
                  className="group border-2 border-gray-700 hover:border-green-500 bg-gray-900/50 hover:bg-gray-800/50 text-white transition-all duration-300"
                >
                  <span className="flex items-center gap-2">
                    Learn More
                    <ArrowRight className="h-4 w-4 text-gray-400 group-hover:text-green-500 group-hover:translate-x-1 transition-all" />
                  </span>
                </Button>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="order-2 md:order-first"
              >
                <div className="bg-gradient-to-br from-green-500/20 to-gray-500/20 p-1 rounded-lg">
                  <div className="relative h-[300px] md:h-auto w-full rounded-lg overflow-hidden">
                    {/* <AnalyticsPlatform /> */}
                    <Image
                      src="/dashboard.png"
                      alt="Hero Image"
                      width={1200}
                      height={1200}
                      className="max-w-full h-auto rounded-lg shadow-lg"
                    />
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
                  Dijkstra Mobile
                </h3>
                <p className="text-gray-300 text-base md:text-lg">
                  Bring the tracking to your mobile too! With our Community
                  developed Mobile Applications.
                </p>
                <ul className="space-y-2 md:space-y-3">
                  {[
                    "Threat detection",
                    "Vulnerability scanning",
                    "Compliance monitoring",
                    "24/7 security operations",
                  ].map((feature, i) => (
                    <li key={i} className="flex items-center gap-2 md:gap-3">
                      <CheckCircle className="h-4 w-4 md:h-5 md:w-5 text-green-500 flex-shrink-0" />
                      <span className="text-sm md:text-base">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  variant="outline"
                  className="group border-2 border-gray-700 hover:border-green-500 bg-gray-900/50 hover:bg-gray-800/50 text-white transition-all duration-300"
                >
                  <span className="flex items-center gap-2">
                    Learn More
                    <ArrowRight className="h-4 w-4 text-gray-400 group-hover:text-green-500 group-hover:translate-x-1 transition-all" />
                  </span>
                </Button>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="order-2 md:order-2"
              >
                <div className="bg-gradient-to-br from-green-500/20 to-gray-500/20 p-1 rounded-lg">
                  <div className="relative h-[300px] md:h-[400px] w-full rounded-lg overflow-hidden">
                    {/* <SecurityPlatform /> */}
                    <div className="flex items-center justify-center h-full gap-4">
                      <Image
                        src="/mobile1.png"
                        alt="Hero Image 1"
                        width={150}
                        height={300}
                        className="rounded-lg shadow-lg object-contain"
                      />
                      <Image
                        src="/mobile2.jpeg"
                        alt="Hero Image 2"
                        width={150}
                        height={300}
                        className="rounded-lg shadow-lg object-contain"
                      />
                      <Image
                        src="/mobile3.jpeg"
                        alt="Hero Image 3"
                        width={150}
                        height={300}
                        className="rounded-lg shadow-lg object-contain"
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section
        id="testimonials"
        className="py-24 relative overflow-hidden px-[300px]"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(5, 177, 5,0.1),transparent_50%)]" />

        <div className="container-max mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl md:text-5xl font-bold mb-4">
                What Our Members Say
              </h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                What members of our community have to say:
              </p>
            </motion.div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "Neha Amin",
                role: "Dijkstra Student - Aspiring Software Engineer",
                image: "/neha.jpg",
                content:
                  "As someone who ran away at the first mention of an API call or development , to actually enjoying the process of building your ideas into a software solution.  Dijikstra has been that experience that helped me overcome my fears.",
              },
              {
                name: "Abdul Wahab",
                role: "Dijkstra Student - Aspiring Software Engineer",
                image: "/abdul.jpg",
                content:
                  "I always wanted to explore real backend development, and Dijkstra gave me that chance. Working under Jonathan's guidance helped me dive deep into core concepts. I not only learned the technical side but also how to approach problems logically. This experience has boosted my confidence to take on bigger backend challenges.",
              },
              {
                name: "Nishita Daryn",
                role: "Dijkstra Student - Aspiring Medical Engineer",
                image: "/nishita.jpg",
                content:
                  "As a non-CS major, I was initially intimidated by the idea of contributing to an open-source project. However, Dijkstra's supportive community and structured approach made it accessible and enjoyable. I've gained practical skills and confidence that I never thought possible.",
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

      {/* Current Members Section */}
      <section id="about" className="py-16 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(5, 177, 5,0.1),transparent_60%)]" />

        <div className="container-max mx-auto px-4 relative z-10">
          <div className="grid md:grid-cols-2 px-[300px] gap-8 md:gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="order-1 md:order-1"
            >
              <h2 className="text-2xl md:text-3xl lg:text-5xl font-bold mb-4 md:mb-6">
                Current Members
              </h2>
              <p className="text-gray-300 mb-4 md:mb-6 text-sm sm:text-base md:text-lg">
                Founded in 2023, Dijkstra was created with a singular vision: to
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
                  <span className="text-green-400 font-medium">50+</span> Team
                  Members
                </div>
                <div className="bg-gray-800/50 backdrop-blur-sm px-2 sm:px-3 md:px-4 py-1 sm:py-1.5 md:py-2 rounded-full text-xs sm:text-sm md:text-base">
                  <span className="text-green-400 font-medium">10k+</span>{" "}
                  Customers
                </div>
                <div className="bg-gray-800/50 backdrop-blur-sm px-2 sm:px-3 md:px-4 py-1 sm:py-1.5 md:py-2 rounded-full text-xs sm:text-sm md:text-base">
                  <span className="text-green-400 font-medium">99.9%</span>{" "}
                  Uptime
                </div>
              </div>
              <Button
                variant="outline"
                className="border-green-500 text-green-500 hover:bg-green-950 text-sm sm:text-base bg-transparent"
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
                <div className="absolute -inset-4 bg-gradient-to-r from-green-500/20 to-gray-500/20 rounded-lg blur-xl" />
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

      <section
        id="features"
        className="py-16 bg-white relative overflow-hidden h-[80vh]"
      >
        <div className="container mx-auto px-4 relative z-10">
          <div className="relative">
            <Masonry
              items={items}
              ease="power3.out"
              duration={0.6}
              stagger={0.05}
              animateFrom="bottom"
              scaleOnHover={true}
              hoverScale={0.95}
              blurToFocus={true}
              colorShiftOnHover={false}
            />
          </div>
        </div>
      </section>

      <section id="features" className=" bg-white relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl md:text-5xl font-bold mb-4 text-black">
                Our Mission
              </h2>
              <p className="text-gray-700 max-w-2xl mx-auto">
                IIt's 2025, and entry level roles have become nothing short of a
                bloodbath. Loads of students left without jobs, a natural
                saturation of the field, AI taking over roles... Quite a lot
                happening at once. We at Dijkstra firmly believe that it is
                possible to still land well compensated jobs in the field of
                tech, irrespective of everything happening in the world today.
                {/* button to redirect to Dijkstra's Mission as well as About Us */}
                <br />
                We want you to get back to your roots, and to systematically
                approach preapring for Software Engineering; ACTIVELY, not
                PASSIVELY.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section
        id="contact"
        className="relative overflow-hidden py-28 bg-gradient-to-b from-white via-gray-50 to-gray-100 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950"
      >
        {/* Background accents */}
        <div className="absolute inset-0">
          {/* <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(34,197,94,0.08),transparent_70%)]" /> */}
          {/* <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.06),transparent_70%)]" /> */}
        </div>

        <div className="container relative z-10 mx-auto px-6">
          <div className="grid lg:grid-cols-[1fr_auto_1fr] gap-20 items-start">

            {/* Left Column */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6 text-gray-900 dark:text-white">
                Ready to Get Started?
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 mb-12 leading-relaxed max-w-xl">
                Kickstart your journey with{" "}
                <span className="text-green-600 dark:text-green-400 font-semibold">Dijkstra</span>. 
                Whether you’re new or returning, choose your next step below.
              </p>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mb-16">
                {/* Primary CTA */}
                <Button
                  className="relative bg-gradient-to-r from-green-600 to-green-500 text-white font-semibold 
                            px-8 py-3 rounded-xl shadow-lg shadow-green-600/20 cursor-pointer
                            transition-all duration-300 hover:scale-[1.04] hover:shadow-green-500/30"
                  onClick={() => router.push("/onboarding")}
                >
                  Get Started
                </Button>

                {/* Secondary CTA */}
                <Button
                  className="bg-white text-gray-900 dark:bg-gray-900 dark:text-white 
                            border border-gray-200 dark:border-gray-800 
                            font-medium px-8 py-3 rounded-xl 
                            transition-colors duration-200 cursor-pointer
                            hover:bg-gray-100 dark:hover:bg-gray-800"
                  onClick={() => router.push("/dashboard")}
                >
                  Go to Dashboard
                </Button>
              </div>


              {/* Resource cards */}
              <div className="grid items-center gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {[
                  {
                    title: "Knowledgebase",
                    desc: "We're here to help with any questions or code.",
                    icon: BrainCircuit,
                    link: "#",
                    action: "Contact support",
                    color: "text-red-400 dark:text-green-400"
                  },
                  {
                    title: "FAQ",
                    desc: "Search our FAQ for answers to anything you might ask.",
                    icon: MessageSquare,
                    link: "#",
                    action: "Visit FAQ",
                    color: "text-yellow-400 dark:text-green-400"
                  },
                  {
                    title: "Developer APIs",
                    desc: "Check out our development quickstart guide.",
                    icon: Wrench,
                    link: "#",
                    action: "Explore APIs",
                    color: "text-green-600 dark:text-green-400"
                  },
                ].map((item, idx) => (
                  <Link
                    key={idx}
                    href={item.link}
                    className="group rounded-xl bg-white/70 dark:bg-gray-900/50 backdrop-blur-sm 
                              border border-gray-200/60 dark:border-gray-800/60 shadow-sm p-6 
                              hover:shadow-lg hover:-translate-y-1 transition-all text-center"
                  >
                    <item.icon className={item.color + " mx-auto h-10 w-10"} />
                    <div className="mt-5">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        {item.title}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">{item.desc}</p>
                      <p className="text-gray-600 dark:text-gray-400 mt-5 inline-flex items-center gap-x-1 font-medium">
                        {item.action}
                        <svg
                          className="h-4 w-4 transition-transform group-hover:translate-x-1"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m9 18 6-6-6-6" />
                        </svg>
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </motion.div>
            {/* Divider */}
            <div className="hidden lg:block w-px bg-gradient-to-b from-gray-200/70 via-gray-300/40 to-transparent dark:from-gray-700/60 dark:via-gray-700/40 dark:to-transparent mx-auto rounded-full" />

            {/* Right Column - Contact Form */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.15 }}
              className="relative"
            >
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-green-500/10 blur-3xl rounded-full pointer-events-none" />
              <ContactForm />
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
                  <IconBrandGithub className="h-5 w-5" />
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <IconBrandDiscord className="h-5 w-5" />
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <IconBrandLinkedin className="h-5 w-5" />
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
