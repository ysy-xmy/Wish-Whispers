import { Input } from "@/components/ui/input"
import { Search, Filter } from "lucide-react"

interface FestivalFilterProps {
  searchTerm: string
  filterType: string
  onSearchChange: (term: string) => void
  onFilterChange: (type: string) => void
}

export function FestivalFilter({ searchTerm, filterType, onSearchChange, onFilterChange }: FestivalFilterProps) {
  return (
    <div className="flex gap-4 items-center">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="搜索节日..."
          className="pl-10"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
      <div className="flex items-center gap-2">
        <Filter className="h-5 w-5 text-muted-foreground" />
        <select
          className="border rounded-md p-2"
          value={filterType}
          onChange={(e) => onFilterChange(e.target.value)}
        >
          <option value="all">全部</option>
          <option value="traditional">传统节日</option>
          <option value="international">国际节日</option>
        </select>
      </div>
    </div>
  )
} 