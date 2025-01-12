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
            <Settings className="h-5 w-5 text-primary" />
            设置
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Button className="w-full" variant="outline" size="lg" onClick={() => router.push('/settings')}>
            去设置
          </Button>
        </CardContent>
      </Card>

      <Card className="hover:shadow-lg transition-shadow">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <PlusCircle className="h-5 w-5 text-primary" />
            新建提醒任务
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Button className="w-full" variant="outline" size="lg" onClick={() => router.push('/new-reminder')}>
            去新建
          </Button>
        </CardContent>
      </Card>
    </div>
  )
} 