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

export function ProfileData() {
  const { data: session, status } = useSession();

  // Define goal options with corresponding icons or images
  const goalOptions = {
    FRONTEND: "FrontEnd Engineer",
    BACKEND: "BackEnd Engineer",
    FULLSTACK: "FullStack Engineer",
    // Add other options as needed
  };

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
        <div className="grid grid-cols-3">
          {/* Rank Column */}
          <div className="flex flex-col items-center justify-center bg-muted/30 rounded-lg">
            <Image
              src="/gold.png" // Replace with your actual rank image path
              alt="Rank Badge"
              width={120}
              height={120}
              className=""
            />
            <h2 className="text-center text-lg font-bold mb-6 text-yellow-500">
              GOLD 1
            </h2>
          </div>

          {/* Streak Column */}
          <div className="flex flex-col items-center justify-center p-3 bg-muted/30 rounded-lg">
            <div className="flex items-center mb-1">
              {/* <Image
                src="/fire.png" // Replace with your actual fire emoji image
                alt="Streak"
                width={50}
                height={50}
                className="mr-1"
              /> */}
              <IconFlame className="h-12 w-12 mb-1 mr-1 text-orange-500" />
              <span className="text-lg font-bold">12</span>
            </div>
            <span className="text-xs font-medium">Day Streak</span>
          </div>

          {/* Goal Column */}
          <div
            className="flex flex-col items-center justify-center p-[2px] rounded-lg border-2 border-transparent 
                          bg-gradient-to-r from-pink-500 via-blue-500 to-purple-500 bg-origin-border"
          >
            <div className="flex flex-col items-center justify-center w-full h-full bg-background rounded-md py-2">
              <IconFileTypeJs className="h-12 w-12 mb-1 text-pink-500" />
              <span
                className="text-xs font-bold text-transparent bg-clip-text 
                              bg-gradient-to-r from-pink-500 to-purple-500 text-center"
              >
                Frontend <br /> Engineer <br /> (F.E)
              </span>
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

        {/* Team & Project Section with red to grey to black gradient */}
        <div
          className="p-[2px] rounded-lg border-2 border-transparent 
                        bg-gradient-to-r from-green-700 via-gray-500 to-black bg-origin-border"
        >
          <div className="w-full h-full bg-background rounded-md p-4 space-y-3">
            <h3 className="text-m font-bold text-center mb-3">
              Current Project & Team
            </h3>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-red-500" />
                <div>
                  <span className="text-xs text-muted-foreground">Team: </span>
                  <span className="text-xs font-medium">
                    <a href="#">CERT Generator</a>
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <FolderGit2 className="w-4 h-4 text-gray-500" />
                <div>
                  <span className="text-xs text-muted-foreground">
                    Project:{" "}
                  </span>
                  <span className="text-xs font-medium">
                    <a href="#">Dijkstra Statistics & Aggregation</a>
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <UserCheck className="w-4 h-4 text-gray-700" />
                <div>
                  <span className="text-xs text-muted-foreground">Role: </span>
                  <span className="text-xs font-medium">
                    SDE-1 (Frontend Engineer)
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-black" />
                <div>
                  <span className="text-xs text-muted-foreground">
                    Member Since:{" "}
                  </span>
                  <span className="text-xs font-medium">24th March, 2025</span>
                </div>
              </div>
            </div>
          </div>
        </div>

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
