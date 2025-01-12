import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Circle } from "lucide-react"

interface Reminder {
  title: string
  date: string
  contactName: string
  status: string
  daysUntil: number
  notified: boolean
}

interface ReminderListProps {
  reminders: Reminder[]
}

export function ReminderList({ reminders }: ReminderListProps) {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>提醒任务列表</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {reminders.map((reminder, index) => (
            <li key={index} className="flex items-center gap-2 border-b pb-2">
              <Circle className="h-3 w-3 text-primary" />
              <div className="flex-1 text-sm text-muted-foreground">
                {reminder.title} - {reminder.daysUntil}天后 - 提醒人: {reminder.contactName}
              </div>
              <Badge variant={reminder.notified ? "default" : "outline"}>
                {reminder.notified ? "已提醒" : "未提醒"}
              </Badge>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
} 