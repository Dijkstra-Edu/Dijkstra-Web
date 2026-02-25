"use client";

import { useSession } from "next-auth/react";
import { queryOptions, useQuery } from "@tanstack/react-query";
import {
  Cell,
  Label,
  Pie,
  PieChart,
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
} from "recharts";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { API_URLS } from "@/lib/api/url-builders";
import type { LeetCodeStatisticsResponse } from "@/types/client/dashboard/leetcode-statistics";
import { getPersonalDetailsByGithubUsername } from "@/services/profile/PersonalDetailsService";

const chartConfig2 = {
  easy: {
    label: "Easy",
    color: "var(--chart-1)",
  },
  medium: {
    label: "Medium",
    color: "var(--chart-2)",
  },
  hard: {
    label: "Hard",
    color: "var(--chart-3)",
  },
} satisfies ChartConfig;

//TODO: Dummy Data, integrate with Gitripper
// GitHub activity: radar chart (percentages). Chart scale: max value = 100 so the highest axis reaches the edge.
const GITHUB_RADAR_GREEN = "#22c55e";

const githubActivityRadarDummy = [
  { subject: "Commits", value: 59, fullMark: 100 },
  { subject: "Pull requests", value: 8, fullMark: 100 },
  { subject: "Issues", value: 16, fullMark: 100 },
  { subject: "Code review", value: 17, fullMark: 100 },
];

const githubActivityRadarMax = Math.max(...githubActivityRadarDummy.map((d) => d.value), 1);
const githubActivityRadarScaled = githubActivityRadarDummy.map((d) => ({
  ...d,
  value: Math.round((d.value / githubActivityRadarMax) * 100),
  fullMark: 100,
}));

const githubTotalsDummy = {
  totalLines: 28450,
  totalCommits: 342,
  totalPullRequests: 89,
  totalIssues: 56,
};

// Contributions grouped by org (square logo) or user (circle logo)
type GitHubContributionGroup =
  | { type: "org"; name: string; logoUrl: string; repos: string[] }
  | { type: "user"; name: string; logoUrl: string; repos: string[] };

const githubRecentContributionsDummy: GitHubContributionGroup[] = [
  {
    type: "org",
    name: "Dijkstra",
    logoUrl: "https://avatars.githubusercontent.com/u/134374171?s=400&u=ac12c70099539da0d44144baa85ef1cd1dd09f42&v=4",
    repos: ["dijkstra-web", "dataforge"],
  },
  {
    type: "org",
    name: "Auto-Mp3",
    logoUrl: "https://avatars.githubusercontent.com/u/146825113?s=400&u=15b4826d3f2f36cd2e5ca5cd5395e796068059c5&v=4",
    repos: ["backend-services", "internal-tooling"],
  },
  {
    type: "org",
    name: "Epic Games",
    logoUrl: "https://avatars.githubusercontent.com/u/6615685?s=200&v=4",
    repos: ["open-source-library"],
  },
  {
    type: "user",
    name: "Your repos",
    logoUrl: "https://avatars.githubusercontent.com/u/70965472?v=4",
    repos: ["my-side-project"],
  },
];

const chartConfigGitHub = {
  value: { label: "Activity %", color: GITHUB_RADAR_GREEN },
} satisfies ChartConfig;

