import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useRouter } from 'next/navigation'
import { ContactSelector } from './ContactSelector'
import { ReminderTypeSelector } from './ReminderTypeSelector'
import { DateAndDaysSelector } from './DateAndDaysSelector'

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
  isOpen: boolean
  onClose: () => void
  onSave: (event: ReminderEvent) => void
}

const traditionalFestivals = [
  { name: "春节", date: "2024-02-10" },
  { name: "端午节", date: "2024-06-07" },
  { name: "中秋节", date: "2024-09-17" }
]

export function ReminderEventForm({ contacts, isOpen, onClose, onSave }: ReminderEventFormProps) {
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
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>创建提醒事件</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label htmlFor="title">提醒任务标题</Label>
            <Input id="title" value={formState.title} onChange={handleChange} className="border rounded-md" />
          </div>
          <ContactSelector contacts={contacts} selectedContactId={formState.contactId} onChange={handleContactChange} />
          <ReminderTypeSelector type={formState.type} onTypeChange={handleTypeChange} onFestivalChange={handleFestivalChange} festivals={traditionalFestivals} />
          <div>
            <Label htmlFor="message">祝福语</Label>
            <Textarea id="message" value={formState.message} onChange={handleChange} className="border rounded-md" />
          </div>
          <DateAndDaysSelector date={formState.date} daysBefore={formState.daysBefore} onDateChange={handleChange} onDaysBeforeChange={handleDaysBeforeChange} />
          <Button onClick={handleSubmit} className="w-full bg-primary text-white mt-4">
            保存事件
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}