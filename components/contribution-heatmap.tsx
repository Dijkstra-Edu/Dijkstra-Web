"use client";

import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import CalendarHeatmap from "react-calendar-heatmap";
import type ReactCalendarHeatmapNS from "react-calendar-heatmap";
import { Tooltip as ReactTooltip } from "react-tooltip";
import { useFetchGithubCommitDataByDateRange } from "@/hooks/gitripper/use-fetch-commit-data";
import { getYearRange } from "@/lib/utils";

export function ContributionHeatmap() {
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  type HeatmapValue = { date: Date; count?: number };
  const { startDate, endDate } = getYearRange(currentYear)
  const { data, isLoading, isError } = useFetchGithubCommitDataByDateRange(startDate, endDate)

  const yearData: HeatmapValue[] =
  data?.map((d: any) => ({
    date: new Date(d.date),
    count: d.Github,
  })) ?? []

  const totalContributions = yearData.reduce((sum, day) => sum + (day.count || 0), 0);

  const goToPreviousYear = () => {
    setCurrentYear(currentYear - 1);
  };

  const goToNextYear = () => {
    const currentYearActual = new Date().getFullYear();
    if (currentYear < currentYearActual) {
      setCurrentYear(currentYear + 1);
    }
  };

  const canGoNext = () => {
    return currentYear < new Date().getFullYear();
  };

  const getClassForValue = (value?: HeatmapValue) => {
    if (!value || !value.count) {
      return "color-empty";
    }
    if (value.count === 1) return "color-scale-1";
    if (value.count === 2) return "color-scale-2";
    if (value.count === 3) return "color-scale-3";
    return "color-scale-4";
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Contribution Activity</CardTitle>
          <h3 className="text-lg font-semibold">{currentYear}</h3>
          <Badge variant="secondary">
            {totalContributions} contributions in {currentYear}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="">
          <div className="contribution-heatmap">
            {isLoading ? (
            <div className="text-center py-10 text-muted-foreground">
              Loading contributions...
            </div>
          ) : isError ? (
            <div className="text-center py-10 text-red-500">
              Failed to load GitHub data
            </div>
          ) : (
              <CalendarHeatmap
              startDate={new Date(currentYear, 0, 1)}
              endDate={new Date(currentYear, 11, 31)}
              values={yearData}
              classForValue={getClassForValue}
              showWeekdayLabels={true}
              showMonthLabels={true}
              weekdayLabels={["S", "M", "T", "W", "T", "F", "S"]}
              tooltipDataAttrs={(value) => ({
                "data-tooltip-id": "calendar-tooltip",
                "data-tooltip-content": value?.date
                  ? `${(value.date as Date).toDateString()}: ${((value as any)?.count || 0)} contributions`
                  : "No contributions",
              }) as ReactCalendarHeatmapNS.TooltipDataAttrs}
            />
       )}
            
          </div>

          <ReactTooltip id="calendar-tooltip" />
          {/* <div className="flex items-center justify-between">
            <Button
              variant="outline"
              size="sm"
              onClick={goToPreviousYear}
              className="flex items-center gap-2 bg-transparent"
            >
              <ChevronLeft className="w-4 h-4" />
              {currentYear - 1}
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              onClick={goToNextYear}
              disabled={!canGoNext()}
              className="flex items-center gap-2 bg-transparent"
            >
              {currentYear + 1}
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div> */}
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            {/* <span>Less</span> */}
            <Button
              variant="outline"
              size="sm"
              onClick={goToPreviousYear}
              className="flex items-center gap-2 bg-transparent"
            >
              <ChevronLeft className="w-4 h-4" />
              {currentYear - 1}
            </Button>
            <div className="flex items-center gap-1">
              <div className="w-2.5 h-2.5 rounded-sm bg-[#ebedf0]" />
              <div className="w-2.5 h-2.5 rounded-sm bg-[#9be9a8]" />
              <div className="w-2.5 h-2.5 rounded-sm bg-[#40c463]" />
              <div className="w-2.5 h-2.5 rounded-sm bg-[#30a14e]" />
              <div className="w-2.5 h-2.5 rounded-sm bg-[#216e39]" />
            </div>
            {/* <span>More</span> */}
            <Button
              variant="outline"
              size="sm"
              onClick={goToNextYear}
              disabled={!canGoNext()}
              className="flex items-center gap-2 bg-transparent"
            >
              {currentYear + 1}
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <style jsx>{`
          .contribution-heatmap :global(.react-calendar-heatmap) {
            font-size: 10px;
          }

          /* Remove outlines by setting stroke to match fill */
          // .contribution-heatmap :global(.react-calendar-heatmap rect) {
          //   stroke: #ebedf0;
          //   stroke-width: 1px;
          //   rx: 2;
          //   ry: 2;
          //   cursor: pointer;
          // }

          /* Light mode */
          .contribution-heatmap :global(.react-calendar-heatmap .color-empty) {
            fill: #ebedf0;
          }

          .contribution-heatmap
            :global(.react-calendar-heatmap .color-scale-1) {
            fill: #9be9a8;
          }

          .contribution-heatmap
            :global(.react-calendar-heatmap .color-scale-2) {
            fill: #40c463;
          }

          .contribution-heatmap
            :global(.react-calendar-heatmap .color-scale-3) {
            fill: #30a14e;
          }

          .contribution-heatmap
            :global(.react-calendar-heatmap .color-scale-4) {
            fill: #216e39;
          }

          /* Dark mode */
          @media (prefers-color-scheme: dark) {
            .contribution-heatmap :global(.react-calendar-heatmap rect) {
              stroke: #161b22;
            }

            .contribution-heatmap
              :global(.react-calendar-heatmap .color-empty) {
              fill: #161b22;
            }

            .contribution-heatmap
              :global(.react-calendar-heatmap .color-scale-1) {
              fill: #0e4429;
            }

            .contribution-heatmap
              :global(.react-calendar-heatmap .color-scale-2) {
              fill: #006d32;
            }

            .contribution-heatmap
              :global(.react-calendar-heatmap .color-scale-3) {
              fill: #26a641;
            }

            .contribution-heatmap
              :global(.react-calendar-heatmap .color-scale-4) {
              fill: #39d353;
            }
          }

          .contribution-heatmap :global(.react-calendar-heatmap-weekday-label) {
            font-size: 9px;
            fill: #656d76;
          }

          .contribution-heatmap :global(.react-calendar-heatmap-month-label) {
            font-size: 10px;
            fill: #656d76;
          }
        `}</style>
      </CardContent>
    </Card>
  );
}
