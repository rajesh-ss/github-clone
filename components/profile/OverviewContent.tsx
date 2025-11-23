import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ContributionGraph } from "./ContributionGraph";
import { apiClient, graphqlAPI } from "@/lib/api/client";
import { ContributionGraphResponse } from "@/types/contributionTypes";
import { userRepoType } from "@/types/userTypes";
import { API_ENDPOINTS } from "@/lib/api/config";
import Link from "next/link";
import { Lock } from "lucide-react";
import { Button } from "@/components/ui/button";

const pinnedRepos = [
  {
    name: "Complete-Python-3-Bootcamp",
    description: "Course Files for Complete Python 3 Bootcamp Course on Udemy",
    language: "Jupyter Notebook",
    color: "#DA5B0B",
    stars: 0,
    forks: 0,
    isFork: true,
    forkedFrom: "Pierian-Data/Complete-Python-3-Bootcamp",
  },
  {
    name: "flutter_login_ui",
    description: "https://youtu.be/p1qVokFh7uI",
    language: "Dart",
    color: "#00B4AB",
    stars: 0,
    forks: 0,
    isFork: true,
    forkedFrom: "MarcusNg/flutter_login_ui",
  },
  {
    name: "gitignore",
    description: "A collection of useful .gitignore templates",
    language: null,
    color: null,
    stars: 0,
    forks: 0,
    isFork: true,
    forkedFrom: "github/gitignore",
  },
  {
    name: "node-opcua-logger",
    description: "An OPCUA Client for logging data to InfluxDB! 🚀 🏭",
    language: "JavaScript",
    color: "#f1e05a",
    stars: 0,
    forks: 0,
    isFork: true,
    forkedFrom: "cmseaton/node-opcua-logger",
  },
  {
    name: "kafkajs",
    description: "A modern Apache Kafka client for node.js",
    language: "JavaScript",
    color: "#f1e05a",
    stars: 0,
    forks: 0,
    isFork: true,
    forkedFrom: "tulios/kafkajs",
  },
  {
    name: "node-opcua-1",
    description:
      "an implementation of a OPC UA stack fully written in javascript and nodejs - http://node-opcua.github.io/",
    language: "TypeScript",
    color: "#2b7489",
    stars: 0,
    forks: 0,
    isFork: true,
    forkedFrom: "node-opcua/node-opcua",
  },
];

const contributionQuery = `
    query($userName: String!, $from: DateTime!, $to: DateTime!) {
      user(login: $userName) {
        contributionsCollection(from: $from, to: $to) {
          totalCommitContributions
          totalIssueContributions
          totalPullRequestContributions
          totalPullRequestReviewContributions
          contributionCalendar {
            totalContributions
            weeks {
              contributionDays {
                date
                contributionCount
              }
            }
          }
        }
      }
    }
  `;

const colorsForLanguage = {
  JavaScript: "#f1e05a",
  TypeScript: "#3178c6",
  Python: "#DA5B0B",
  Go: "#00ADD8",
  Java: "#b07219",
  "Jupyter Notebook": "#DA5B0B",
  Dart: "#00B4AB",
  HTML: "#e34c26",
  XSLT: "#EB8CEB",
  CSS: "#663399",
};

export async function OverviewContent({
  userName,
  year,
}: {
  userName: string;
  year?: number;
}) {
  const currentYear = new Date().getFullYear();
  const selectedYear = year || currentYear;
  let userRepos;

  const from = `${selectedYear}-01-01T00:00:00Z`;
  const to = `${selectedYear}-12-31T23:59:59Z`;

  const contributionData = await graphqlAPI<ContributionGraphResponse>(
    contributionQuery,
    {
      userName,
      from,
      to,
    }
  );

  try {
    const filter = `sort=stars&direction=asc&per_page=10&page=1`;
    userRepos = await apiClient.get<userRepoType>(
      API_ENDPOINTS.userRepos(userName, filter)
    );
  } catch (error: any) {
    console.log(error);
  }

  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-between items-center">
        <h2 className="text-md font-normal">Popular repositories</h2>
        <span className="text-xs text-muted-foreground cursor-pointer hover:text-primary">
          Customize your pins
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {userRepos?.data && userRepos?.data?.length === 0 ? (
          <>No Data</>
        ) : (
          <>
            {userRepos?.data?.map((repo) => (
              <Card key={repo.name} className="bg-card border-border h-full">
                <CardContent className="p-4 flex flex-col h-full justify-between">
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center justify-between">
                      {repo.html_url && (
                        <a
                          href={repo.html_url}
                          target="_blank"
                          className="font-bold text-fgColoraccent hover:underline text-sm truncate"
                        >
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger>
                                {repo.name}
                                {/* <Button variant="outline"> {repo.name}</Button> */}
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>{repo.full_name}</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </a>
                      )}

                      <Badge
                        variant="outline"
                        className="text-[10px] font-normal text-muted-foreground border-border rounded-full px-2"
                      >
                        {repo?.owner?.user_view_type
                          ? repo?.owner?.user_view_type
                          : "NA"}
                      </Badge>
                    </div>
                    {repo.fork && repo?.forks_url && (
                      <span className="text-xs text-muted-foreground truncate">
                        Forked from{" "}
                        <Link
                          className="underline"
                          href={`${repo.forks_url}`}
                          target="_blank"
                        >
                          {repo.forks_url?.split("/")?.slice(-2)}
                        </Link>
                      </span>
                    )}
                    {repo?.description && (
                      <p className="text-xs text-muted-foreground line-clamp-2 mt-1">
                        {repo?.description}
                      </p>
                    )}
                  </div>
                  <div className="flex items-center gap-4 mt-4 text-xs text-muted-foreground">
                    {repo.language && (
                      <div className="flex items-center gap-1">
                        <span
                          className="w-3 h-3 rounded-full"
                          style={{
                            backgroundColor: colorsForLanguage[
                              repo.language as keyof typeof colorsForLanguage
                            ] as string,
                          }}
                        ></span>
                        <span>{repo.language}</span>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </>
        )}
      </div>

      <div className="mt-6">
        {/* <ContributionCalendar /> */}
        <ContributionGraph
          calendar={
            contributionData.data.user.contributionsCollection
              .contributionCalendar
          }
          year={selectedYear}
          userName={userName}
          contributionsCollection={
            contributionData.data.user.contributionsCollection
          }
        />
      </div>

      <div className="mt-8">
        <h2 className="text-base font-normal mb-4">Contribution activity</h2>

        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-4">
            <span className="text-xs font-semibold min-w-fit">
              May {selectedYear}
            </span>
            <div className="h-[1px] bg-border w-full" />
          </div>

          <div className="flex gap-4 ml-4 relative pb-4">
            {/* Vertical Line */}
            <div className="absolute left-[15px] top-[-16px] bottom-0 w-[2px] bg-border -z-10" />

            <div className="flex items-center gap-3 mt-2">
              <div className="bg-muted p-2 rounded-full border border-border">
                <Lock className="w-4 h-4 text-muted-foreground" />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-medium">
                  {
                    contributionData.data.user.contributionsCollection
                      .contributionCalendar.totalContributions
                  }{" "}
                  contributions in private repositories
                </span>
                <span className="text-xs text-muted-foreground">
                  May 1 – May 31
                </span>
              </div>
            </div>
          </div>
        </div>

        <Button
          variant="outline"
          className="w-full mt-4 text-primary hover:text-primary"
        >
          Show more activity
        </Button>
      </div>
    </div>
  );
}
