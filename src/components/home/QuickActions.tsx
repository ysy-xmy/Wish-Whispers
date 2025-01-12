import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Gift, PenSquare, Calendar as CalendarIcon, Settings, Users, PlusCircle } from "lucide-react"
import { useRouter } from 'next/navigation'

export function QuickActions() {
  const router = useRouter()

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <Card className="hover:shadow-lg transition-shadow">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Gift className="h-5 w-5 text-primary" />
            生日簿
          </CardTitle>
          <p className="text-sm text-muted-foreground">记录和管理重要的生日日期，永不错过祝福时刻</p>
        </CardHeader>
        <CardContent>
          <Button className="w-full" variant="outline" size="lg" onClick={() => router.push('/birthdays')}>
            去查看
          </Button>
        </CardContent>
      </Card>

      <Card className="hover:shadow-lg transition-shadow">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <PenSquare className="h-5 w-5 text-primary" />
            写心语
          </CardTitle>
          <p className="text-sm text-muted-foreground">写一封给未来的自己，设定发送日期，给未来的自己一个惊喜</p>
        </CardHeader>
        <CardContent>
          <Button className="w-full" variant="outline" size="lg">
            去写
          </Button>
        </CardContent>
      </Card>

      <Card className="hover:shadow-lg transition-shadow">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CalendarIcon className="h-5 w-5 text-primary" />
            节日管理
          </CardTitle>
          <p className="text-sm text-muted-foreground">添加和管理重要节日，提前做好节日准备</p>
        </CardHeader>
        <CardContent>
          <Button className="w-full" variant="outline" size="lg" onClick={() => router.push('/festivals')}>
            去添加
          </Button>
        </CardContent>
      </Card>

      <Card className="hover:shadow-lg transition-shadow">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5 text-primary" />
            管理联系人
          </CardTitle>
          <p className="text-sm text-muted-foreground">整理和维护联系人信息，方便快速查找</p>
        </CardHeader>
        <CardContent>
          <Button className="w-full" variant="outline" size="lg" onClick={() => router.push('/contacts')}>
            去管理
          </Button>
        </CardContent>
      </Card>

      <Card className="hover:shadow-lg transition-shadow">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <PlusCircle className="h-5 w-5 text-primary" />
            新建提醒任务
          </CardTitle>
          <p className="text-sm text-muted-foreground">创建新的提醒事项，不错过任何重要时刻</p>
        </CardHeader>
        <CardContent>
          <Button className="w-full" variant="outline" size="lg" onClick={() => router.push('/new-reminder')}>
            去新建
          </Button>
        </CardContent>
      </Card>

      <Card className="hover:shadow-lg transition-shadow">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5 text-primary" />
            设置
          </CardTitle>
          <p className="text-sm text-muted-foreground">自定义应用偏好，打造个性化使用体验</p>
        </CardHeader>
        <CardContent>
          <Button className="w-full" variant="outline" size="lg" onClick={() => router.push('/settings')}>
            去设置
          </Button>
        </CardContent>
      </Card>
    </div>
  )
} 