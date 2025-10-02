"use client";

import { useState, useEffect, useMemo } from "react";
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



  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
        title="Property Offered to Landcom"
        description="Landcom considers the property"
        icon={Building}
        content={
          <p>
            <Clock className="inline mr-2" />
            Landcom: 2 weeks to confirm interest
          </p>
        }
        cumulativeTime="8 weeks"
        date={calculateDate(8)}
      />
      <TimelineItem
        title="Landcom Confirms Interest"
        description="Landcom decides to proceed"
        icon={CheckCircle}
        content={<p>Landcom confirms interest in acquiring the property</p>}
        cumulativeTime="10 weeks"
        date={calculateDate(10)}
      />
      <TimelineItem
        title="Landcom Due Diligence"
        description="Landcom conducts due diligence"
        icon={FileSearch}
        content={
          <p>
            <Clock className="inline mr-2" />2 months for due diligence
          </p>
        }
        subItems={[
          {
            title: "Information Requests",
            content: (
              <p>
                <Clock className="inline mr-2" />
                Land-owning agencies: 5 business days to respond to requests
              </p>
            ),
          },
        ]}
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
        className={`fixed top-0 px-[300px] left-0 right-0 z-50 transition-all duration-300 ${headerClass}`}
      >
        <div className="container mx-auto px-4 flex justify-between items-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
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
                onClick={() => {
                  router.push("/onboarding");
                }}
                className="bg-gradient-to-r from-white to-white hover:from-green-700 hover:to-gray-700 text-black px-4 sm:px-8 py-4 sm:py-6 rounded-full text-sm sm:text-lg font-medium shadow-lg shadow-purple-900/30 hover:shadow-purple-900/50 transition-all duration-300 cursor-pointer"
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
                So what's Dijkstra?
              </h2>
              <p className="text-gray-700 max-w-2xl mx-auto">
                Dijkstra is a one stop, open source, free for all platform for
                aspiring Software Engineers to prepare and crack jobs,
                especially in today's day and age.
                {/* button to redirect to Dijkstra's Mission as well as About Us */}
                <br />
                Dijkstra works on the following principles:
              </p>
            </motion.div>
          </div>

          <div className="grid md:grid-cols-2 px-[300px] lg:grid-cols-3 gap-8">
            {[
              {
                icon: <Eye className="h-10 w-10 text-purple-500" />,
                title: "Visibility",
                description:
                  "Track your progress across all platforms, be it GitHub, LinkedIn, Leetcode, Codeforces, etc; and see yourself level up in terms of skills (validated by Proof of Work) for jobs around the world.",
              },
              {
                icon: <BrainCircuit className="h-10 w-10 text-blue-500" />,
                title: "Develop Skills",
                description:
                  "Improve your DSA, Software Engineering, Systems Design hollistically through a variety of tasks within Dijkstra. Everything from simple code pushes, sharing new approaches, writing articles, to mentoring and leading projects. You're here to develop yourself into a Globally competitive Software Developer.",
              },
              {
                icon: <CheckCircle className="h-10 w-10 text-green-500" />,
                title: "Proof of Work",
                description:
                  "Dijkstra is a platform to keep track of your overall development, that comes down to proof of work on various spaces, be in Leetcode to GitHub, the onus is on YOU to develop yourself. We just help gamify the experience of gaining visiblity and understanding on how to plan your journey out.",
              },
              {
                icon: <Target className="h-10 w-10 text-red-500" />,
                title: "Killing two Birds with one stone",
                description:
                  "Turns out most things are inter-related! What's on your resume is technically on your LinkedIn. A project could double up as a Research Paper at a Conference. Dijkstra helps you plan things out to achieve more with what you do.",
              },
              {
                icon: <Users className="h-10 w-10 text-yellow-500" />,
                title: "Community",
                description:
                  "Give back to the community by writing articles, pushing code, thereby improving your credibility to the tech world.",
              },
              {
                icon: <Workflow className="h-10 w-10 text-gray-400" />,
                title: "One thing Leads to Another",
                description:
                  "Everything you do Leads to another. The skills you gain at an internship? It's leverage for your next job. The articles and papers you put out? That potentially increases your chances at a research lab. Whatever you do needs to lead to something bigger and better.",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="h-full bg-gradient-to-b from-white to-white p-6 rounded-xl border border-green-800/50 hover:border-green-500/50 transition-colors backdrop-blur-sm">
                  <div className="mb-4 p-3  rounded-lg inline-block">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-black">
                    {feature.title}
                  </h3>
                  <p className="text-gray-400">{feature.description}</p>
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

        <div className="container mx-auto px-4 relative z-10">
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
                "/logos/hsbc.png",
                "/logos/hyperface.png",
                "/logos/balkan.jpeg",
                "/logos/HP.png",
                "/logos/phillips.png",
                "/logos/pwc.png",
                "/logos/signify.png",
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
      <section id="features" className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(4,131,4,0.15),transparent_50%)]" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl md:text-5xl font-bold mb-4">Features</h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                Our platform offers a comprehensive suite of tools designed to
                enhance your productivity and streamline your workflow.
              </p>
            </motion.div>
          </div>

          <div className="grid md:grid-cols-2 px-[300px] lg:grid-cols-3 gap-8">
            {[
              {
                icon: <Brain className="h-10 w-10 text-purple-500" />,
                title: "Dijkstra GPT",
                description:
                  "Integrate seamlessly with our robust API designed for developers with comprehensive documentation and examples.",
              },
              {
                icon: <Trophy className="h-10 w-10 text-blue-500" />,
                title: "Ranking & Tracking",
                description:
                  "Lightning-fast content delivery across our worldwide network with 99.9% uptime guarantee.",
              },
              {
                icon: <BookOpen className="h-10 w-10 text-green-500" />,
                title: "Learning Center",
                description:
                  "Enterprise-grade security with end-to-end encryption and compliance with industry standards.",
              },
              {
                icon: <FolderKanban className="h-10 w-10 text-red-500" />,
                title: "Projects Hub",
                description:
                  "Leverage the power of artificial intelligence to optimize your workflow and gain valuable insights.",
              },
              {
                icon: <Handshake className="h-10 w-10 text-yellow-500" />,
                title: "Mentorship",
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
                  <div className="h-full bg-gradient-to-b from-gray-900 to-gray-950 p-6 rounded-xl border border-gray-800/50 hover:border-green-500/50 transition-colors backdrop-blur-sm">
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

      {/* Open Source, GitHub based, Community facing work */}

      {/* Our Members have gone on to work in the following companies */}

      {/* Testimonials */}

      {/* Ready to Get Started? Onboarding */}

      {/* Contact Us */}

      {/* About Us */}

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
                <Button className="bg-gradient-to-r from-green-600 to-gray-600 hover:from-gray-700 hover:to-green-700">
                  Learn More
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
                <Button className="bg-gradient-to-r from-green-600 to-gray-600 hover:from-green-700 hover:to-gray-700">
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
                <Button className="bg-gradient-to-r from-green-600 to-gray-600 hover:from-green-700 hover:to-gray-700">
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

        <div className="container mx-auto px-4 relative z-10">
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

      {/* Current Members Section */}
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
                className="border-green-500 text-green-500 hover:bg-green-600 text-sm sm:text-base cursor-pointer"
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
        className="py-16 bg-white relative overflow-hidden h-[100vh]"
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
              className="text-center mb-32"
            >
              <h2 className="text-3xl md:text-5xl font-bold mb-4 text-black">
                So, Ready to Get Started?
              </h2>
              <p className="text-gray-300 mb-8 text-lg">
                If you are a new user, please click the <b>Get Started</b>{" "}
                button below, and get ready to be onboarded!
              </p>

              <div className="">
                {/* <Button
                  className="bg-black hover:bg-neutral-900 border
                 dark:bg-black dark:hover:bg-neutral-900 dark:text-white border-[#048304] text-[#048304] hover:opacity-90 cursor-pointer
                 h-9 px-4 py-2"
                  onClick={() => router.push("/login")}
                >
                  Login
                </Button> */}
                <Button
                  className="bg-white hover:bg-gray-100 border
                 dark:bg-black dark:hover:bg-neutral-900 dark:text-white border-[#048304] text-[#048304] hover:opacity-90 cursor-pointer
                 h-9 px-10 py-8"
                  onClick={() => router.push("/onboarding")}
                >
                  Get Started!
                </Button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
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
