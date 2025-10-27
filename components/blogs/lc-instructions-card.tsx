import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Info } from "lucide-react"

export function LCInstructionsCard() {
  return (
    <Card className="border-blue-500/50 bg-blue-500/5">
      <CardHeader className="pb-2 pt-4 px-4">
        <div className="flex items-center gap-2">
          <Info className="h-4 w-4 text-blue-500 shrink-0" />
          <CardTitle className="text-sm font-medium">Auto-Generation Guide</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="px-4 pb-4 text-xs text-muted-foreground space-y-2">
        <p className="font-medium text-foreground text-xs">{"How it works:"}</p>
        <ul className="space-y-1 ml-1 text-xs">
          <li className="flex gap-1.5">
            <span className="text-blue-500 shrink-0">•</span>
            <span>
              Use format: <code className="text-xs bg-muted px-1 py-0.5 rounded">123-problem-name</code>
            </span>
          </li>
          <li className="flex gap-1.5">
            <span className="text-blue-500 shrink-0">•</span>
            <span>Include: Problem, Approach, Solution, Complexity</span>
          </li>
          <li className="flex gap-1.5">
            <span className="text-blue-500 shrink-0">•</span>
            <span>Add markdown headers and relevant tags</span>
          </li>
        </ul>
        <p className="text-xs pt-1 text-muted-foreground/80">{"Correct formatting = automatic publication ✓"}</p>
      </CardContent>
    </Card>
  )
}
