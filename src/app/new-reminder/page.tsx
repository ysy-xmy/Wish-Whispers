"use client"

import { useState } from 'react'
import { ReminderEventForm } from "@/components/reminders/ReminderEventForm"

interface ContactConfig {
  id: number
  name: string
  method: string
  recipientEmail: string
  birthday: string
}

const initialContacts: ContactConfig[] = [
  { id: 1, name: "张三", method: "email", recipientEmail: 'zhangsan@example.com', birthday: '1990-01-01' }
]

export default function NewReminderPage() {
  const [isReminderFormOpen, setIsReminderFormOpen] = useState(true)

  const handleSaveReminderEvent = (event: any) => {
    console.log("保存提醒事件:", event)
    // 在这里可以添加保存事件的逻辑
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">新建提醒任务</h1>
      <ReminderEventForm
        contacts={initialContacts}
        isOpen={isReminderFormOpen}
        onClose={() => setIsReminderFormOpen(false)}
        onSave={handleSaveReminderEvent}
      />
    </div>
  )
} 