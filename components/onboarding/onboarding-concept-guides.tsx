import { ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ONBOARDING_CONCEPT_GUIDES, OnboardingGuideKey } from "@/constants/onboarding.constants";
import { VS_CODE_DOWNLOAD } from "@/constants/onboarding.constants";

/**
 * Central place for “New to this?” / guide links. Import these in step content.
 * Paths resolve under /onboarding/guides (re-exporting onboarding-old content).
 */

export function VsCodeDownloadLink() {
  return (
    <div className="text-center">
      <Button variant="default" size="sm" className="bg-blue-500 border-white/20 hover:bg-blue-600" asChild>
        <a href={VS_CODE_DOWNLOAD} target="_blank" rel="noopener noreferrer">
          <ExternalLink className="mr-2 size-4" />
          Download VS Code
        </a>
      </Button>
    </div>
  );
}

interface NewToConceptLinkProps {
  guideKey: OnboardingGuideKey;
  step: number;
  className?: string;
}

/**
 * “New to X?” row with link to the full guide page (returns with ?step= for resume).
 */
export function NewToConceptLink({ guideKey, step, className }: NewToConceptLinkProps) {
  const g = ONBOARDING_CONCEPT_GUIDES[guideKey];
  return (
    <div className={`text-center ${className ?? ""}`}>
      <p className="mb-2 text-xs text-muted-foreground">New to this concept?</p>
      <Button variant="ghost" size="sm" className="border border-white/20" asChild>
        <a href={`${g.href}?step=${step}`}>
          <ExternalLink className="mr-2 size-4" />
          {g.label}
        </a>
      </Button>
    </div>
  );
}
