"use client"

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar } from "@/components/ui/calendar"
import { Bell, Gift, PenSquare, Calendar as CalendarIcon, Settings, Users } from "lucide-react"
import { useRouter } from 'next/navigation'
import { ReminderEventForm } from "@/components/reminders/ReminderEventForm"

interface ContactConfig {
  id: number
  name: string
  method: string
  recipientEmail: string
}

const initialContacts: ContactConfig[] = [
  { id: 1, name: "张三", method: "email", recipientEmail: 'zhangsan@example.com' }
]

export default function Home() {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [isReminderFormOpen, setIsReminderFormOpen] = useState(false)
  const router = useRouter()

  const handleSaveReminderEvent = (event: any) => {
    console.log("保存提醒事件:", event)
    // 在这里可以添加保存事件的逻辑
  }

  return (
    <div className="container mx-auto p-6 space-y-8">
      {/* 欢迎区域 */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-primary animate-fade-in">
          欢迎使用节日织梦
        </h1>
        <p className="text-lg text-muted-foreground">
          不错过每一个值得纪念的日子
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* 左侧日历区域 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CalendarIcon className="h-5 w-5 text-primary" />
              节日日历
            </CardTitle>
            <CardDescription>
              查看近期节日和生日
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-md border"
            />
          </CardContent>
        </Card>

        {/* 右侧快捷操作区域 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5 text-primary" />
              快捷操作
            </CardTitle>
            <CardDescription>
              常用功能快速访问
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button className="w-full justify-start" variant="outline" size="lg" onClick={() => router.push('/birthdays')}>
              <Gift className="mr-2 h-5 w-5" />
              添加生日提醒
            </Button>
            <Button className="w-full justify-start" variant="outline" size="lg">
              <PenSquare className="mr-2 h-5 w-5" />
              写新心语
            </Button>
            <Button className="w-full justify-start" variant="outline" size="lg" onClick={() => router.push('/festivals')}>
              <CalendarIcon className="mr-2 h-5 w-5" />
              添加节日提醒
            </Button>
            <Button className="w-full justify-start" variant="outline" size="lg" onClick={() => setIsReminderFormOpen(true)}>
              <Settings className="mr-2 h-5 w-5" />
              创建提醒事件
            </Button>
            <Button className="w-full justify-start" variant="outline" size="lg" onClick={() => router.push('/contacts')}>
              <Users className="mr-2 h-5 w-5" />
              管理联系人
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* 近期提醒区域 */}
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

      <ReminderEventForm
        contacts={initialContacts}
        isOpen={isReminderFormOpen}
        onClose={() => setIsReminderFormOpen(false)}
        onSave={handleSaveReminderEvent}
      />
    </div>
  )
} 