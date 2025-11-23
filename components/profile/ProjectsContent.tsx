import { LayoutTemplate } from "lucide-react"

export function ProjectsContent() {
    return (
        <div className="flex flex-col items-center justify-center py-20 border border-border rounded-md bg-card mt-4">
            <LayoutTemplate className="w-12 h-12 text-muted-foreground mb-4 opacity-50" />
            <h3 className="text-xl font-semibold mb-2">There aren't any projects yet</h3>
        </div>
    )
}
