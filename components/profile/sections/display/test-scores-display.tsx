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

  const parseScore = (scoreString: string) => {
    // Try to parse score format like "1520/1600" or "3.8/4.0"
    const parts = scoreString.split('/');
    if (parts.length === 2) {
      return {
        score: parts[0].trim(),
        maxScore: parts[1].trim()
      };
    }
    // If no slash, assume it's just the score
    return {
      score: scoreString,
      maxScore: "N/A"
    };
  };

  const getScoreBadgeLabel = (type: string) => {
    switch (type) {
      case 'GRE':
      case 'GMAT':
        return 'Standardized Test';
      case 'CGPA':
        return 'Academic Score';
      case 'TENTH':
      case 'TWELFTH':
        return 'Grade Score';
      default:
        return 'Test Score';
    }
  };

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("en-US", { year: "numeric", month: "long" });
    } catch {
      return dateString;
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        {data.map((testScore) => {
          const { score, maxScore } = parseScore(testScore.score);
          
          return (
            <div key={testScore.id} className="border rounded-lg p-4 space-y-4">
              {/* Header with badge */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold text-lg">{testScore.title}</h4>
                  <Badge variant="secondary">
                    {getScoreBadgeLabel(testScore.type)}
                  </Badge>
                </div>

                {/* Large score display */}
                <div className="flex items-center gap-4">
                  <div className="text-2xl font-bold text-primary">
                    {score}
                    <span className="text-sm text-muted-foreground font-normal">/{maxScore}</span>
                  </div>
                  <div className="text-sm text-muted-foreground flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {formatDate(testScore.testDate)}
                  </div>
                </div>
              </div>

              {/* Section scores placeholder */}
              <div className="space-y-2">
                <h5 className="font-medium text-sm">Section Scores:</h5>
                <p className="text-sm text-muted-foreground">No section details available</p>
              </div>

              {/* Description */}
              {testScore.description && (
                <div className="space-y-2">
                  <h5 className="font-medium text-sm">Description:</h5>
                  <p className="text-sm text-muted-foreground">{testScore.description}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
