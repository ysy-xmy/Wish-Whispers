import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"

interface DateAndDaysSelectorProps {
  date: string
  daysBefore: number
  onDateChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onDaysBeforeChange: (days: number) => void
}

export function DateAndDaysSelector({ date, daysBefore, onDateChange, onDaysBeforeChange }: DateAndDaysSelectorProps) {
  return (
    <div>
      <div>
        <Label htmlFor="date">提醒日期</Label>
        <Input id="date" type="date" value={date} onChange={onDateChange} className="border rounded-md" />
      </div>
      <div>
        <Label htmlFor="daysBefore">提前天数</Label>
        <div className="flex gap-2">
          {[0, 1, 3, 7].map(days => (
            <Button key={days} variant={daysBefore === days ? "solid" : "outline"} size="sm" onClick={() => onDaysBeforeChange(days)}>
              {days === 0 ? "当天" : `提前${days}天`}
            </Button>
          ))}
        </div>
      </div>
    </div>
  )
} 