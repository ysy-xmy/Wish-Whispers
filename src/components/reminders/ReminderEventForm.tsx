import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

interface ContactConfig {
  id: number
  name: string
  method: string
  recipientEmail: string
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

export function ReminderEventForm({ contacts, isOpen, onClose, onSave }: ReminderEventFormProps) {
  const [formState, setFormState] = useState<ReminderEvent>({
    title: '',
    message: '',
    date: '',
    daysBefore: 1,
    contactId: contacts.length > 0 ? contacts[0].id : 0,
    type: 'holiday'
  })

  const handleContactChange = (value: string) => {
    setFormState(prev => ({...prev, contactId: parseInt(value)}))
  }

  const handleTypeChange = (value: string) => {
    setFormState(prev => ({...prev, type: value}))
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
            <Label htmlFor="contactId">选择联系人模板</Label>
            <Select onValueChange={handleContactChange} value={formState.contactId.toString()}>
              <SelectTrigger>
                <SelectValue placeholder="选择联系人" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {contacts.map(contact => (
                    <SelectItem key={contact.id} value={contact.id.toString()}>
                      {contact.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="type">提醒类型</Label>
            <Select onValueChange={handleTypeChange} value={formState.type}>
              <SelectTrigger>
                <SelectValue placeholder="选择提醒类型" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="holiday">节假日提醒</SelectItem>
                  <SelectItem value="birthday">生日提醒</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="title">提醒任务标题</Label>
            <Input id="title" value={formState.title} onChange={handleChange} className="border rounded-md" />
          </div>
          <div>
            <Label htmlFor="message">祝福语</Label>
            <Textarea id="message" value={formState.message} onChange={handleChange} className="border rounded-md" />
          </div>
          <div>
            <Label htmlFor="date">提醒日期</Label>
            <Input id="date" type="date" value={formState.date} onChange={handleChange} className="border rounded-md" />
          </div>
          <div>
            <Label htmlFor="daysBefore">提前天数</Label>
            <Input id="daysBefore" type="number" value={formState.daysBefore} onChange={handleChange} className="border rounded-md" />
          </div>
          <Button onClick={handleSubmit} className="w-full bg-primary text-white mt-4">
            保存事件
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}