"use client";

import {
  ContributionCalendar,
  ContributionsCollection,
} from "@/types/contributionTypes";
import { cn } from "@/lib/utils";
import Link from "next/link";
import CalendarHeatmap, {
  ReactCalendarHeatmapValue,
} from "react-calendar-heatmap";
import "react-calendar-heatmap/dist/styles.css";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from "recharts";

interface ContributionGraphProps {
  calendar: ContributionCalendar;
  year: number;
  userName: string;
  contributionsCollection: ContributionsCollection;
}

export function ContributionGraph({
  calendar,
  year,
  userName,
  contributionsCollection,
}: ContributionGraphProps) {
  const currentYear = new Date().getFullYear();
  const years = Array.from(
    { length: currentYear - 2010 + 1 },
    (_, i) => currentYear - i
  );

  // Transform calendar data to heatmap format
  const heatmapValues: ReactCalendarHeatmapValue[] = calendar.weeks.flatMap(
    (week) =>
      week.contributionDays.map((day) => ({
        date: day.date,
        count: day.contributionCount,
      }))
  );

  // Get start and end dates for the year
  const startDate = new Date(year, 0, 1);
  const endDate = new Date(year, 11, 31);

  // Helper to get color class based on contribution count
  const getColorClass = (value: ReactCalendarHeatmapValue | undefined) => {
    if (!value || !value.count) return "color-empty";
    if (value.count <= 3) return "color-scale-1";
    if (value.count <= 6) return "color-scale-2";
    if (value.count <= 9) return "color-scale-3";
    return "color-scale-4";
  };

  // Activity Overview Data
  const {
    totalCommitContributions,
    totalIssueContributions,
    totalPullRequestContributions,
    totalPullRequestReviewContributions,
  } = contributionsCollection;

  const totalActivity =
    totalCommitContributions +
    totalIssueContributions +
    totalPullRequestContributions +
    totalPullRequestReviewContributions;

  const maxVal = Math.max(
    totalCommitContributions,
    totalIssueContributions,
    totalPullRequestContributions,
    totalPullRequestReviewContributions,
    1 // Avoid division by zero
  );

  return (
    <div className="flex flex-col md:flex-row gap-6">
      <div className="flex-1 border border-border rounded-md bg-card text-card-foreground h-fit">
        {/* Contribution Graph Section */}
        <div className="p-4">
          <h2 className="text-base font-normal mb-4">
            {calendar.totalContributions} contributions in {year}
          </h2>

          <div className="overflow-x-auto contribution-heatmap">
            <CalendarHeatmap
              startDate={startDate}
              endDate={endDate}
              values={heatmapValues}
              classForValue={getColorClass}
              tooltipDataAttrs={(
                value: ReactCalendarHeatmapValue | undefined
              ) => {
                if (!value || !value.date) {
                  return {};
                }
                return {
                  "data-tip": `${value.count || 0} contributions on ${
                    value.date
                  }`,
                };
              }}
              showWeekdayLabels={true}
            />
          </div>

          <div className="flex items-center justify-between mt-4 text-xs text-muted-foreground">
            <span className="hover:text-primary cursor-pointer">
              Learn how we count contributions
            </span>
            <div className="flex items-center gap-1">
              <span>Less</span>
              <div className="w-[10px] h-[10px] bg-[#161b22] rounded-[2px]" />
              <div className="w-[10px] h-[10px] bg-[#0e4429] rounded-[2px]" />
              <div className="w-[10px] h-[10px] bg-[#006d32] rounded-[2px]" />
              <div className="w-[10px] h-[10px] bg-[#26a641] rounded-[2px]" />
              <div className="w-[10px] h-[10px] bg-[#39d353] rounded-[2px]" />
              <span>More</span>
            </div>
          </div>
        </div>

        {/* Activity Overview Section */}
        <div className="border-t border-border p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex flex-col justify-center">
            <h3 className="text-base font-normal mb-4">Activity overview</h3>
            <p className="text-sm text-muted-foreground">
              Contributed to{" "}
              {contributionsCollection.totalPullRequestContributions} PRs,
              opened {contributionsCollection.totalIssueContributions} issues
              and committed {contributionsCollection.totalCommitContributions}{" "}
              times.
            </p>
          </div>

          <div className="relative flex items-center justify-center md:border-l md:border-border md:pl-8">
            <div className="h-[300px] w-full max-w-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart
                  margin={{ top: 20, right: 30, bottom: 20, left: 30 }}
                  data={[
                    {
                      category: "Code review",
                      value: totalPullRequestReviewContributions,
                      percentage: Math.round(
                        (totalPullRequestReviewContributions / totalActivity) *
                          100
                      ),
                    },
                    {
                      category: "Issues",
                      value: totalIssueContributions,
                      percentage: Math.round(
                        (totalIssueContributions / totalActivity) * 100
                      ),
                    },
                    {
                      category: "Pull requests",
                      value: totalPullRequestContributions,
                      percentage: Math.round(
                        (totalPullRequestContributions / totalActivity) * 100
                      ),
                    },
                    {
                      category: "Commits",
                      value: totalCommitContributions,
                      percentage: Math.round(
                        (totalCommitContributions / totalActivity) * 100
                      ),
                    },
                  ]}
                >
                  <PolarGrid stroke="#30363d" />
                  <PolarAngleAxis
                    dataKey="category"
                    tick={(props: any) => {
                      const { x, y, payload, index } = props;
                      const data = [
                        {
                          category: "Code review",
                          percentage: Math.round(
                            (totalPullRequestReviewContributions /
                              totalActivity) *
                              100
                          ),
                        },
                        {
                          category: "Issues",
                          percentage: Math.round(
                            (totalIssueContributions / totalActivity) * 100
                          ),
                        },
                        {
                          category: "Pull requests",
                          percentage: Math.round(
                            (totalPullRequestContributions / totalActivity) *
                              100
                          ),
                        },
                        {
                          category: "Commits",
                          percentage: Math.round(
                            (totalCommitContributions / totalActivity) * 100
                          ),
                        },
                      ];

                      const item = data[index];
                      const percentage = item?.percentage || 0;

                      // Position adjustments for labels
                      let xOffset = 0;
                      let yOffset = 0;

                      // Adjust position based on which axis
                      if (index === 0) {
                        // Top (Code review)
                        yOffset = -10;
                      } else if (index === 1) {
                        // Right (Issues)
                        xOffset = 10;
                      } else if (index === 2) {
                        // Bottom (Pull requests)
                        yOffset = 15;
                      } else if (index === 3) {
                        // Left (Commits)
                        xOffset = -10;
                      }

                      return (
                        <g>
                          <text
                            x={x + xOffset}
                            y={y + yOffset}
                            fill="#7d8590"
                            fontSize="12"
                            textAnchor="middle"
                          >
                            {payload.value}
                          </text>
                          {percentage > 0 && (
                            <text
                              x={x + xOffset}
                              y={y + yOffset + 15}
                              fill="#7d8590"
                              fontSize="14"
                              fontWeight="600"
                              textAnchor="middle"
                            >
                              {percentage}%
                            </text>
                          )}
                        </g>
                      );
                    }}
                  />
                  <PolarRadiusAxis
                    angle={90}
                    domain={[0, maxVal]}
                    tick={false}
                    axisLine={false}
                  />
                  <Radar
                    name="Activity"
                    dataKey="value"
                    stroke="#2ea043"
                    fill="rgba(46, 160, 67, 0.3)"
                    fillOpacity={0.6}
                    strokeWidth={2}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-2 min-w-[100px] sticky top-4 h-fit">
        {years.map((y) => (
          <Link
            key={y}
            href={`/${userName}?year=${y}`}
            className={cn(
              "px-4 py-2 text-sm rounded-md transition-colors text-[#9198a1]",
              y === year
                ? "bg-[#1f6feb] text-[#fff]"
                : "hover:bg-button-hover text-button-hover-foreground"
            )}
          >
            {y}
          </Link>
        ))}
      </div>
    </div>
  );
}
