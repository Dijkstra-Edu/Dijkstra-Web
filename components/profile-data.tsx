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
} from "lucide-react";
import { useSession } from "next-auth/react";
import {
  IconBrandLeetcode,
  IconBrandLinkedin,
  IconWorldWww,
} from "@tabler/icons-react";

export function ProfileData() {
  const { data: session, status } = useSession();
  return (
    <div className="pr-4">
      <Card className="@container/card p-6 space-y-4 rounded-2xl shadow-md">
        <div className="flex flex-col items-center text-center">
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

        <div className="space-y-3 text-sm">
          <div className="flex items-center gap-2">
            <Briefcase className="w-4 h-4 text-muted-foreground" />
            <span>{session?.user.company}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-muted-foreground" />
            <span>{session?.user.location}</span>
          </div>
          {/* <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-muted-foreground" />
            <span>UTC -7 (PDT)</span>
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

        <Separator className="my-4" />

        <Button variant="default" className="w-full">
          <FileText className="w-4 h-4 mr-2" />
          View Resume
        </Button>

        <Separator className="my-4" />

        - Current Streak
        - Current Project 
        - Current Team
        - Aim
      </Card>
    </div>
  );
}
