// Career path card component

import { Badge } from "@/components/ui/badge";
import { CAREER_PATHS, type CareerPathKey } from "@/data/career-paths";

interface CareerPathCardProps {
  pathKey: CareerPathKey;
  isPrimary?: boolean;
  isSecondary?: boolean;
  onClick: () => void;
  showBadge?: boolean;
  displayMode?: boolean;
}

export function CareerPathCard({
  pathKey,
  isPrimary = false,
  isSecondary = false,
  onClick,
  showBadge = true,
  displayMode = false,
}: CareerPathCardProps) {
  const path = CAREER_PATHS[pathKey];

  return (
    <div
      className={`${displayMode ? 'w-32 h-40 p-4' : 'w-auto h-auto p-3'} rounded-xl border-2 cursor-pointer transition-all duration-300 hover:scale-105 ${
        displayMode
          ? `bg-gradient-to-br ${path.gradient} border-white/20 ${isPrimary ? 'shadow-2xl ring-2 ring-white/50' : 'shadow-lg'} backdrop-blur-sm`
          : isPrimary
          ? "border-primary bg-primary/10 ring-2 ring-primary/50"
          : isSecondary
          ? "border-blue-500 bg-blue-500/10 ring-2 ring-blue-500/50"
          : "border-white/20 hover:border-white/40 hover:bg-white/5"
      }`}
      onClick={onClick}
    >
      <div className="text-center h-full flex flex-col justify-between">
        <div>
          <div className={`${displayMode ? 'w-12 h-12' : 'w-12 h-12'} mx-auto mb-3 rounded-2xl ${displayMode ? 'bg-white/30 backdrop-blur-sm border border-white/30' : `bg-gradient-to-br ${path.gradient}`} flex items-center justify-center p-2 shadow-lg`}>
            <img 
              src={`/${path.icon}`} 
              alt={path.label}
              className="w-full h-full object-contain filter drop-shadow-sm"
              onError={(e) => {
                // Fallback to shortLabel if image doesn't exist
                e.currentTarget.style.display = 'none';
                const parent = e.currentTarget.parentElement;
                if (parent) {
                  const span = document.createElement('span');
                  span.className = `text-white ${displayMode ? 'text-xs font-bold' : 'text-xs font-bold'}`;
                  span.textContent = path.shortLabel;
                  parent.appendChild(span);
                }
              }}
            />
          </div>
          <h4 className={`${displayMode ? 'text-xs font-medium' : 'text-[10px] font-medium'} ${displayMode ? 'text-white drop-shadow-sm' : 'text-foreground'} mb-2 leading-tight px-1 break-words`}>
            {path.label}
          </h4>
        </div>
        
        {/* Selection Indicators */}
        {showBadge && (isPrimary || isSecondary) && (
          <div className="flex justify-center mt-auto">
            {isPrimary && (
              <Badge variant="default" className={`text-[10px] font-semibold px-2 py-0.5 ${displayMode ? 'bg-white/50 text-white border-white/70 shadow-lg backdrop-blur-sm' : 'bg-primary'}`}>
                ⭐ Primary
              </Badge>
            )}
            {isSecondary && (
              <Badge variant="secondary" className={`text-[10px] font-semibold px-2 py-0.5 ${displayMode ? 'bg-white/40 text-white border-white/50 shadow-md backdrop-blur-sm' : 'bg-blue-500/20 text-blue-600'}`}>
                Secondary
              </Badge>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
