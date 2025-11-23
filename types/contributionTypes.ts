export type ContributionDay = {
  date: string;
  contributionCount: number;
  color?: string; // GitHub API usually returns color, but the user's query didn't include it. We might need to infer or add it if possible, but for now sticking to the query.
};

export type ContributionWeek = {
  contributionDays: ContributionDay[];
};

export type ContributionCalendar = {
  totalContributions: number;
  weeks: ContributionWeek[];
};

export type ContributionsCollection = {
  contributionCalendar: ContributionCalendar;
  totalCommitContributions: number;
  totalIssueContributions: number;
  totalPullRequestContributions: number;
  totalPullRequestReviewContributions: number;
};

export type UserContributions = {
  user: {
    contributionsCollection: ContributionsCollection;
  };
};

export type ContributionGraphResponse = {
  data: UserContributions;
};
