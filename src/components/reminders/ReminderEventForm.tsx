import { useState } from 'react'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ContactSelector } from './ContactSelector'
import { ReminderTypeSelector } from './ReminderTypeSelector'
import { DateAndDaysSelector } from './DateAndDaysSelector'
import { useRouter } from 'next/navigation'

interface ContactConfig {
  id: number
  name: string
  method: string
  recipientEmail: string
  birthday: string
}

interface ReminderEvent {
  title: string
  message: string
  date: string
  daysBefore: number
  contactId: number
  type: string
}

interface ReminderEventFormProps {
  contacts: ContactConfig[]
  onSave: (event: ReminderEvent) => void
}

const traditionalFestivals = [
  { name: "春节", date: "2024-02-10" },
  { name: "端午节", date: "2024-06-07" },
  { name: "中秋节", date: "2024-09-17" }
]

export function ReminderEventForm({ contacts, onSave }: ReminderEventFormProps) {
  const [formState, setFormState] = useState<ReminderEvent>({
    title: '',
    message: '',
    date: '',
    daysBefore: 1,
    contactId: contacts.length > 0 ? contacts[0].id : 0,
    type: 'birthday'
  })

  const router = useRouter()

  const handleContactChange = (value: string) => {
    const selectedContact = contacts.find(contact => contact.id.toString() === value)
    if (selectedContact && formState.type === 'birthday') {
      setFormState(prev => ({...prev, contactId: parseInt(value), date: selectedContact.birthday}))
    } else {
      setFormState(prev => ({...prev, contactId: parseInt(value)}))
    }
  }

  const handleTypeChange = (value: string) => {
    setFormState(prev => ({...prev, type: value, title: '', date: ''}))
  }

  const handleFestivalChange = (value: string) => {
    const festival = traditionalFestivals.find(f => f.name === value)
    if (festival) {
      setFormState(prev => ({...prev, title: festival.name, date: festival.date}))
    }
  }

  const handleDaysBeforeChange = (days: number) => {
    const originalEventDate = traditionalFestivals.find(f => f.name === formState.title)?.date || formState.date
    const eventDate = new Date(originalEventDate)
    if (!isNaN(eventDate.getTime())) {
      const reminderDate = new Date(eventDate)
      reminderDate.setDate(eventDate.getDate() - days)
      setFormState(prev => ({...prev, daysBefore: days, date: reminderDate.toISOString().split('T')[0]}))
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target
    setFormState(prevState => ({ ...prevState, [id]: id === "daysBefore" ? parseInt(value) : value }))
  }

  const handleSubmit = () => {
    onSave(formState)
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg space-y-6">
      <h2 className="text-xl font-bold text-center text-primary">创建提醒事件</h2>
      <div>
        <Label htmlFor="title">提醒任务标题</Label>
        <Input id="title" value={formState.title} onChange={handleChange} className="border rounded-md w-full" />
      </div>
      <ContactSelector contacts={contacts} selectedContactId={formState.contactId} onChange={handleContactChange} />
      <ReminderTypeSelector type={formState.type} onTypeChange={handleTypeChange} onFestivalChange={handleFestivalChange} festivals={traditionalFestivals} />
      <div>
        <Label htmlFor="message">祝福语</Label>
        <Textarea id="message" value={formState.message} onChange={handleChange} className="border rounded-md w-full" />
      </div>
      <DateAndDaysSelector date={formState.date} daysBefore={formState.daysBefore} onDateChange={handleChange} onDaysBeforeChange={handleDaysBeforeChange} />
      <div className="flex justify-between">
        <button onClick={handleSubmit} className="bg-primary text-white py-2 px-4 rounded-md">
          保存事件
        </button>
        <button onClick={() => router.push('/')} className="bg-gray-200 text-gray-700 py-2 px-4 rounded-md">
          返回主页
        </button>
      </div>
    </div>
  )
}