import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

interface Festival {
  id: number
  name: string
  date: string
  type: string
  description: string
}

interface FestivalFormProps {
  festival: Festival
  isOpen: boolean
  onClose: () => void
  onSave: (festival: Festival) => void
}

export function FestivalForm({ festival, isOpen, onClose, onSave }: FestivalFormProps) {
  const [formState, setFormState] = useState(festival)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { id, value } = e.target
    setFormState(prevState => ({ ...prevState, [id]: value }))
  }

  const handleSubmit = () => {
    onSave(formState)
    onClose()
  }

  const handleQuickAdd = (name: string, date: string, description: string) => {
    setFormState({
      id: 0,
      name,
      date,
      type: "traditional",
      description
    })
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{formState.id === 0 ? "添加新节日" : "编辑节日"}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Button onClick={() => handleQuickAdd("春节", "2024-02-10", "中国最重要的传统节日")} className="w-full bg-secondary text-white">
            快速添加春节
          </Button>
          <Button onClick={() => handleQuickAdd("母亲节", "2024-05-12", "感恩母亲的节日")} className="w-full bg-secondary text-white">
            快速添加母亲节
          </Button>
          <Button onClick={() => handleQuickAdd("父亲节", "2024-06-16", "感恩父亲的节日")} className="w-full bg-secondary text-white">
            快速添加父亲节
          </Button>
          <div>
            <Label htmlFor="name">节日名称</Label>
            <Input id="name" value={formState.name} onChange={handleChange} />
          </div>
          <div>
            <Label htmlFor="date">日期</Label>
            <Input id="date" type="date" value={formState.date} onChange={handleChange} />
          </div>
          <div>
            <Label htmlFor="type">类型</Label>
            <select id="type" className="border rounded-md p-2" value={formState.type} onChange={handleChange}>
              <option value="traditional">传统节日</option>
              <option value="international">国际节日</option>
            </select>
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