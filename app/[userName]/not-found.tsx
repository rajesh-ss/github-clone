import Link from "next/link";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#161b22] text-[#c9d1d9] relative overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0 opacity-50">
        <Image
          src="/github_404_star_wars.png"
          alt="404 Background"
          fill
          className="object-cover"
          priority
        />
      </div>

      <div className="z-10 flex flex-col items-center text-center w-full max-w-4xl px-4">
        <div className="relative mb-8">
          <h1 className="text-[120px] font-bold leading-none text-white drop-shadow-lg">
            404
          </h1>
          <div className="absolute top-[-40px] right-[-180px] bg-white text-[#161b22] px-6 py-4 rounded-lg shadow-lg hidden md:block">
            <p className="text-lg font-medium">
              “This is not the web page you are looking for.”
            </p>
            <div className="absolute bottom-[-10px] left-4 w-0 h-0 border-l-[10px] border-l-transparent border-t-[10px] border-t-white border-r-[10px] border-r-transparent"></div>
          </div>
        </div>

        <div className="w-full max-w-2xl bg-[#0d1117]/80 backdrop-blur-sm p-8 rounded-lg border border-[#30363d] shadow-xl">
          <p className="text-lg mb-6">
            Find code, projects, and people on GitHub:
          </p>
          <div className="flex gap-2">
            <Input
              type="text"
              placeholder="Search GitHub"
              className="bg-[#0d1117] border-[#30363d] text-white placeholder:text-[#8b949e]"
            />
            <Button variant="secondary">Search</Button>
          </div>
        </div>

        <div className="mt-12 flex gap-6 text-sm text-[#8b949e]">
          <Link href="#" className="hover:text-[#58a6ff]">
            Contact Support
          </Link>
          <span>—</span>
          <Link href="#" className="hover:text-[#58a6ff]">
            GitHub Status
          </Link>
          <span>—</span>
          <Link href="#" className="hover:text-[#58a6ff]">
            @githubstatus
          </Link>
        </div>
      </div>
    </div>
  );
}
