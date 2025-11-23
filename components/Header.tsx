"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Menu,
  Home,
  Disc,
  GitPullRequest,
  Layout,
  MessageSquare,
  Code,
  Terminal,
  Compass,
  Search,
  Plus,
  ChevronDown,
  CircleDot,
  Inbox,
  Package,
  BookOpen,
  LayoutTemplate,
  Box,
  Star,
} from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  useSearchParams,
  useRouter,
  usePathname,
  useParams,
} from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { ThemeToggle } from "@/components/ThemeToggle";

export function Header() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();

  const currentTab = searchParams.get("tab") || "overview";

  const handleTabChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("tab", value);
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <header className="flex flex-col bg-header-background border-b border-border text-header-foreground">
      <div className="flex items-center gap-4 p-4 ">
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8 border-border bg-transparent text-muted-foreground hover:bg-muted hover:text-foreground"
            >
              <Menu className="h-4 w-4" />
            </Button>
          </SheetTrigger>
          <SheetContent
            side="left"
            className="w-[300px] bg-[#fafafa] dark:bg-[#0d1117] text-header-foreground border-r border-border p-0"
          >
            <div className="flex flex-col h-full">
              <div className="p-4 border-b border-border flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <a
                    href="/"
                    className="w-[32px] h-[32px] rounded-full cursor-pointer"
                  >
                    <svg
                      height="32"
                      aria-hidden="true"
                      viewBox="0 0 24 24"
                      version="1.1"
                      width="32"
                      data-view-component="true"
                      className="fill-foreground rounded-full"
                    >
                      <path d="M12 1C5.923 1 1 5.923 1 12c0 4.867 3.149 8.979 7.521 10.436.55.096.756-.233.756-.522 0-.262-.013-1.128-.013-2.049-2.764.509-3.479-.674-3.699-1.292-.124-.317-.66-1.293-1.127-1.554-.385-.207-.936-.715-.014-.729.866-.014 1.485.797 1.691 1.128.99 1.663 2.571 1.196 3.204.907.096-.715.385-1.196.701-1.471-2.448-.275-5.005-1.224-5.005-5.432 0-1.196.426-2.186 1.128-2.956-.111-.275-.496-1.402.11-2.915 0 0 .921-.288 3.024 1.128a10.193 10.193 0 0 1 2.75-.371c.936 0 1.871.123 2.75.371 2.104-1.43 3.025-1.128 3.025-1.128.605 1.513.221 2.64.111 2.915.701.77 1.127 1.747 1.127 2.956 0 4.222-2.571 5.157-5.019 5.432.399.344.743 1.004.743 2.035 0 1.471-.014 2.654-.014 3.025 0 .289.206.632.756.522C19.851 20.979 23 16.854 23 12c0-6.077-4.922-11-11-11Z"></path>
                    </svg>
                  </a>
                  <span className="font-bold">GitHub</span>
                </div>
              </div>
              <div className="flex-1 overflow-y-auto p-4">
                <nav className="flex flex-col gap-2">
                  <a
                    href="/"
                    className="flex items-center gap-2 px-2 py-1 hover:bg-muted rounded-md text-sm"
                  >
                    <Home className="w-4 h-4" /> Home
                  </a>
                  <a
                    href="/"
                    className="flex items-center gap-2 px-2 py-1 hover:bg-muted rounded-md text-sm"
                  >
                    <Disc className="w-4 h-4" /> Issues
                  </a>
                  <a
                    href="/"
                    className="flex items-center gap-2 px-2 py-1 hover:bg-muted rounded-md text-sm"
                  >
                    <GitPullRequest className="w-4 h-4" /> Pull requests
                  </a>
                  <a
                    href="/"
                    className="flex items-center gap-2 px-2 py-1 hover:bg-muted rounded-md text-sm"
                  >
                    <Layout className="w-4 h-4" /> Projects
                  </a>
                  <a
                    href="/"
                    className="flex items-center gap-2 px-2 py-1 hover:bg-muted rounded-md text-sm"
                  >
                    <MessageSquare className="w-4 h-4" /> Discussions
                  </a>
                  <a
                    href="/"
                    className="flex items-center gap-2 px-2 py-1 hover:bg-muted rounded-md text-sm"
                  >
                    <Code className="w-4 h-4" /> Codespaces
                  </a>
                  <a
                    href="/"
                    className="flex items-center gap-2 px-2 py-1 hover:bg-muted rounded-md text-sm"
                  >
                    <Terminal className="w-4 h-4" /> Copilot
                  </a>
                  <div className="my-2 border-t border-border" />
                  <a
                    href="/"
                    className="flex items-center gap-2 px-2 py-1 hover:bg-muted rounded-md text-sm"
                  >
                    <Compass className="w-4 h-4" /> Explore
                  </a>
                  <a
                    href="/"
                    className="flex items-center gap-2 px-2 py-1 hover:bg-muted rounded-md text-sm"
                  >
                    <Package className="w-4 h-4" /> Marketplace
                  </a>
                </nav>
              </div>
            </div>
          </SheetContent>
        </Sheet>

        <div className="flex items-center gap-4">
          {/* <Github className="w-8 h-8 fill-white" /> */}
          <a href="/" className="w-[32px] h-[32px] rounded-full cursor-pointer">
            <svg
              height="32"
              aria-hidden="true"
              viewBox="0 0 24 24"
              version="1.1"
              width="32"
              data-view-component="true"
              className="fill-foreground rounded-full"
            >
              <path d="M12 1C5.923 1 1 5.923 1 12c0 4.867 3.149 8.979 7.521 10.436.55.096.756-.233.756-.522 0-.262-.013-1.128-.013-2.049-2.764.509-3.479-.674-3.699-1.292-.124-.317-.66-1.293-1.127-1.554-.385-.207-.936-.715-.014-.729.866-.014 1.485.797 1.691 1.128.99 1.663 2.571 1.196 3.204.907.096-.715.385-1.196.701-1.471-2.448-.275-5.005-1.224-5.005-5.432 0-1.196.426-2.186 1.128-2.956-.111-.275-.496-1.402.11-2.915 0 0 .921-.288 3.024 1.128a10.193 10.193 0 0 1 2.75-.371c.936 0 1.871.123 2.75.371 2.104-1.43 3.025-1.128 3.025-1.128.605 1.513.221 2.64.111 2.915.701.77 1.127 1.747 1.127 2.956 0 4.222-2.571 5.157-5.019 5.432.399.344.743 1.004.743 2.035 0 1.471-.014 2.654-.014 3.025 0 .289.206.632.756.522C19.851 20.979 23 16.854 23 12c0-6.077-4.922-11-11-11Z"></path>
            </svg>
          </a>
          <span className="hidden md:inline text-[14px] text-header-foreground">
            {params["userName"] ? params["userName"] : "NA"}
          </span>
        </div>

        <div className="ml-auto flex items-center gap-3">
          <div className="relative hidden md:block">
            <div className="absolute left-2 top-1/2 -translate-y-1/2 text-muted-foreground">
              <Search className="w-4 h-4" />
            </div>
            <Input
              placeholder="Type / to search"
              className="w-[300px] bg-background border-border text-sm h-7 pl-8 text-muted-foreground placeholder:text-muted-foreground focus-visible:ring-1 focus-visible:ring-blue-500 focus-visible:border-blue-500"
            />
            <div className="absolute right-2 top-1/2 -translate-y-1/2 border border-border rounded px-1.5 py-0.5 text-[10px] text-muted-foreground leading-none">
              /
            </div>
          </div>

          <div className="h-4 w-[1px] bg-border mx-1"></div>

          <div className="flex items-center gap-1">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 px-2 text-muted-foreground hover:text-foreground gap-1"
                >
                  <Plus className="w-4 h-4" />
                  <ChevronDown className="w-3 h-3" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem>New repository</DropdownMenuItem>
                <DropdownMenuItem>Import repository</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>New codespace</DropdownMenuItem>
                <DropdownMenuItem>New gist</DropdownMenuItem>
                <DropdownMenuItem>New organization</DropdownMenuItem>
                <DropdownMenuItem>New project</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <ThemeToggle />
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-muted-foreground hover:text-foreground"
            >
              <CircleDot className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-muted-foreground hover:text-foreground"
            >
              <GitPullRequest className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-muted-foreground hover:text-foreground"
            >
              <Inbox className="w-4 h-4" />
            </Button>
            <Avatar className="w-5 h-5 border border-border ml-1">
              <AvatarImage src="https://avatars.githubusercontent.com/u/1234567?v=4" />
              <AvatarFallback>SK</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </div>

      <div className="px-4">
        <Tabs
          value={currentTab}
          onValueChange={handleTabChange}
          className="w-full"
        >
          <TabsList className="bg-transparent h-auto p-0 gap-x-1 w-full justify-start overflow-x-auto">
            <div
              className={` ${
                currentTab === "overview" ? "border-b-2 border-[#f78166]" : ""
              }`}
            >
              <TabsTrigger
                value="overview"
                className="rounded-md border-0 py-1 px-2 gap-2 text-sm text-muted-foreground data-[state=active]:text-foreground hover:bg-accent hover:text-foreground"
              >
                <BookOpen className="w-4 h-4 text-muted-foreground" />
                Overview
              </TabsTrigger>
            </div>
            <div
              className={` ${
                currentTab === "repositories"
                  ? "border-b-2 border-[#f78166]"
                  : ""
              }`}
            >
              <TabsTrigger
                value="repositories"
                className="rounded-md border-0 py-1 px-2 gap-2 text-sm text-muted-foreground data-[state=active]:text-foreground hover:bg-accent hover:text-foreground"
              >
                <Package className="w-4 h-4 text-muted-foreground" />
                Repositories
              </TabsTrigger>
            </div>
            <div
              className={` ${
                currentTab === "projects" ? "border-b-2 border-[#f78166]" : ""
              }`}
            >
              <TabsTrigger
                value="projects"
                className="rounded-md border-0 py-1 px-2 gap-2 text-sm text-muted-foreground data-[state=active]:text-foreground hover:bg-accent hover:text-foreground"
              >
                <LayoutTemplate className="w-4 h-4 text-muted-foreground" />
                Projects
              </TabsTrigger>
            </div>
            <div
              className={` ${
                currentTab === "packages" ? "border-b-2 border-[#f78166]" : ""
              }`}
            >
              <TabsTrigger
                value="packages"
                className="rounded-md border-0 py-1 px-2 gap-2 text-sm text-muted-foreground data-[state=active]:text-foreground hover:bg-accent hover:text-foreground"
              >
                <Box className="w-4 h-4 text-muted-foreground" />
                Packages
              </TabsTrigger>
            </div>
            <div
              className={` ${
                currentTab === "stars" ? "border-b-2 border-[#f78166]" : ""
              }`}
            >
              <TabsTrigger
                value="stars"
                className="rounded-md border-0 py-1 px-2 gap-2 text-sm text-muted-foreground data-[state=active]:text-foreground hover:bg-accent hover:text-foreground"
              >
                <Star className="w-4 h-4 text-muted-foreground" />
                Stars
              </TabsTrigger>
            </div>
          </TabsList>
        </Tabs>
      </div>
    </header>
  );
}
