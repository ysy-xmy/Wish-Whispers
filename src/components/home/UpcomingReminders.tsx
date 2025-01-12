import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Bell } from "lucide-react"

export function UpcomingReminders() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bell className="h-5 w-5 text-primary" />
          近期提醒
        </CardTitle>
        <CardDescription>
          最近的重要日子
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
          {[1, 2, 3].map((_, i) => (
            <Card key={i}>
              <CardHeader>
                <CardTitle className="text-base">
                  {i === 0 ? "中秋节" : i === 1 ? "妈妈生日" : "国庆节"}
                </CardTitle>
                <CardDescription>
                  {i === 0 ? "2024-09-17" : i === 1 ? "2024-08-15" : "2024-10-01"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  {i === 0 ? "还有 230 天" : i === 1 ? "还有 197 天" : "还有 244 天"}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  )
} 