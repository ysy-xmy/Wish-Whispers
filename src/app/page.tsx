"use client"

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar } from "@/components/ui/calendar"
import { Calendar as CalendarIcon } from "lucide-react"
import { useRouter } from 'next/navigation'
import { WelcomeSection } from "@/components/home/WelcomeSection"
import { QuickActions } from "@/components/home/QuickActions"
import { UpcomingReminders } from "@/components/home/UpcomingReminders"
import { ReminderList } from "@/components/reminders/ReminderList"

interface ContactConfig {
  id: number
  name: string
  method: string
  recipientEmail: string
}

const initialContacts: ContactConfig[] = [
  { id: 1, name: "张三", method: "email", recipientEmail: 'zhangsan@example.com' }
]

const initialReminders = [
  { title: "中秋节", date: "2024-09-17", contactName: "张三", status: "待提醒", daysUntil: 230, notified: false },
  { title: "妈妈生日", date: "2024-08-15", contactName: "李四", status: "已提醒", daysUntil: 197, notified: true },
  { title: "国庆节", date: "2024-10-01", contactName: "王五", status: "待提醒", daysUntil: 244, notified: false }
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
    <div className="relative">
      <div className="hidden md:block absolute inset-0 bg-cover bg-center h-screen" style={{ backgroundImage: "url('/home/bg.png')" }}>
        <div className="absolute inset-0 bg-black opacity-50"></div>
      </div>
      <div className="relative container mx-auto p-6 space-y-8">
        <WelcomeSection />

        <div className="grid md:grid-cols-2 gap-6">
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
            <CardContent className="flex flex-col xl:flex-row gap-4">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-md border"
              />
              <ReminderList reminders={initialReminders} />
            </CardContent>
          </Card>

          <QuickActions />
        </div>

        <UpcomingReminders />
      </div>
    </div>
  )
} 