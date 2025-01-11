import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

interface Birthday {
  id: number
  name: string
  date: string
  description: string
}

interface BirthdayFormProps {
  birthday: Birthday
  isOpen: boolean
  onClose: () => void
  onSave: (birthday: Birthday) => void
}

export function BirthdayForm({ birthday, isOpen, onClose, onSave }: BirthdayFormProps) {
  const [formState, setFormState] = useState(birthday)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target
    setFormState(prevState => ({ ...prevState, [id]: value }))
  }

  const handleSubmit = () => {
    onSave(formState)
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{formState.id === 0 ? "添加新生日" : "编辑生日"}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label htmlFor="name">姓名</Label>
            <Input id="name" value={formState.name} onChange={handleChange} />
          </div>
          <div>
            <Label htmlFor="date">日期</Label>
            <Input id="date" type="date" value={formState.date} onChange={handleChange} />
          </div>
          <div>
            <Label htmlFor="description">描述</Label>
            <Textarea id="description" value={formState.description} onChange={handleChange} />
          </div>
          <Button onClick={handleSubmit} className="w-full bg-primary text-white">
            保存
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
} 