const chartData3 = [
  { item: "GitHub", todo: 2, completed: 5 },
  { item: "Leetcode", todo: 1, completed: 2 },
  { item: "LinkedIn", todo: 10, completed: 10 },
  { item: "Resume", todo: 0, completed: 0 },
  { item: "Project", todo: 2, completed: 2 },
  { item: "Learning", todo: 2, completed: 2 },
];
const chartConfig3 = {
  todo: {
    label: "To Be Completed",
    color: "var(--chart-1)",
  },
  completed: {
    label: "Completed",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig;

export function TasksForTheDayCard() {
  return (
    <Card className="h-full *:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs">
      <CardHeader>
        <CardDescription>Tasks For the Day</CardDescription>
        <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
          17/21 Completed
        </CardTitle>
        <CardAction />
      </CardHeader>
      <CardContent className="pb-0">
        <ChartContainer
          config={chartConfig3}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <RadarChart
            data={chartData3}
            margin={{
              top: 10,
              right: 10,
              bottom: 10,
              left: 10,
            }}
          >
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <PolarAngleAxis
              dataKey="item"
              tick={({ x, y, textAnchor, index, ...props }) => {
                const data = chartData3[index];
                return (
                  <text
                    x={x}
                    y={
                      index === 0
                        ? (typeof y === "number" ? y : 0) - 10
                        : typeof y === "number"
                          ? y
                          : 0
                    }
                    textAnchor={textAnchor}
                    fontSize={13}
                    fontWeight={500}
                    {...props}
                  >
                    <tspan>{data.todo}</tspan>
                    <tspan className="fill-muted-foreground">/</tspan>
                    <tspan>{data.completed}</tspan>
                    <tspan
                      x={x}
                      dy={"1rem"}
                      fontSize={12}
                      className="fill-muted-foreground"
                    >
                      {data.item}
                    </tspan>
                  </text>
                );
              }}
            />
            <PolarGrid />
            <Radar
              dataKey="todo"
              fill="var(--color-desktop)"
              fillOpacity={0.6}
            />
            <Radar dataKey="completed" fill="var(--color-mobile)" />
          </RadarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-1.5 text-sm">
        <div className="line-clamp-1 flex gap-2 font-medium">
          Total Tasks Completed: 17
        </div>
        <div className="text-muted-foreground">
          Total Tasks: 21
        </div>
      </CardFooter>
    </Card>
  );
}

const LEETCODE_COLORS = {
  easy: "#00AF9B",
  medium: "#FFC01E",
  hard: "#EF4743",
} as const;

function transformStatsToPieData(response: LeetCodeStatisticsResponse | undefined): { name: string; value: number; fill: string }[] {
  const ac = response?.leetcode?.profile?.submitStatsGlobal?.acSubmissionNum ?? [];
  const byDiff: Record<string, number> = {};
  for (const item of ac) {
    const key = item.difficulty.toLowerCase();
    if (key === "easy" || key === "medium" || key === "hard") byDiff[key] = item.count;
  }
  return [
    { name: "Easy", value: byDiff.easy ?? 0, fill: LEETCODE_COLORS.easy },
    { name: "Medium", value: byDiff.medium ?? 0, fill: LEETCODE_COLORS.medium },
    { name: "Hard", value: byDiff.hard ?? 0, fill: LEETCODE_COLORS.hard },
  ].filter((d) => d.value > 0);
}

function getLeetcodeTotals(response: LeetCodeStatisticsResponse | undefined) {
  const ac = response?.leetcode?.profile?.submitStatsGlobal?.acSubmissionNum ?? [];
  const byDiff = Object.fromEntries(
    ac.map((item) => [item.difficulty.toLowerCase(), item.count] as const)
  );
  const easy = byDiff.easy ?? 0;
  const medium = byDiff.medium ?? 0;
  const hard = byDiff.hard ?? 0;
  return { easy, medium, hard, total: easy + medium + hard };
}

export function SectionCards() {
  const { data: session } = useSession();
  const githubUsername = session?.user?.login ?? "";

  const { data: personalDetails } = useQuery(queryOptions({
    queryKey: ['personal-details', githubUsername],
    queryFn: () => getPersonalDetailsByGithubUsername(githubUsername),
    enabled: !!githubUsername,
    staleTime: 1000 * 60 * 5, // avoid instant refetch
    gcTime: 1000 * 60 * 30, // keep data cached longer
  }));
  const leetcodeUsername = personalDetails?.leetcodeUserName?.trim() ?? "";

  const { data: statsResponse, isLoading: statsLoading, error: statsError } = useQuery({
    queryKey: ["leetcode-statistics", leetcodeUsername],
    queryFn: async (): Promise<LeetCodeStatisticsResponse> => {
      const res = await fetch(API_URLS.getLeetcodeStatisticsUrl(leetcodeUsername));
      if (!res.ok) throw new Error(`Failed to fetch: ${res.status}`);
      return res.json();
    },
    enabled: !!leetcodeUsername,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 30,
  });

  const pieData = transformStatsToPieData(statsResponse);
  const { easy, medium, hard, total: totalProblems } = getLeetcodeTotals(statsResponse);
  const contestRanking = statsResponse?.leetcode?.contestRanking;
  const badges = statsResponse?.leetcode?.profile?.badges ?? [];

  const hasLeetcodeUsername = !!leetcodeUsername;
  const showLeetcodeChart = hasLeetcodeUsername && !statsLoading && !statsError;
  const hasPieData = pieData.length > 0;

  return (
    <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs @xl/main:grid-cols-2 @5xl/main:grid-cols-4">      
      {/* GitHub activity card */}
      <Card className="flex flex-col @5xl/main:col-span-2">
        <CardHeader className="items-center pb-0">
          <CardTitle>GitHub</CardTitle>
          <CardDescription>Activity & recent contributions</CardDescription>
        </CardHeader>
        <CardContent className="flex min-h-0 flex-1 gap-4 pb-0">
          <div className="flex min-h-0 flex-1 gap-4">
            {/* Left: activity radar + totals */}
            <div className="flex min-w-0 flex-1 flex-col gap-4">
              <div className="flex flex-col items-center gap-3">
                <ChartContainer
                  config={chartConfigGitHub}
                  className="mx-auto aspect-square w-full max-h-[200px] min-h-[160px]"
                >
                  <RadarChart data={githubActivityRadarScaled} margin={{ top: 16, right: 16, bottom: 16, left: 16 }}>
                    <PolarGrid stroke="var(--muted-foreground)" strokeOpacity={0.3} />
                    <PolarAngleAxis
                      dataKey="subject"
                      tick={({ x, y, textAnchor, index, ...props }) => {
                        const point = githubActivityRadarDummy[index];
                        const pct = point?.value ?? 0;
                        const subject = point?.subject ?? "";
                        return (
                          <text
                            x={x}
                            y={y}
                            textAnchor={textAnchor}
                            className="fill-muted-foreground text-xs"
                            {...props}
                          >
                            <tspan className="font-medium fill-foreground">{pct}%</tspan>
                            <tspan dx={4}>{subject}</tspan>
                          </text>
                        );
                      }}
                    />
                    <PolarRadiusAxis angle={90} domain={[0, 100]} tick={false} axisLine={false} />
                    <Radar
                      name="Activity"
                      dataKey="value"
                      stroke={GITHUB_RADAR_GREEN}
                      fill={GITHUB_RADAR_GREEN}
                      fillOpacity={0.35}
                      strokeWidth={1.5}
                    />
                    <ChartTooltip
                      cursor={false}
                      content={<ChartTooltipContent hideLabel />}
                    />
                  </RadarChart>
                </ChartContainer>
              </div>
              <div className="rounded-lg border bg-muted/30 p-3">
                <p className="mb-2 text-xs font-medium text-muted-foreground uppercase tracking-wide">
                  Totals
                </p>
                <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                  <div>
                    <span className="text-muted-foreground">Lines</span>
                    <p className="font-semibold tabular-nums">
                      {githubTotalsDummy.totalLines.toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Commits</span>
                    <p className="font-semibold tabular-nums">
                      {githubTotalsDummy.totalCommits.toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Pull requests</span>
                    <p className="font-semibold tabular-nums">
                      {githubTotalsDummy.totalPullRequests.toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Issues</span>
                    <p className="font-semibold tabular-nums">
                      {githubTotalsDummy.totalIssues.toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <Separator orientation="vertical" className="h-auto self-stretch" />
            <div className="flex flex-col gap-3">
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                Recent contributions
              </p>
              <ul className="flex flex-col gap-4">
                {githubRecentContributionsDummy.map((group, i) => (
                  <li key={i} className="flex gap-3">
                    <div className="shrink-0">
                      <img
                        src={group.logoUrl}
                        alt={group.name}
                        className={
                          group.type === "org"
                            ? "h-8 w-8 rounded-md border border-border object-cover"
                            : "h-8 w-8 rounded-full border border-border object-cover"
                        }
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-medium text-muted-foreground">{group.name}</p>
                      <ul className="mt-1.5 border-l border-muted-foreground/40 pl-2.5 flex flex-col">
                        {group.repos.map((repo, j) => (
                          <li
                            key={j}
                            className="relative flex items-center py-0.5 pl-3 text-sm font-medium before:absolute before:left-0 before:top-1/2 before:h-px before:w-2 before:-translate-y-1/2 before:bg-muted-foreground/50 before:content-['']"
                          >
                            {repo}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex-col gap-1 text-xs text-muted-foreground">
          Commits · Pull requests · Issues · Code review · Orgs & repos
        </CardFooter>
      </Card>

      <Card className="flex flex-col @5xl/main:col-span-2">
        <CardHeader className="items-center pb-0">
          <CardTitle>LeetCode</CardTitle>
          <CardDescription>
            {hasLeetcodeUsername ? "Solved & contest ranking" : "Connect your LeetCode profile"}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-1 flex-col gap-4 pb-0">
          {!hasLeetcodeUsername && (
            <p className="text-center text-sm text-muted-foreground py-6 px-4">
              Add your LeetCode username in profile settings to see your stats here.
            </p>
          )}
          {hasLeetcodeUsername && statsLoading && (
            <div className="flex flex-col gap-4">
              <Skeleton className="mx-auto h-[140px] w-[140px] rounded-full" />
              <div className="grid grid-cols-2 gap-2">
                {[1, 2, 3, 4].map((i) => (
                  <Skeleton key={i} className="h-12 rounded-md" />
                ))}
              </div>
            </div>
          )}
          {hasLeetcodeUsername && statsError && (
            <p className="text-center text-sm text-destructive py-6 px-4">
              Could not load LeetCode stats. Try again later.
            </p>
          )}
          {showLeetcodeChart && (
            <div className="flex min-h-0 flex-1 gap-4">
              {/* Left: donut + contest */}
              <div className="flex min-w-0 flex-1 flex-col gap-4">
                <div className="flex flex-col items-center gap-3">
                  <div className="relative">
                    {hasPieData ? (
                      <ChartContainer
                        config={chartConfig2}
                        className="mx-auto h-[140px] w-[140px]"
                      >
                        <PieChart margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
                          <Pie
                            data={pieData}
                            dataKey="value"
                            nameKey="name"
                            innerRadius={44}
                            outerRadius={56}
                            strokeWidth={2}
                            stroke="var(--card)"
                          >
                            {pieData.map((entry, i) => (
                              <Cell key={i} fill={entry.fill} />
                            ))}
                            <Label
                              content={({ viewBox }) => {
                                if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                                  return (
                                    <text
                                      x={viewBox.cx}
                                      y={viewBox.cy}
                                      textAnchor="middle"
                                      dominantBaseline="middle"
                                      className="fill-foreground text-lg font-semibold tabular-nums"
                                    >
                                      {totalProblems}
                                    </text>
                                  );
                                }
                              }}
                            />
                          </Pie>
                          <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent hideLabel />}
                          />
                        </PieChart>
                      </ChartContainer>
                    ) : (
                      <div className="flex h-[140px] w-[140px] items-center justify-center rounded-full border-2 border-dashed border-muted">
                        <span className="text-muted-foreground text-sm">0</span>
                      </div>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-x-4 gap-y-1 justify-center text-xs">
                    <span className="flex items-center gap-1.5">
                      <span
                        className="h-2.5 w-2.5 rounded-full shrink-0"
                        style={{ backgroundColor: LEETCODE_COLORS.easy }}
                      />
                      Easy {easy}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <span
                        className="h-2.5 w-2.5 rounded-full shrink-0"
                        style={{ backgroundColor: LEETCODE_COLORS.medium }}
                      />
                      Medium {medium}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <span
                        className="h-2.5 w-2.5 rounded-full shrink-0"
                        style={{ backgroundColor: LEETCODE_COLORS.hard }}
                      />
                      Hard {hard}
                    </span>
                  </div>
                </div>
                {contestRanking != null && (
                  <div className="rounded-lg border bg-muted/30 p-3">
                    <p className="mb-2 text-xs font-medium text-muted-foreground uppercase tracking-wide">
                      Contest
                    </p>
                    <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                      <div>
                        <span className="text-muted-foreground">Rating</span>
                        <p className="font-semibold tabular-nums">
                          {contestRanking.rating != null
                            ? Math.round(contestRanking.rating).toLocaleString()
                            : "—"}
                        </p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Attended</span>
                        <p className="font-semibold tabular-nums">
                          {contestRanking.attendedContestsCount != null
                            ? contestRanking.attendedContestsCount.toLocaleString()
                            : "—"}
                        </p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Global rank</span>
                        <p className="font-semibold tabular-nums">
                          {contestRanking.globalRanking != null
                            ? contestRanking.globalRanking.toLocaleString()
                            : "—"}
                        </p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Top</span>
                        <p className="font-semibold tabular-nums">
                          {contestRanking.topPercentage != null
                            ? `${contestRanking.topPercentage.toFixed(1)}%`
                            : "—"}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              {badges.length > 0 && (
                <>
                  <Separator orientation="vertical" className="h-auto self-stretch" />
                  <div className="flex flex-col gap-2">
                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                      Badges
                    </p>
                    <ul className="flex flex-col gap-2">
                      {badges.map((badge, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <img
                            src={badge.icon.startsWith("http") ? badge.icon : `https://leetcode.com${badge.icon}`}
                            alt={badge.hoverText || badge.name}
                            title={badge.hoverText || badge.name}
                            className="h-8 w-8 shrink-0 rounded object-contain"
                          />
                          <span className="line-clamp-2 text-xs text-muted-foreground" title={badge.hoverText || badge.name}>
                            {badge.hoverText || badge.name}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </>
              )}
            </div>
          )}
        </CardContent>
        {showLeetcodeChart && (
          <CardFooter className="flex-col gap-1 text-xs text-muted-foreground">
            Accepted submissions by difficulty · Contest ranking from LeetCode
          </CardFooter>
        )}
      </Card>
      
    </div>
  );
}
