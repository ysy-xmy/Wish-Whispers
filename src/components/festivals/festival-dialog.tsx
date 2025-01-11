"use client"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

interface Festival {
  name?: string;
  date?: string;
  type?: string;
  description?: string;
}

interface FestivalDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  isEditing?: boolean;
  festival?: Festival | null;
}

export function FestivalDialog({
  open,
  onOpenChange,
  isEditing = false,
  festival = null,
}: FestivalDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{isEditing ? "编辑节日" : "添加新节日"}</DialogTitle>
          <DialogDescription>
            {isEditing ? "修改节日信息" : "添加一个新的节日到您的日历中"}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="name">节日名称</Label>
            <Input id="name" defaultValue={festival?.name} />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="date">日期</Label>
            <Input id="date" type="date" defaultValue={festival?.date} />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="type">类型</Label>
            <Select defaultValue={festival?.type || "traditional"}>
              <SelectTrigger>
                <SelectValue placeholder="选择节日类型" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="traditional">传统节日</SelectItem>
                <SelectItem value="international">国际节日</SelectItem>
                <SelectItem value="custom">自定义节日</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="description">描述</Label>
            <Textarea
              id="description"
              defaultValue={festival?.description}
              placeholder="输入节日描述..."
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            取消
          </Button>
          <Button type="submit">保存</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
} 