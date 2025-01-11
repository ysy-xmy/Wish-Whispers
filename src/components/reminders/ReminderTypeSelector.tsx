import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"

interface ReminderTypeSelectorProps {
  type: string
  onTypeChange: (value: string) => void
  onFestivalChange: (value: string) => void
  festivals: { name: string, date: string }[]
}

export function ReminderTypeSelector({ type, onTypeChange, onFestivalChange, festivals }: ReminderTypeSelectorProps) {
  return (
    <div>
      <Label htmlFor="type">提醒类型</Label>
      <Select onValueChange={onTypeChange} value={type}>
        <SelectTrigger>
          <SelectValue placeholder="选择提醒类型" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="birthday">生日提醒</SelectItem>
            <SelectItem value="festival">节日提醒</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
      {type === 'festival' && (
        <div>
          <Label htmlFor="festival">选择节日</Label>
          <Select onValueChange={onFestivalChange}>
            <SelectTrigger>
              <SelectValue placeholder="选择节日" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {festivals.map(festival => (
                  <SelectItem key={festival.name} value={festival.name}>
                    {festival.name}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      )}
    </div>
  )
}