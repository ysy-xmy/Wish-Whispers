"use client"

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar } from "@/components/ui/calendar"
import { useRouter } from 'next/navigation'
import { FestivalList } from "@/components/festivals/FestivalList"
import { FestivalForm } from "@/components/festivals/FestivalForm"
import { FestivalFilter } from "@/components/festivals/FestivalFilter"

interface Festival {
  id: number
  name: string
  date: string
  type: string
  description: string
}

const initialFestivals: Festival[] = [
  { id: 1, name: "春节", date: "2024-02-10", type: "traditional", description: "中国最重要的传统节日" },
  { id: 2, name: "中秋节", date: "2024-09-17", type: "traditional", description: "家人团圆的日子" },
  { id: 3, name: "圣诞节", date: "2024-12-25", type: "international", description: "西方重要节日" },
]

export default function FestivalsPage() {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [newFestival, setNewFestival] = useState<Festival>({ id: 0, name: '', date: '', description: '', type: 'traditional' })
  const [festivals, setFestivals] = useState<Festival[]>(initialFestivals)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterType, setFilterType] = useState('all')
  const router = useRouter()

  const handleAddFestival = (festival: Festival) => {
    if (festival.id === 0) {
      const newId = festivals.length ? festivals[festivals.length - 1].id + 1 : 1
      setFestivals([...festivals, { ...festival, id: newId }])
    } else {
      setFestivals(festivals.map(f => f.id === festival.id ? festival : f))
    }
  }

  const handleEditFestival = (festival: Festival) => {
    setNewFestival(festival)
    setIsDialogOpen(true)
  }

  const handleDeleteFestival = (id: number) => {
    setFestivals(festivals.filter(f => f.id !== id))
  }

  const handleDateSelect = (selectedDate: Date) => {
    setNewFestival({
      id: 0,
      name: '',
      date: selectedDate.toISOString().split('T')[0], // 格式化日期为 YYYY-MM-DD
      type: 'traditional',
      description: ''
    })
    setIsDialogOpen(true)
  }

  const filteredFestivals = festivals.filter(festival => {
    return (filterType === 'all' || festival.type === filterType) &&
           (festival.name.includes(searchTerm) || festival.date.includes(searchTerm))
  })

  return (
    <div className="container mx-auto p-6 space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-primary">节日管理</h1>
        <Button onClick={() => setIsDialogOpen(true)}>
          添加节日
        </Button>
      </div>

      <FestivalFilter
        searchTerm={searchTerm}
        filterType={filterType}
        onSearchChange={setSearchTerm}
        onFilterChange={setFilterType}
      />

      <Card>
        <CardHeader>
          <CardTitle>节日日历</CardTitle>
          <CardDescription>以日历形式查看所有节日</CardDescription>
        </CardHeader>
        <CardContent>
          <Calendar
            mode="single"
            selected={date}
            onSelect={handleDateSelect} // 使用 handleDateSelect 处理日期选择
            className="rounded-md border"
          />
        </CardContent>
      </Card>

      <FestivalList
        festivals={filteredFestivals}
        onEdit={handleEditFestival}
        onDelete={handleDeleteFestival}
      />

      <FestivalForm
        festival={newFestival}
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onSave={handleAddFestival}
      />

      <Button variant="outline" onClick={() => router.push('/')}>
        返回主页
      </Button>
    </div>
  )
} 