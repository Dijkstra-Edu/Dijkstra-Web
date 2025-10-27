"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Github, Settings } from "lucide-react"

export function UserProfileCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Profile</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-4">
          <Avatar className="h-16 w-16">
            <AvatarImage src="/diverse-user-avatars.png" alt="John Doe" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <h3 className="font-semibold">John Doe</h3>
            <p className="text-sm text-muted-foreground">Software Engineer & Technical Writer</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="flex-1 bg-transparent">
            <Github className="mr-2 h-4 w-4" />
            GitHub
          </Button>
          <Button variant="outline" size="sm" className="flex-1 bg-transparent">
            <Settings className="mr-2 h-4 w-4" />
            Settings
          </Button>
        </div>
        <div className="grid grid-cols-3 gap-4 pt-2 text-center">
          <div>
            <div className="text-2xl font-bold">30</div>
            <div className="text-xs text-muted-foreground">Published</div>
          </div>
          <div>
            <div className="text-2xl font-bold">5</div>
            <div className="text-xs text-muted-foreground">Drafts</div>
          </div>
          <div>
            <div className="text-2xl font-bold">2</div>
            <div className="text-xs text-muted-foreground">Archived</div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
