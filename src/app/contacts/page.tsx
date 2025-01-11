"use client"

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select } from "@/components/ui/select"
import { useRouter } from 'next/navigation'

interface Contact {
  id: number
  name: string
  nickname: string
  birthday: string
  method: string
  recipientEmail: string
  phoneNumber: string
}

const initialContacts: Contact[] = [
  { id: 1, name: "张三", nickname: "小张", birthday: "1990-01-01", method: "email", recipientEmail: 'zhangsan@example.com', phoneNumber: '1234567890' }
]

export default function ContactsPage() {
  const [contacts, setContacts] = useState<Contact[]>(initialContacts)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [currentContact, setCurrentContact] = useState<Contact | null>(null)
  const router = useRouter()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    if (!currentContact) return
    const { id, value } = e.target
    setCurrentContact(prevState => prevState ? { ...prevState, [id]: value } : null)
  }

  const handleSave = () => {
    if (!currentContact) return
    if (currentContact.id === 0) {
      const newId = contacts.length ? contacts[contacts.length - 1].id + 1 : 1
      setContacts([...contacts, { ...currentContact, id: newId }])
    } else {
      setContacts(contacts.map(contact => contact.id === currentContact.id ? currentContact : contact))
    }
    setIsDialogOpen(false)
    setCurrentContact(null)
  }

  const handleEdit = (contact: Contact) => {
    setCurrentContact(contact)
    setIsDialogOpen(true)
  }

  const handleDelete = (id: number) => {
    setContacts(contacts.filter(contact => contact.id !== id))
  }

  const handleAdd = () => {
    setCurrentContact({ id: 0, name: '', nickname: '', birthday: '', method: "email", recipientEmail: '', phoneNumber: '' })
    setIsDialogOpen(true)
  }

  return (
    <div className="container mx-auto p-6 space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-primary">联系人管理</h1>
        <Button onClick={handleAdd}>
          添加联系人
        </Button>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {contacts.map(contact => (
          <Card key={contact.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="text-xl flex items-center justify-between">
                {contact.name || "未命名"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p>昵称: {contact.nickname || "未指定"}</p>
              <p>生日: {contact.birthday || "未指定"}</p>
              <p>邮箱: {contact.recipientEmail || "未指定"}</p>
              <p>手机号码: {contact.phoneNumber || "未指定"}</p>
              <div className="flex gap-2 mt-4">
                <Button variant="outline" size="sm" onClick={() => handleEdit(contact)}>
                  编辑
                </Button>
                <Button variant="outline" size="sm" className="text-destructive" onClick={() => handleDelete(contact.id)}>
                  删除
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {isDialogOpen && currentContact && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-md shadow-lg w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">{currentContact.id === 0 ? "添加新联系人" : "编辑联系人"}</h2>
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">姓名</Label>
                <Input
                  id="name"
                  value={currentContact.name}
                  onChange={handleChange}
                  className="border rounded-md"
                />
              </div>
              <div>
                <Label htmlFor="nickname">昵称</Label>
                <Input
                  id="nickname"
                  value={currentContact.nickname}
                  onChange={handleChange}
                  className="border rounded-md"
                />
              </div>
              <div>
                <Label htmlFor="birthday">生日</Label>
                <Input
                  id="birthday"
                  type="date"
                  value={currentContact.birthday}
                  onChange={handleChange}
                  className="border rounded-md"
                />
              </div>
              <div>
                <Label htmlFor="recipientEmail">接收方邮箱</Label>
                <Input
                  id="recipientEmail"
                  type="email"
                  value={currentContact.recipientEmail}
                  onChange={handleChange}
                  className="border rounded-md"
                />
              </div>
              <div>
                <Label htmlFor="phoneNumber">手机号码</Label>
                <Input
                  id="phoneNumber"
                  type="tel"
                  value={currentContact.phoneNumber}
                  onChange={handleChange}
                  className="border rounded-md"
                />
              </div>
              <Button onClick={handleSave} className="w-full bg-primary text-white mt-4">
                保存联系人
              </Button>
            </div>
          </div>
        </div>
      )}

      <Button variant="outline" onClick={() => router.push('/')}>
        返回主页
      </Button>
    </div>
  )
} 