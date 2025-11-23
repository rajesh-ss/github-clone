import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Star, ChevronDown } from "lucide-react"

export function StarsContent() {
    const starredRepos = [
        {
            name: "timescale / pgvectorscale",
            description: "A complement to pgvector for high performance, cost efficient vector search on large workloads",
            language: "Rust",
            stars: "7,428",
            forks: "113",
            updated: "Updated 3 weeks ago"
        },
        {
            name: "protectwise / troika",
            description: "A JavaScript framework for interactive 3D and 2D visualizations",
            language: "JavaScript",
            stars: "1,867",
            forks: "147",
            updated: "Updated on Sep 10"
        },
        {
            name: "bbc / peaks.js",
            description: "JavaScript UI component for interacting with audio waveforms",
            language: "JavaScript",
            stars: "3,355",
            forks: "288",
            updated: "Updated 2 weeks ago"
        },
        {
            name: "github / gitignore",
            description: "A collection of useful .gitignore templates",
            stars: "170,037",
            forks: "82,007",
            updated: "Updated 5 days ago"
        },
        {
            name: "node-opcua / node-opcua",
            description: "Unlocking the Full Potential of OPC UA with Typescript and NodeJS - http://node-opcua.github.io/",
            language: "TypeScript",
            stars: "1,590",
            forks: "502",
            updated: "Updated 4 days ago"
        }
    ]

    return (
        <div className="mt-6">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">Stars</h2>
            </div>

            <div className="flex flex-col md:flex-row gap-4 mb-6">
                <div className="flex-1 relative">
                    <Input
                        placeholder="Search stars"
                        className="bg-[#0d1117] border-[#30363d] text-white placeholder:text-muted-foreground pl-3"
                    />
                    <Button className="absolute right-0 top-0 h-full rounded-l-none border-l border-[#30363d] bg-[#21262d] hover:bg-[#30363d] text-white px-4">
                        Search
                    </Button>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" className="bg-[#21262d] border-[#30363d] text-white hover:bg-[#30363d] gap-2">
                        Type: All <ChevronDown className="w-3 h-3" />
                    </Button>
                    <Button variant="outline" className="bg-[#21262d] border-[#30363d] text-white hover:bg-[#30363d] gap-2">
                        Language <ChevronDown className="w-3 h-3" />
                    </Button>
                    <Button variant="outline" className="bg-[#21262d] border-[#30363d] text-white hover:bg-[#30363d] gap-2">
                        Sort by: Recently starred <ChevronDown className="w-3 h-3" />
                    </Button>
                </div>
            </div>

            <div className="flex flex-col border border-[#30363d] rounded-md divide-y divide-[#30363d]">
                {starredRepos.map((repo, index) => (
                    <div key={index} className="p-4 hover:bg-[#161b22] transition-colors">
                        <div className="flex items-start justify-between">
                            <div>
                                <h3 className="text-lg font-semibold text-blue-500 hover:underline cursor-pointer">
                                    {repo.name}
                                </h3>
                                <p className="text-muted-foreground text-sm mt-1 max-w-3xl">
                                    {repo.description}
                                </p>
                                <div className="flex items-center gap-4 mt-3 text-xs text-muted-foreground">
                                    {repo.language && (
                                        <div className="flex items-center gap-1">
                                            <span className="w-3 h-3 rounded-full bg-yellow-400"></span>
                                            {repo.language}
                                        </div>
                                    )}
                                    <div className="flex items-center gap-1 hover:text-blue-500 cursor-pointer">
                                        <Star className="w-3 h-3" />
                                        {repo.stars}
                                    </div>
                                    <div className="flex items-center gap-1 hover:text-blue-500 cursor-pointer">
                                        <svg aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="16" data-view-component="true" className="w-3 h-3 fill-current">
                                            <path d="M5 5.372v.878c0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75v-.878a2.25 2.25 0 1 1 1.5 0v.878a2.25 2.25 0 0 1-2.25 2.25h-1.5v2.128a2.251 2.251 0 1 1-1.5 0V8.5h-1.5A2.25 2.25 0 0 1 3.5 6.25v-.878a2.25 2.25 0 1 1 1.5 0ZM5 3.25a.75.75 0 1 0-1.5 0 .75.75 0 0 0 1.5 0Zm6.75.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm-3 8.75a.75.75 0 1 0-1.5 0 .75.75 0 0 0 1.5 0Z"></path>
                                        </svg>
                                        {repo.forks}
                                    </div>
                                    <div>{repo.updated}</div>
                                </div>
                            </div>
                            <div className="flex items-center">
                                <Button variant="secondary" size="sm" className="bg-[#21262d] border border-[#30363d] text-[#c9d1d9] hover:bg-[#30363d] hover:border-[#8b949e] gap-1 h-7 text-xs font-semibold">
                                    <Star className="w-3 h-3 fill-current text-yellow-500" /> Star
                                    <ChevronDown className="w-3 h-3" />
                                </Button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
