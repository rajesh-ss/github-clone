import { cn } from "@/lib/utils"

export function ContributionCalendar() {
    // Generate mock data for the calendar
    // 52 weeks * 7 days
    const weeks = Array.from({ length: 53 }).map((_, i) => {
        return Array.from({ length: 7 }).map((_, j) => {
            // Randomize contribution level: 0-4
            // Make it look somewhat realistic with clusters
            const rand = Math.random();
            let level = 0;
            if (rand > 0.9) level = 4;
            else if (rand > 0.8) level = 3;
            else if (rand > 0.6) level = 2;
            else if (rand > 0.4) level = 1;
            return level;
        });
    });

    const getLevelColor = (level: number) => {
        switch (level) {
            case 1: return "bg-[#0e4429]";
            case 2: return "bg-[#006d32]";
            case 3: return "bg-[#26a641]";
            case 4: return "bg-[#39d353]";
            default: return "bg-[#161b22]";
        }
    }

    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    const years = ["2025", "2024", "2023", "2022", "2021", "2020", "2019", "2018", "2017", "2016", "2015", "2014", "2013"];

    return (
        <div className="w-full border border-[#30363d] rounded-md p-4 bg-[#0d1117]">
            <div className="flex justify-between items-start mb-4">
                <div>
                    <h3 className="text-base font-normal text-white mb-1">1,766 contributions in 2024</h3>
                </div>
                <div className="flex flex-col gap-1">
                    {years.map((year) => (
                        <button
                            key={year}
                            className={cn(
                                "px-3 py-1 text-xs rounded-md transition-colors text-left min-w-[60px]",
                                year === "2024"
                                    ? "bg-[#1f6feb] text-white font-semibold"
                                    : "bg-transparent text-[#7d8590] hover:bg-[#161b22]"
                            )}
                        >
                            {year}
                        </button>
                    ))}
                </div>
            </div>

            <div className="overflow-x-auto">
                <div className="min-w-[700px]">
                    <div className="flex text-[11px] text-[#7d8590] mb-1 ml-8 gap-[14px]">
                        {months.map((m, i) => <span key={i}>{m}</span>)}
                    </div>
                    <div className="flex gap-[3px]">
                        <div className="flex flex-col gap-[3px] text-[9px] text-[#7d8590] mr-2 h-[91px] justify-around pt-[15px]">
                            <span>Mon</span>
                            <span>Wed</span>
                            <span>Fri</span>
                        </div>
                        <div className="flex gap-[3px]">
                            {weeks.map((week, i) => (
                                <div key={i} className="flex flex-col gap-[3px]">
                                    {week.map((level, j) => (
                                        <div
                                            key={j}
                                            className={cn("w-[11px] h-[11px] rounded-[2px] border border-[#1b1f23]", getLevelColor(level))}
                                            title={`Contribution level ${level}`}
                                        />
                                    ))}
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="flex items-center gap-2 text-[11px] text-[#7d8590] mt-2 ml-8">
                        <a href="#" className="hover:text-[#58a6ff] hover:underline">Learn how we count contributions</a>
                        <div className="flex items-center gap-2 ml-auto">
                            <span>Less</span>
                            <div className="flex gap-[3px]">
                                <div className="w-[11px] h-[11px] rounded-[2px] bg-[#161b22] border border-[#1b1f23]" />
                                <div className="w-[11px] h-[11px] rounded-[2px] bg-[#0e4429] border border-[#1b1f23]" />
                                <div className="w-[11px] h-[11px] rounded-[2px] bg-[#006d32] border border-[#1b1f23]" />
                                <div className="w-[11px] h-[11px] rounded-[2px] bg-[#26a641] border border-[#1b1f23]" />
                                <div className="w-[11px] h-[11px] rounded-[2px] bg-[#39d353] border border-[#1b1f23]" />
                            </div>
                            <span>More</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
