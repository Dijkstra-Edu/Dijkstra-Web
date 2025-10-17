// Test Scores Display Component

import { Badge } from "@/components/ui/badge";
import { Calendar, Award } from "lucide-react";
import type { TestScoresData } from "@/types/client/profile-section/profile-sections";

interface TestScoresDisplayProps {
  data: TestScoresData[];
}

export function TestScoresDisplay({ data }: TestScoresDisplayProps) {
  if (!data || data.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        No test scores added yet
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {data.map((testScore) => (
        <div key={testScore.id} className="border rounded-lg p-6 space-y-4">
          {/* Header */}
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h5 className="text-lg font-semibold">{testScore.title}</h5>
                <Badge variant="secondary">
                  {testScore.type}
                </Badge>
              </div>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Award className="w-4 h-4" />
                  Score: {testScore.score}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {new Date(testScore.testDate).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>

          {/* Description */}
          {testScore.description && (
            <p className="text-muted-foreground">{testScore.description}</p>
          )}
        </div>
      ))}
    </div>
  );
}
