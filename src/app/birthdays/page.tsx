"use client"

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { useRouter } from 'next/navigation'
import { BirthdayList } from "@/components/birthdays/BirthdayList"
import { BirthdayForm } from "@/components/birthdays/BirthdayForm"

interface Birthday {
  id: number
  name: string
  date: string
  description: string
}

const initialBirthdays: Birthday[] = [
  { id: 1, name: "妈妈", date: "2024-08-15", description: "妈妈的生日" },
  { id: 2, name: "爸爸", date: "2024-06-20", description: "爸爸的生日" },
]

export default function BirthdaysPage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [newBirthday, setNewBirthday] = useState<Birthday>({ id: 0, name: '', date: '', description: '' })
  const [birthdays, setBirthdays] = useState<Birthday[]>(initialBirthdays)
  const router = useRouter()

  const handleAddBirthday = (birthday: Birthday) => {
    if (birthday.id === 0) {
      const newId = birthdays.length ? birthdays[birthdays.length - 1].id + 1 : 1
      setBirthdays([...birthdays, { ...birthday, id: newId }])
    } else {
      setBirthdays(birthdays.map(b => b.id === birthday.id ? birthday : b))
    }
    setIsDialogOpen(false)
  }

  const handleEditBirthday = (birthday: Birthday) => {
    setNewBirthday(birthday)
    setIsDialogOpen(true)
  }

  const handleDeleteBirthday = (id: number) => {
    setBirthdays(birthdays.filter(b => b.id !== id))
  }

  return (
    <div className="container mx-auto p-6 space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-primary">生日提醒管理</h1>
        <Button onClick={() => setIsDialogOpen(true)}>
          添加生日
        </Button>
      </div>

      <BirthdayList
        birthdays={birthdays}
        onEdit={handleEditBirthday}
        onDelete={handleDeleteBirthday}
      />

      <BirthdayForm
        birthday={newBirthday}
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onSave={handleAddBirthday}
      />

      <Button variant="outline" onClick={() => router.push('/')}>
        返回主页
      </Button>
    </div>
  )
} 