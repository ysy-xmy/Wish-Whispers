import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface Birthday {
  id: number
  name: string
  date: string
  description: string
}

interface BirthdayListProps {
  birthdays: Birthday[]
  onEdit: (birthday: Birthday) => void
  onDelete: (id: number) => void
}

export function BirthdayList({ birthdays, onEdit, onDelete }: BirthdayListProps) {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {birthdays.map(birthday => (
        <Card key={birthday.id} className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="text-xl flex items-center justify-between">
              {birthday.name}
              <span className="text-sm font-normal text-muted-foreground">
                {birthday.date}
              </span>
            </CardTitle>
            <CardDescription>{birthday.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={() => onEdit(birthday)}>
                编辑
              </Button>
              <Button variant="outline" size="sm" className="text-destructive" onClick={() => onDelete(birthday.id)}>
                删除
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
} 