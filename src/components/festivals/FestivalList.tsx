import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface Festival {
  id: number
  name: string
  date: string
  type: string
  description: string
}

interface FestivalListProps {
  festivals: Festival[]
  onEdit: (festival: Festival) => void
  onDelete: (id: number) => void
}

export function FestivalList({ festivals, onEdit, onDelete }: FestivalListProps) {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {festivals.map(festival => (
        <Card key={festival.id} className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="text-xl flex items-center justify-between">
              {festival.name}
              <span className="text-sm font-normal text-muted-foreground">
                {festival.date}
              </span>
            </CardTitle>
            <CardDescription>{festival.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={() => onEdit(festival)}>
                编辑
              </Button>
              <Button variant="outline" size="sm" className="text-destructive" onClick={() => onDelete(festival.id)}>
                删除
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
} 