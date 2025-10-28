// Shared error components for profile sections

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertTriangle, RefreshCw } from "lucide-react";

interface SectionErrorProps {
  error: Error;
  onRetry?: () => void;
  title?: string;
}

export function PersonalDetailsError({ error, onRetry, title = "Personal Details" }: SectionErrorProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2 text-red-600">
          <AlertTriangle className="w-5 h-5" />
          <span className="font-medium">Error loading {title}</span>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-4">{error.message}</p>
        {onRetry && (
          <Button variant="outline" size="sm" onClick={onRetry}>
            <RefreshCw className="w-4 h-4 mr-2" />
            Retry
          </Button>
        )}
      </CardContent>
    </Card>
  );
}

export function GenericSectionError({ error, onRetry, title = "Section" }: SectionErrorProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2 text-red-600">
          <AlertTriangle className="w-5 h-5" />
          <span className="font-medium">Error loading {title}</span>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-4">{error.message}</p>
        {onRetry && (
          <Button variant="outline" size="sm" onClick={onRetry}>
            <RefreshCw className="w-4 h-4 mr-2" />
            Retry
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
