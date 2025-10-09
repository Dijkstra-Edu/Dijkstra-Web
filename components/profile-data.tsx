"use client";

import * as React from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Pencil,
  Linkedin,
  Globe,
  FileText,
  MapPin,
  Briefcase,
  Clock,
  Calendar,
  FolderGit2,
  UserCheck,
  Users,
  Award,
  Download,
  FileDown,
  GraduationCap,
} from "lucide-react";
import { useSession } from "next-auth/react";
import {
  IconBrandLeetcode,
  IconBrandLinkedin,
  IconWorldWww,
  IconFileTypeJs,
  IconFlame,
} from "@tabler/icons-react";
import { CAREER_PATHS, type CareerPathKey } from "@/data/career-paths";
import { Badge } from "@/components/ui/badge";

export function ProfileData() {
  const { data: session, status } = useSession();

  // Primary career path - this should come from user profile data
  const primaryPath: CareerPathKey = "FULLSTACK"; // Replace with actual user data
  const path = CAREER_PATHS[primaryPath];

  return (
    <div className="pr-2">
      <Card className="@container/card p-6 rounded-2xl shadow-md">
        <div className="flex flex-col space-y-4 items-center text-center">
          <Image
            src={session?.user.avatar_url || "/default-avatar.png"}
            alt="GitHub Avatar"
            width={144}
            height={144}
            className="rounded-full"
          />
          <h2 className="text-lg font-semibold mt-4">{session?.user.name}</h2>
          <p className="text-sm text-muted-foreground">
            @
            <a
              className="border-b-2"
              href={`https://github.com/` + session?.user.login}
            >
              {session?.user.login}
            </a>
          </p>
          <p className="text-sm mt-2 text-muted-foreground">
            {session?.user.bio || "Bio unavailable"}
          </p>
          <Button variant="outline" size="sm" className="mt-3">
            <Pencil className="h-4 w-4 mr-2" />
            Edit Profile
          </Button>

          <div className="flex justify-center gap-8 mt-4 text-sm">
            <div className="text-center">
              <p className="font-semibold">{session?.user.followers ?? 0}</p>
              <p className="text-muted-foreground">Followers</p>
            </div>
            <div className="text-center">
              <p className="font-semibold">{session?.user.following ?? 0}</p>
              <p className="text-muted-foreground">Following</p>
            </div>
            <div className="text-center">
              <p className="font-semibold">{session?.user.public_repos ?? 0}</p>
              <p className="text-muted-foreground">Repos</p>
            </div>
          </div>
        </div>
        {/* Three-column section for Rank, Streak, and Goal */}
        <div className="grid grid-cols-3 gap-3">
          {/* Rank Column */}
          <div className="flex flex-col items-center justify-center p-3 bg-muted/30 rounded-lg min-h-[180px]">
            <Image
              src="/Ranks/GOLD_1.png"
              alt="Rank Badge"
              width={80}
              height={80}
              className="mb-2"
            />
            <span className="text-sm font-bold text-yellow-500 text-center">
              GOLD 1
            </span>
            <span className="text-xs text-muted-foreground mt-1">Rank</span>
          </div>

          {/* Streak Column */}
          <div className="flex flex-col items-center justify-center p-3 bg-muted/30 rounded-lg min-h-[180px]">
            <div className="relative mb-2">
              <img
                src="/fire.png"
                alt="Fire streak"
                className="w-25 h-25 object-contain"
              />
              <div className="absolute inset-0 flex items-center justify-center pt-2">
                <span className="text-xl font-bold text-white drop-shadow-lg">12</span>
              </div>
            </div>
            <span className="text-xs text-muted-foreground mt-1">Day Streak</span>
          </div>

          {/* Goal Column - Primary Specialization */}
          <div className="flex flex-col items-center justify-center p-3 bg-muted/30 rounded-lg min-h-[180px]">
            <div className={`w-28 h-36 p-3 rounded-xl border-2 bg-gradient-to-br ${path.gradient} border-white/20 shadow-xl backdrop-blur-sm`}>
              <div className="text-center h-full flex flex-col justify-between">
                <div>
                  <div className={`w-10 h-10 mx-auto mb-2 rounded-xl bg-white/30 backdrop-blur-sm border border-white/30 flex items-center justify-center p-1.5 shadow-lg`}>
                    <img 
                      src={`/${path.icon}`} 
                      alt={path.label}
                      className="w-full h-full object-contain filter drop-shadow-sm"
                      onError={(e) => {
                        // Fallback to shortLabel if image doesn't exist
                        e.currentTarget.style.display = 'none';
                        const parent = e.currentTarget.parentElement;
                        if (parent) {
                          const span = document.createElement('span');
                          span.className = 'text-white text-[10px] font-bold';
                          span.textContent = path.shortLabel;
                          parent.appendChild(span);
                        }
                      }}
                    />
                  </div>
                  <h4 className="text-[10px] font-medium text-white drop-shadow-sm leading-tight px-1 break-words">{path.label}</h4>
                </div>
                
                {/* Primary Badge */}
                <div className="flex justify-center mt-auto">
                  <Badge variant="default" className="text-[9px] font-semibold px-1.5 py-0.5 bg-white/50 text-white border-white/70 shadow-lg backdrop-blur-sm">
                    ⭐ Primary
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-3 text-sm">
          {/* <div className="flex items-center gap-2">
            <Briefcase className="w-4 h-4 text-muted-foreground" />
            <span>{session?.user.company}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-muted-foreground" />
            <span>{session?.user.location}</span>
          </div> */}
          <div className="flex flex-row items-center justify-center gap-2 pt-3">
            <Button variant="default" className="w-1/3">
              <a
                href="https://www.linkedin.com/in/jrs2002/"
                target="_blank"
                className="w-full flex justify-center"
              >
                <IconBrandLinkedin className="h-4 w-4 text-white" />
              </a>
            </Button>
            <Button variant="default" className="w-1/3">
              <a
                href="https://leetcode.com/u/JRS296/"
                target="_blank"
                className="w-full flex justify-center"
              >
                <IconBrandLeetcode className="h-4 w-4 text-white" />
              </a>
            </Button>
            <Button variant="default" className="w-1/3">
              <a
                href="https://jrs-studios.web.cern.ch/"
                target="_blank"
                className="w-full flex justify-center"
              >
                <IconWorldWww className="h-4 w-4" />
              </a>
            </Button>
          </div>
        </div>
        <Separator className="my-1" />

        {/* Current Project & Team Card f0f5f0 */}
        <Card className="bg-[#f0f5f0] dark:bg-gray-800 text-gray-900 dark:text-gray-100 border-0 shadow-md">
          <CardContent className="py-2 space-y-4">
            <div className="text-center">
              <h3 className="text-lg font-bold">Current Project & Team</h3>
              <p className="text-muted-foreground dark:text-gray-400 text-sm mt-1">
                Your current assignment and role
              </p>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Users className="w-5 h-5 text-green-600 dark:text-green-400" />
                <div>
                  <span className="text-xs text-muted-foreground dark:text-gray-400">Team: </span>
                  <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                    <a href="#" className="hover:underline">CERT Generator</a>
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <FolderGit2 className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                <div>
                  <span className="text-xs text-muted-foreground dark:text-gray-400">Project: </span>
                  <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                    <a href="#" className="hover:underline">Dijkstra Statistics & Aggregation</a>
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <UserCheck className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
                <div>
                  <span className="text-xs text-muted-foreground dark:text-gray-400">Role: </span>
                  <span className="text-sm font-medium text-gray-900 dark:text-gray-100">SDE-1 (Frontend Engineer)</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Calendar className="w-5 h-5 text-pink-600 dark:text-pink-400" />
                <div>
                  <span className="text-xs text-muted-foreground dark:text-gray-400">Member Since: </span>
                  <span className="text-sm font-medium text-gray-900 dark:text-gray-100">24th March, 2025</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Separator className="my-1" />
        {/* Updated buttons with download icons and new logos */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Button variant="outline" className="flex-1">
              <FileText className="h-4 w-4 mr-2" />
              View Resume
            </Button>
            <Button size="icon" className="h-10 w-10">
              <Download className="h-4 w-4" />
            </Button>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="outline" className="flex-1">
              <GraduationCap className="h-4 w-4 mr-2" />
              View CV
            </Button>
            <Button size="icon" className="h-10 w-10">
              <Download className="h-4 w-4" />
            </Button>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="outline" className="flex-1">
              <FileDown className="h-4 w-4 mr-2" />
              View Dijkstra Transcript
            </Button>
            <Button size="icon" className="h-10 w-10">
              <Download className="h-4 w-4" />
            </Button>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="outline" className="flex-1">
              <Award className="h-4 w-4 mr-2" />
              View Dijkstra Certificate
            </Button>
            <Button size="icon" className="h-10 w-10">
              <Download className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
