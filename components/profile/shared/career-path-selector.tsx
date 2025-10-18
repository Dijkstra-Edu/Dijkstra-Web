// Career path selector component

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { X } from "lucide-react";
import { CareerPathCard } from "./career-path-card";
import { CAREER_PATHS, type CareerPathKey } from "@/data/career-paths";
import { groupCareerPathsByFaction } from "@/lib/profile/profile-utils";

interface CareerPathSelectorProps {
  type: 'primary' | 'secondary';
  selectedPath: CareerPathKey;
  selectedPaths: CareerPathKey[];
  onSelect: (pathKey: CareerPathKey) => void;
  onClose: () => void;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CareerPathSelector({
  type,
  selectedPath,
  selectedPaths,
  onSelect,
  onClose,
  isOpen,
  onOpenChange,
}: CareerPathSelectorProps) {
  const [pathSelectionOpen, setPathSelectionOpen] = useState<'primary' | 'secondary' | null>(null);

  const handlePathSelection = (pathKey: CareerPathKey) => {
    onSelect(pathKey);
    onClose();
  };

  const groupedPaths = groupCareerPathsByFaction(CAREER_PATHS);

  return (
    <Popover
      open={isOpen && pathSelectionOpen === type}
      onOpenChange={(open) => {
        onOpenChange(open);
        setPathSelectionOpen(open ? type : null);
      }}
    >
      <PopoverTrigger asChild>
        <div className="w-24 h-24 cursor-pointer">
          <CareerPathCard
            pathKey={selectedPath}
            isPrimary={type === 'primary'}
            onClick={() => setPathSelectionOpen(type)}
            showBadge={false}
          />
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-[600px] p-4 max-h-[600px] overflow-y-auto">
        <h4 className="font-medium mb-4">
          {type === 'primary' ? 'Select Primary Career Path' : 'Add Secondary Career Path'}
        </h4>
        <div className="space-y-4">
          {Object.entries(groupedPaths).map(([faction, paths]) => {
            const factionGradient = paths[0][1].gradient;
            
            return (
              <div key={faction} className="space-y-2">
                {/* Faction Header */}
                <div className={`flex items-center gap-2 pb-1 border-b border-border`}>
                  <div className={`w-1 h-4 rounded-full bg-gradient-to-b ${factionGradient}`}></div>
                  <h5 className="text-sm font-semibold">{faction}</h5>
                  <span className="text-xs text-muted-foreground">({paths.length})</span>
                </div>
                
                {/* Faction Paths Grid */}
                <div className="grid grid-cols-5 gap-2">
                  {paths
                    .filter(([key]) => {
                      if (type === 'primary') return true;
                      return key !== selectedPath && !selectedPaths.includes(key as CareerPathKey);
                    })
                    .map(([key, path]) => (
                      <CareerPathCard
                        key={key}
                        pathKey={key as CareerPathKey}
                        isPrimary={type === 'primary' && selectedPath === key}
                        onClick={() => handlePathSelection(key as CareerPathKey)}
                        showBadge={false}
                      />
                    ))}
                </div>
              </div>
            );
          })}
        </div>
      </PopoverContent>
    </Popover>
  );
}
