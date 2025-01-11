"use client"

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select } from "@/components/ui/select"
import { useRouter } from 'next/navigation'

interface ContactConfig {
  id: number
  name: string
  method: string
  recipientEmail: string
}

const initialConfigs: ContactConfig[] = [
  { id: 1, name: "张三", method: "email", recipientEmail: 'zhangsan@example.com' }
]

export default function ContactsPage() {
  const [configs, setConfigs] = useState<ContactConfig[]>(initialConfigs)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [currentConfig, setCurrentConfig] = useState<ContactConfig | null>(null)
  const router = useRouter()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    if (!currentConfig) return
    const { id, value } = e.target
    setCurrentConfig(prevState => prevState ? { ...prevState, [id]: value } : null)
  }

  const handleSave = () => {
    if (!currentConfig) return
    if (currentConfig.id === 0) {
      const newId = configs.length ? configs[configs.length - 1].id + 1 : 1
      setConfigs([...configs, { ...currentConfig, id: newId }])
    } else {
      setConfigs(configs.map(config => config.id === currentConfig.id ? currentConfig : config))
    }
    setIsDialogOpen(false)
    setCurrentConfig(null)
  }

  const handleEdit = (config: ContactConfig) => {
    setCurrentConfig(config)
    setIsDialogOpen(true)
  }

  const handleAdd = () => {
    setCurrentConfig({ id: 0, name: '', method: "email", recipientEmail: '' })
    setIsDialogOpen(true)
  }

  return (
    <div className="container mx-auto p-6 space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-primary">联系人配置管理</h1>
        <Button onClick={handleAdd}>
          添加联系人配置
        </Button>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {configs.map(config => (
          <Card key={config.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="text-xl flex items-center justify-between">
                {config.name || "未命名"}
              </CardTitle>
              <CardDescription>{config.method === "email" ? "电子邮件提醒" : "其他提醒"}</CardDescription>
            </CardHeader>
            <CardContent>
              <p>接收人邮箱: {config.recipientEmail || "未指定"}</p>
              <div className="flex gap-2 mt-4">
                <Button variant="outline" size="sm" onClick={() => handleEdit(config)}>
                  编辑
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {isDialogOpen && currentConfig && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-md shadow-lg w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">{currentConfig.id === 0 ? "添加新联系人配置" : "编辑联系人配置"}</h2>
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">姓名</Label>
                <Input
                  id="name"
                  value={currentConfig.name}
                  onChange={handleChange}
                  className="border rounded-md"
                />
              </div>
              <div>
                <Label htmlFor="method">提醒方式</Label>
                <Select id="method" value={currentConfig.method} onChange={handleChange} className="border rounded-md p-2">
                  <option value="email">电子邮件</option>
                  <option value="sms">短信</option>
                  <option value="notification">应用内通知</option>
                </Select>
              </div>
              <div>
                <Label htmlFor="recipientEmail">接收方邮箱</Label>
                <Input
                  id="recipientEmail"
                  type="email"
                  value={currentConfig.recipientEmail}
                  onChange={handleChange}
                  className="border rounded-md"
                />
              </div>
              <Button onClick={handleSave} className="w-full bg-primary text-white mt-4">
                保存配置
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