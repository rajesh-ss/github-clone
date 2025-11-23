import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star } from "lucide-react";
import { apiClient } from "@/lib/api/client";
import { userRepoType } from "@/types/userTypes";
import { API_ENDPOINTS } from "@/lib/api/config";

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
export async function RepositoryList({ userName }: { userName: string }) {
  let userRepos;

  try {
    const filter = `sort=stars&direction=asc&per_page=10&page=1`;
    userRepos = await apiClient.get<userRepoType>(
      API_ENDPOINTS.userRepos(userName, filter)
    );
  } catch (error: any) {
    console.log(error);
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-2 flex-wrap border-b border-border pb-4">
        <Input
          placeholder="Find a repository..."
          className="w-full md:w-[300px]"
          // value={search}
          //   onChange={(e) => setSearch(e.target.value)}
        />
        <Button variant="secondary">Type</Button>
        <Button variant="secondary">Language</Button>
        <Button variant="secondary">Sort</Button>
      </div>

      <div className="flex flex-col gap-4 ">
        {userRepos?.data &&
          userRepos?.data.map((repo) => (
            <div key={repo.id} className="border-b border-border">
              <div className="py-6 flex justify-between items-start">
                <div className="flex flex-col gap-2 w-3/4">
                  <div className="flex items-center gap-2">
                    {repo.html_url && (
                      <a
                        href={repo.html_url}
                        target="_blank"
                        className="text-xl font-bold text-primary hover:underline"
                      >
                        {repo.name}
                      </a>
                    )}

                    <Badge
                      variant="outline"
                      className="text-xs font-normal text-muted-foreground border-border rounded-full px-2"
                    >
                      {repo.private ? "Private" : "Public"}
                    </Badge>
                  </div>
                  {repo.fork && (
                    <div className="text-xs text-muted-foreground">
                      Forked from{" "}
                      <a href="#" className="hover:underline">
                        {repo.forks_url}
                      </a>
                    </div>
                  )}
                  <p className="text-sm text-muted-foreground mt-1">
                    {repo.description}
                  </p>
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
                    {repo.stargazers_count && repo.stargazers_count > 0 && (
                      <div className="flex items-center gap-1 hover:text-primary cursor-pointer">
                        <Star className="w-4 h-4" />
                        <span>{repo.stargazers_count}</span>
                      </div>
                    )}
                    {repo.license && (
                      <span className="flex items-center gap-1">
                        <svg
                          aria-hidden="true"
                          height="16"
                          viewBox="0 0 16 16"
                          version="1.1"
                          width="16"
                          data-view-component="true"
                          className="octicon octicon-law mr-1 fill-foreground"
                        >
                          <path d="M8.75.75V2h.985c.304 0 .603.08.867.231l1.29.736c.038.022.08.033.124.033h2.234a.75.75 0 0 1 0 1.5h-.427l2.111 4.692a.75.75 0 0 1-.154.838l-.53-.53.529.531-.001.002-.002.002-.006.006-.006.005-.01.01-.045.04c-.21.176-.441.327-.686.45C14.556 10.78 13.88 11 13 11a4.498 4.498 0 0 1-2.023-.454 3.544 3.544 0 0 1-.686-.45l-.045-.04-.016-.015-.006-.006-.004-.004v-.001a.75.75 0 0 1-.154-.838L12.178 4.5h-.162c-.305 0-.604-.079-.868-.231l-1.29-.736a.245.245 0 0 0-.124-.033H8.75V13h2.5a.75.75 0 0 1 0 1.5h-6.5a.75.75 0 0 1 0-1.5h2.5V3.5h-.984a.245.245 0 0 0-.124.033l-1.289.737c-.265.15-.564.23-.869.23h-.162l2.112 4.692a.75.75 0 0 1-.154.838l-.53-.53.529.531-.001.002-.002.002-.006.006-.006.005-.01.01-.045.04c-.21.176-.441.327-.686.45C4.556 10.78 3.88 11 3 11a4.498 4.498 0 0 1-2.023-.454 3.544 3.544 0 0 1-.686-.45l-.045-.04-.016-.015-.006-.006-.004-.004v-.001a.75.75 0 0 1-.154-.838L2.178 4.5H1.75a.75.75 0 0 1 0-1.5h2.234a.249.249 0 0 0 .125-.033l1.288-.737c.265-.15.564-.23.869-.23h.984V.75a.75.75 0 0 1 1.5 0Zm2.945 8.477c.285.135.718.273 1.305.273s1.02-.138 1.305-.273L13 6.327Zm-10 0c.285.135.718.273 1.305.273s1.02-.138 1.305-.273L3 6.327Z"></path>
                        </svg>
                        {repo.license.name}
                      </span>
                    )}
                    <span>Updated on {repo.updated_at?.split("T")[0]}</span>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <Button variant="secondary" size="sm" className="gap-2">
                    <Star className="w-4 h-4" /> Star
                  </Button>
                </div>
              </div>
              {/* {index < userRepos?.data.length - 1 && <Separator />} */}
            </div>
          ))}
      </div>
    </div>
  );
}
