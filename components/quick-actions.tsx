"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { PlusCircle, FileEdit, Bookmark, TrendingUp } from "lucide-react"

export function QuickActions() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Quick Actions</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <Button variant="outline" className="w-full justify-start bg-transparent" size="sm">
          <PlusCircle className="mr-2 h-4 w-4" />
          Create New Blog
        </Button>
        <Button variant="outline" className="w-full justify-start bg-transparent" size="sm">
          <FileEdit className="mr-2 h-4 w-4" />
          Continue Draft
        </Button>
        <Button variant="outline" className="w-full justify-start bg-transparent" size="sm">
          <Bookmark className="mr-2 h-4 w-4" />
          View Bookmarks
        </Button>
        <Button variant="outline" className="w-full justify-start bg-transparent" size="sm">
          <TrendingUp className="mr-2 h-4 w-4" />
          View Analytics
        </Button>
      </CardContent>
    </Card>
  )
}
