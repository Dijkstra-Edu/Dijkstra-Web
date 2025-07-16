"use client";

import { useEffect, useState, useRef } from "react";
import {
  BookOpen,
  Brain,
  Code,
  Trophy,
  Users,
  Target,
  Zap,
  TrendingUp,
  Clock,
  CheckCircle,
  PlayCircle,
  ArrowRight,
  Github,
  Calendar,
  Award,
  MessageCircle,
  Search,
  Bell,
  Settings,
  ChevronRight,
  Lightbulb,
  Database,
  GitBranch,
  Cpu,
  Globe,
  BarChart3,
  Activity,
  Moon,
  Sun,
  type LucideIcon,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { InstagramFeed } from "./instagram-feed";
import { useSession } from "next-auth/react";
import { ProfileData } from "./profile-data";

export default function Homepage() {
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isLoading, setIsLoading] = useState(true);
  const [studyStreak, setStudyStreak] = useState(12);
  const [problemsSolved, setProblemsSolved] = useState(247);
  const [currentRank, setCurrentRank] = useState(1847);
  const { data: session, status } = useSession();

  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Simulate data loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  // Update time
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Toggle theme
  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  // Animated background effect
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const particles: Particle[] = [];
    const particleCount = 80;

    class Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      color: string;

      constructor() {
        if (!canvas) {
          this.x = 0;
          this.y = 0;
        } else {
          this.x = Math.random() * canvas.width;
          this.y = Math.random() * canvas.height;
        }
        this.size = Math.random() * 2 + 1;
        this.speedX = (Math.random() - 0.5) * 0.3;
        this.speedY = (Math.random() - 0.5) * 0.3;
        // Enhanced particles for dark theme
        this.color = `rgba(${Math.floor(Math.random() * 100) + 100}, ${
          Math.floor(Math.random() * 150) + 150
        }, ${Math.floor(Math.random() * 100) + 200}, ${
          Math.random() * 0.4 + 0.2
        })`;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (!canvas) return;

        if (this.x > canvas.width) this.x = 0;
        if (this.x < 0) this.x = canvas.width;
        if (this.y > canvas.height) this.y = 0;
        if (this.y < 0) this.y = canvas.height;
      }

      draw() {
        if (!ctx) return;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    function animate() {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (const particle of particles) {
        particle.update();
        particle.draw();
      }

      requestAnimationFrame(animate);
    }

    animate();

    const handleResize = () => {
      if (!canvas) return;
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="relative overflow-hidden transition-colors duration-300">
      <div className="container mx-auto p-4 relative z-10">
        {/* Main content */}
        <div className="grid grid-cols-12 gap-6">
          {/* Left sidebar */}
          <div className="col-span-12 md:col-span-3 lg:col-span-2">
            {/* <ProfileData /> */}
            <Card className="@container/card bg-gradient-to-t from-primary/5 to-card dark:bg-card shadow-xs border-slate-700">
              <CardContent className="p-4">
                <nav className="space-y-2">
                  <NavItem icon={Target} label="Dashboard" active />
                  <NavItem icon={Code} label="Practice" />
                  <NavItem icon={BookOpen} label="Learn" />
                  <NavItem icon={Trophy} label="Contests" />
                  <NavItem icon={Users} label="Community" />
                  <NavItem icon={BarChart3} label="Progress" />
                  <NavItem icon={Github} label="Projects" />
                  <NavItem icon={MessageCircle} label="Discuss" />
                </nav>

                <div className="mt-8 pt-6 border-t border-slate-700">
                  <div className="text-xs text-black mb-3 font-semibold uppercase tracking-wide">
                    Your Stats
                  </div>
                  <div className="space-y-4">
                    <StatItem
                      label="Study Streak"
                      value={studyStreak}
                      unit="days"
                      color="green"
                    />
                    <StatItem
                      label="Problems Solved"
                      value={problemsSolved}
                      unit=""
                      color="blue"
                    />
                    <StatItem
                      label="Global Rank"
                      value={currentRank}
                      unit=""
                      color="purple"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main dashboard */}
          <div className="col-span-12 md:col-span-9 lg:col-span-7">
            <div className="grid gap-6">
              {/* Hero section */}
              <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white border-0 overflow-hidden">
                <CardContent className="p-8 relative">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
                  <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-12 -translate-x-12"></div>

                  <div className="relative z-10">
                    <h1 className="text-3xl font-bold mb-2">
                      Welcome back, {session?.user.login}! 👋
                    </h1>
                    <p className="text-blue-100 mb-6">
                      Ready to level up your coding skills today?
                    </p>

                    <div className="flex flex-wrap gap-4">
                      <Button className="bg-white text-blue-600 hover:bg-blue-50">
                        <PlayCircle className="mr-2 h-4 w-4" />
                        Continue Learning
                      </Button>
                      <Button
                        variant="outline"
                        className="border-white text-white hover:bg-white/10 bg-transparent"
                      >
                        <Target className="mr-2 h-4 w-4" />
                        Daily Challenge
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Quick stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <QuickStatCard
                  title="Today's Progress"
                  value="3/5"
                  subtitle="Problems completed"
                  icon={CheckCircle}
                  color="green"
                  progress={60}
                />
                <QuickStatCard
                  title="Study Time"
                  value="2h 34m"
                  subtitle="This week"
                  icon={Clock}
                  color="blue"
                  progress={75}
                />
                <QuickStatCard
                  title="Accuracy Rate"
                  value="87%"
                  subtitle="Last 30 problems"
                  icon={Target}
                  color="purple"
                  progress={87}
                />
              </div>

              {/* Learning paths and practice */}
              <Card className="bg-slate-900/80 backdrop-blur-sm border-slate-700">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center text-slate-100">
                      <Brain className="mr-2 h-5 w-5 text-blue-400" />
                      Learning Paths
                    </CardTitle>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-slate-300 hover:text-slate-100"
                    >
                      View All
                      <ChevronRight className="ml-1 h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="algorithms" className="w-full">
                    <TabsList className="grid w-full grid-cols-4 bg-white">
                      <TabsTrigger
                        value="algorithms"
                        className="data-[state=active]:bg-slate-700 data-[state=active]:text-blue-400"
                      >
                        Algorithms
                      </TabsTrigger>
                      <TabsTrigger
                        value="datastructures"
                        className="data-[state=active]:bg-slate-700 data-[state=active]:text-blue-400"
                      >
                        Data Structures
                      </TabsTrigger>
                      <TabsTrigger
                        value="system"
                        className="data-[state=active]:bg-slate-700 data-[state=active]:text-blue-400"
                      >
                        System Design
                      </TabsTrigger>
                      <TabsTrigger
                        value="interview"
                        className="data-[state=active]:bg-slate-700 data-[state=active]:text-blue-400"
                      >
                        Interview Prep
                      </TabsTrigger>
                    </TabsList>

                    <TabsContent value="algorithms" className="mt-6">
                      <div className="grid gap-4">
                        <LearningPathItem
                          title="Dynamic Programming Mastery"
                          description="Master DP patterns with 50+ curated problems"
                          progress={65}
                          difficulty="Hard"
                          timeEstimate="3-4 weeks"
                          icon={Zap}
                        />
                        <LearningPathItem
                          title="Graph Algorithms Deep Dive"
                          description="BFS, DFS, Dijkstra, and advanced graph techniques"
                          progress={40}
                          difficulty="Medium"
                          timeEstimate="2-3 weeks"
                          icon={GitBranch}
                        />
                        <LearningPathItem
                          title="Sorting & Searching Fundamentals"
                          description="Build strong foundations with essential algorithms"
                          progress={90}
                          difficulty="Easy"
                          timeEstimate="1-2 weeks"
                          icon={BarChart3}
                        />
                      </div>
                    </TabsContent>

                    <TabsContent value="datastructures" className="mt-6">
                      <div className="grid gap-4">
                        <LearningPathItem
                          title="Trees & Binary Search Trees"
                          description="Master tree traversals and BST operations"
                          progress={75}
                          difficulty="Medium"
                          timeEstimate="2-3 weeks"
                          icon={GitBranch}
                        />
                        <LearningPathItem
                          title="Hash Tables & Hash Maps"
                          description="Efficient lookups and collision handling"
                          progress={85}
                          difficulty="Easy"
                          timeEstimate="1 week"
                          icon={Database}
                        />
                        <LearningPathItem
                          title="Advanced Data Structures"
                          description="Heaps, Tries, Segment Trees, and more"
                          progress={25}
                          difficulty="Hard"
                          timeEstimate="4-5 weeks"
                          icon={Cpu}
                        />
                      </div>
                    </TabsContent>

                    <TabsContent value="system" className="mt-6">
                      <div className="grid gap-4">
                        <LearningPathItem
                          title="Scalability Fundamentals"
                          description="Load balancing, caching, and horizontal scaling"
                          progress={30}
                          difficulty="Hard"
                          timeEstimate="3-4 weeks"
                          icon={Globe}
                        />
                        <LearningPathItem
                          title="Database Design Patterns"
                          description="SQL vs NoSQL, indexing, and optimization"
                          progress={55}
                          difficulty="Medium"
                          timeEstimate="2-3 weeks"
                          icon={Database}
                        />
                      </div>
                    </TabsContent>

                    <TabsContent value="interview" className="mt-6">
                      <div className="grid gap-4">
                        <LearningPathItem
                          title="FAANG Interview Prep"
                          description="Top 150 problems asked at major tech companies"
                          progress={45}
                          difficulty="Hard"
                          timeEstimate="6-8 weeks"
                          icon={Trophy}
                        />
                        <LearningPathItem
                          title="Behavioral Interview Guide"
                          description="STAR method and common behavioral questions"
                          progress={70}
                          difficulty="Easy"
                          timeEstimate="1 week"
                          icon={MessageCircle}
                        />
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>

              {/* Recent activity and achievements */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="bg-slate-900/80 backdrop-blur-sm border-slate-700">
                  <CardHeader>
                    <CardTitle className="flex items-center text-base text-slate-100">
                      <Activity className="mr-2 h-5 w-5 text-green-400" />
                      Recent Activity
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <ActivityItem
                        action="Solved"
                        item="Two Sum"
                        time="2 hours ago"
                        difficulty="Easy"
                        points={10}
                      />
                      <ActivityItem
                        action="Completed"
                        item="Array Fundamentals"
                        time="1 day ago"
                        difficulty="Module"
                        points={50}
                      />
                      <ActivityItem
                        action="Attempted"
                        item="Longest Palindromic Substring"
                        time="2 days ago"
                        difficulty="Medium"
                        points={0}
                      />
                      <ActivityItem
                        action="Solved"
                        item="Valid Parentheses"
                        time="3 days ago"
                        difficulty="Easy"
                        points={15}
                      />
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-slate-900/80 backdrop-blur-sm border-slate-700">
                  <CardHeader>
                    <CardTitle className="flex items-center text-base text-slate-100">
                      <Award className="mr-2 h-5 w-5 text-yellow-500" />
                      Achievements
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <AchievementItem
                        title="Problem Solver"
                        description="Solved 250+ problems"
                        icon={CheckCircle}
                        earned={true}
                        rarity="Common"
                      />
                      <AchievementItem
                        title="Streak Master"
                        description="7-day solving streak"
                        icon={Zap}
                        earned={true}
                        rarity="Rare"
                      />
                      <AchievementItem
                        title="Algorithm Expert"
                        description="Master 5 algorithm categories"
                        icon={Brain}
                        earned={false}
                        rarity="Epic"
                        progress={60}
                      />
                      <AchievementItem
                        title="Community Helper"
                        description="Help 10 fellow learners"
                        icon={Users}
                        earned={false}
                        rarity="Rare"
                        progress={30}
                      />
                    </div>
                  </CardContent>
                </Card>
              </div>
              <InstagramFeed />
            </div>
          </div>

          {/* Right sidebar */}
          <div className="col-span-12 lg:col-span-3">
            <div className="grid gap-6">
              {/* Daily challenge */}
              <Card className="bg-gradient-to-br from-orange-500 to-red-500 text-white border-0">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="font-bold text-lg">Daily Challenge</h3>
                      <p className="text-orange-100 text-sm">Earn bonus XP!</p>
                    </div>
                    <Trophy className="h-8 w-8 text-yellow-300" />
                  </div>

                  <div className="mb-4">
                    <h4 className="font-semibold mb-1">Merge Intervals</h4>
                    <div className="flex items-center space-x-2 text-sm">
                      <Badge className="bg-white/20 text-white border-white/30">
                        Medium
                      </Badge>
                      <span className="text-orange-100">+50 XP</span>
                    </div>
                  </div>

                  <Button className="w-full bg-white text-orange-600 hover:bg-orange-50">
                    Start Challenge
                  </Button>
                </CardContent>
              </Card>

              {/* Study schedule */}
              <Card className="bg-slate-900/80 backdrop-blur-sm border-slate-700">
                <CardHeader>
                  <CardTitle className="flex items-center text-base text-slate-100">
                    <Calendar className="mr-2 h-5 w-5 text-blue-400" />
                    Study Schedule
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <ScheduleItem
                      time="09:00"
                      title="Dynamic Programming"
                      duration="45 min"
                      type="practice"
                      completed={true}
                    />
                    <ScheduleItem
                      time="14:30"
                      title="System Design Reading"
                      duration="30 min"
                      type="theory"
                      completed={false}
                      current={true}
                    />
                    <ScheduleItem
                      time="19:00"
                      title="Mock Interview"
                      duration="60 min"
                      type="interview"
                      completed={false}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Leaderboard */}
              <Card className="bg-slate-900/80 backdrop-blur-sm border-slate-700">
                <CardHeader>
                  <CardTitle className="flex items-center text-base text-slate-100">
                    <TrendingUp className="mr-2 h-5 w-5 text-purple-400" />
                    Weekly Leaderboard
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <LeaderboardItem
                      rank={1}
                      name="Alex Chen"
                      points={1250}
                      avatar="/placeholder.svg?height=32&width=32"
                      isCurrentUser={false}
                    />
                    <LeaderboardItem
                      rank={2}
                      name="Sarah Kim"
                      points={1180}
                      avatar="/placeholder.svg?height=32&width=32"
                      isCurrentUser={false}
                    />
                    <LeaderboardItem
                      rank={3}
                      name="You"
                      points={1050}
                      avatar="/placeholder.svg?height=32&width=32"
                      isCurrentUser={true}
                    />
                    <LeaderboardItem
                      rank={4}
                      name="Mike Johnson"
                      points={980}
                      avatar="/placeholder.svg?height=32&width=32"
                      isCurrentUser={false}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Quick actions */}
              <Card className="bg-slate-900/80 backdrop-blur-sm border-slate-700">
                <CardHeader>
                  <CardTitle className="text-base text-slate-100">
                    Quick Actions
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-3">
                    <ActionButton icon={Code} label="Random Problem" />
                    <ActionButton icon={Lightbulb} label="Hint" />
                    <ActionButton icon={MessageCircle} label="Discuss" />
                    <ActionButton icon={BookOpen} label="Notes" />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Component for nav items
function NavItem({
  icon: Icon,
  label,
  active,
}: {
  icon: LucideIcon;
  label: string;
  active?: boolean;
}) {
  return (
    <Button
      variant="ghost"
      className={`w-full justify-start ${
        active
          ? "bg-blue-900/50 text-blue-300"
          : "text-slate-400 hover:text-slate-100 hover:bg-slate-800/50"
      }`}
    >
      <Icon className="mr-2 h-4 w-4" />
      {label}
    </Button>
  );
}

// Component for stat items
function StatItem({
  label,
  value,
  unit,
  color,
}: {
  label: string;
  value: number;
  unit: string;
  color: string;
}) {
  const getColorClasses = () => {
    switch (color) {
      case "green":
        return "text-green-400";
      case "blue":
        return "text-blue-400";
      case "purple":
        return "text-purple-400";
      default:
        return "text-blue-400";
    }
  };

  return (
    <div className="flex items-center justify-between">
      <div className="text-sm text-slate-400">{label}</div>
      <div className={`font-semibold ${getColorClasses()}`}>
        {value.toLocaleString()}
        {unit}
      </div>
    </div>
  );
}

// Component for quick stat cards
function QuickStatCard({
  title,
  value,
  subtitle,
  icon: Icon,
  color,
  progress,
}: {
  title: string;
  value: string;
  subtitle: string;
  icon: LucideIcon;
  color: string;
  progress: number;
}) {
  const getColorClasses = () => {
    switch (color) {
      case "green":
        return "text-green-400 bg-green-900/20";
      case "blue":
        return "text-blue-400 bg-blue-900/20";
      case "purple":
        return "text-purple-400 bg-purple-900/20";
      default:
        return "text-blue-400 bg-blue-900/20";
    }
  };

  const getProgressColor = () => {
    switch (color) {
      case "green":
        return "bg-green-500";
      case "blue":
        return "bg-blue-500";
      case "purple":
        return "bg-purple-500";
      default:
        return "bg-blue-500";
    }
  };

  return (
    <Card className="bg-slate-900/80 backdrop-blur-sm border-slate-700">
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div className={`p-2 rounded-lg ${getColorClasses()}`}>
            <Icon className="h-5 w-5" />
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-slate-100">{value}</div>
            <div className="text-xs text-slate-400">{subtitle}</div>
          </div>
        </div>
        <div className="mb-2">
          <div className="text-sm font-medium text-slate-300">{title}</div>
        </div>
        <Progress value={progress} className="h-1.5 bg-slate-700">
          <div
            className={`h-full rounded-full ${getProgressColor()}`}
            style={{ width: `${progress}%` }}
          />
        </Progress>
      </CardContent>
    </Card>
  );
}

// Component for learning path items
function LearningPathItem({
  title,
  description,
  progress,
  difficulty,
  timeEstimate,
  icon: Icon,
}: {
  title: string;
  description: string;
  progress: number;
  difficulty: string;
  timeEstimate: string;
  icon: LucideIcon;
}) {
  const getDifficultyColor = () => {
    switch (difficulty) {
      case "Easy":
        return "bg-green-900/20 text-green-400 border-green-800";
      case "Medium":
        return "bg-yellow-900/20 text-yellow-400 border-yellow-800";
      case "Hard":
        return "bg-red-900/20 text-red-400 border-red-800";
      default:
        return "bg-gray-900/20 text-gray-400 border-gray-800";
    }
  };

  return (
    <div className="p-4 border border-slate-700 rounded-lg hover:bg-slate-800/50 transition-colors">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-blue-900/20 rounded-lg">
            <Icon className="h-5 w-5 text-blue-400" />
          </div>
          <div>
            <h4 className="font-semibold text-slate-100">{title}</h4>
            <p className="text-sm text-slate-400">{description}</p>
          </div>
        </div>
        <Button
          variant="ghost"
          size="sm"
          className="text-slate-400 hover:text-slate-100"
        >
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>

      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center space-x-2">
          <Badge variant="outline" className={getDifficultyColor()}>
            {difficulty}
          </Badge>
          <span className="text-xs text-slate-400">{timeEstimate}</span>
        </div>
        <span className="text-sm font-medium text-slate-300">{progress}%</span>
      </div>

      <Progress value={progress} className="h-2 bg-slate-700">
        <div
          className="h-full bg-blue-500 rounded-full"
          style={{ width: `${progress}%` }}
        />
      </Progress>
    </div>
  );
}

// Component for activity items
function ActivityItem({
  action,
  item,
  time,
  difficulty,
  points,
}: {
  action: string;
  item: string;
  time: string;
  difficulty: string;
  points: number;
}) {
  const getActionColor = () => {
    switch (action) {
      case "Solved":
        return "text-green-400";
      case "Completed":
        return "text-blue-400";
      case "Attempted":
        return "text-yellow-400";
      default:
        return "text-slate-400";
    }
  };

  return (
    <div className="flex items-center justify-between py-2">
      <div>
        <div className="text-sm">
          <span className={`font-medium ${getActionColor()}`}>{action}</span>
          <span className="text-slate-300 ml-1">{item}</span>
        </div>
        <div className="flex items-center space-x-2 mt-1">
          <span className="text-xs text-slate-400">{time}</span>
          <Badge
            variant="outline"
            className="text-xs border-slate-700 text-slate-300"
          >
            {difficulty}
          </Badge>
        </div>
      </div>
      {points > 0 && (
        <div className="text-sm font-medium text-green-400">+{points} XP</div>
      )}
    </div>
  );
}

// Component for achievement items
function AchievementItem({
  title,
  description,
  icon: Icon,
  earned,
  rarity,
  progress,
}: {
  title: string;
  description: string;
  icon: LucideIcon;
  earned: boolean;
  rarity: string;
  progress?: number;
}) {
  const getRarityColor = () => {
    switch (rarity) {
      case "Common":
        return "text-gray-400";
      case "Rare":
        return "text-blue-400";
      case "Epic":
        return "text-purple-400";
      case "Legendary":
        return "text-yellow-400";
      default:
        return "text-gray-400";
    }
  };

  return (
    <div
      className={`flex items-center space-x-3 p-2 rounded-lg ${
        earned ? "bg-green-900/10" : "opacity-60"
      }`}
    >
      <div
        className={`p-2 rounded-lg ${
          earned ? "bg-green-900/20" : "bg-slate-800"
        }`}
      >
        <Icon
          className={`h-4 w-4 ${earned ? "text-green-400" : "text-slate-400"}`}
        />
      </div>
      <div className="flex-1">
        <div className="flex items-center space-x-2">
          <h4 className="text-sm font-medium text-slate-100">{title}</h4>
          <Badge
            variant="outline"
            className={`text-xs ${getRarityColor()} border-slate-700`}
          >
            {rarity}
          </Badge>
        </div>
        <p className="text-xs text-slate-400">{description}</p>
        {!earned && progress && (
          <Progress value={progress} className="h-1 mt-1 bg-slate-700">
            <div
              className="h-full bg-blue-500 rounded-full"
              style={{ width: `${progress}%` }}
            />
          </Progress>
        )}
      </div>
    </div>
  );
}

// Component for schedule items
function ScheduleItem({
  time,
  title,
  duration,
  type,
  completed,
  current,
}: {
  time: string;
  title: string;
  duration: string;
  type: string;
  completed?: boolean;
  current?: boolean;
}) {
  const getTypeColor = () => {
    switch (type) {
      case "practice":
        return "bg-blue-900/20 text-blue-400";
      case "theory":
        return "bg-green-900/20 text-green-400";
      case "interview":
        return "bg-purple-900/20 text-purple-400";
      default:
        return "bg-gray-900/20 text-gray-400";
    }
  };

  return (
    <div
      className={`flex items-center space-x-3 p-2 rounded-lg ${
        current ? "bg-blue-900/10 border border-blue-800" : ""
      }`}
    >
      <div className="text-sm font-mono text-slate-400 w-12">{time}</div>
      <div className="flex-1">
        <div className="flex items-center space-x-2">
          <h4
            className={`text-sm font-medium ${
              completed ? "line-through text-slate-500" : "text-slate-100"
            }`}
          >
            {title}
          </h4>
          {completed && <CheckCircle className="h-4 w-4 text-green-500" />}
          {current && (
            <div className="h-2 w-2 bg-blue-500 rounded-full animate-pulse"></div>
          )}
        </div>
        <div className="flex items-center space-x-2 mt-1">
          <span className="text-xs text-slate-400">{duration}</span>
          <Badge
            variant="outline"
            className={`text-xs ${getTypeColor()} border-slate-700`}
          >
            {type}
          </Badge>
        </div>
      </div>
    </div>
  );
}

// Component for leaderboard items
function LeaderboardItem({
  rank,
  name,
  points,
  avatar,
  isCurrentUser,
}: {
  rank: number;
  name: string;
  points: number;
  avatar: string;
  isCurrentUser: boolean;
}) {
  const getRankColor = () => {
    switch (rank) {
      case 1:
        return "text-yellow-400";
      case 2:
        return "text-gray-400";
      case 3:
        return "text-amber-400";
      default:
        return "text-slate-400";
    }
  };

  return (
    <div
      className={`flex items-center space-x-3 p-2 rounded-lg ${
        isCurrentUser ? "bg-blue-900/10" : ""
      }`}
    >
      <div className={`text-sm font-bold w-6 text-center ${getRankColor()}`}>
        #{rank}
      </div>
      <Avatar className="h-8 w-8">
        <AvatarImage src={avatar || "/placeholder.svg"} alt={name} />
        <AvatarFallback className="bg-slate-700 text-xs text-slate-300">
          {name
            .split(" ")
            .map((n) => n[0])
            .join("")}
        </AvatarFallback>
      </Avatar>
      <div className="flex-1">
        <div
          className={`text-sm font-medium ${
            isCurrentUser ? "text-blue-300" : "text-slate-100"
          }`}
        >
          {name}
        </div>
      </div>
      <div className="text-sm font-semibold text-slate-300">
        {points.toLocaleString()}
      </div>
    </div>
  );
}

// Component for action buttons
function ActionButton({
  icon: Icon,
  label,
}: {
  icon: LucideIcon;
  label: string;
}) {
  return (
    <Button
      variant="outline"
      className="h-auto py-3 px-3 border-slate-700 bg-slate-800/50 hover:bg-slate-700/50 flex flex-col items-center justify-center space-y-1 w-full text-slate-300 hover:text-slate-100"
    >
      <Icon className="h-5 w-5 text-blue-400" />
      <span className="text-xs">{label}</span>
    </Button>
  );
}
