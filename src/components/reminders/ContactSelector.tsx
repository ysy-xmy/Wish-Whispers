import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import Link from 'next/link'

interface ContactSelectorProps {
  contacts: { id: number, name: string }[]
  selectedContactId: number
  onChange: (value: string) => void
}

export function ContactSelector({ contacts, selectedContactId, onChange }: ContactSelectorProps) {
  return (
    <div>
      <Label htmlFor="contactId">选择联系人模板</Label>
      <Select onValueChange={onChange} value={selectedContactId.toString()}>
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
      <p className="text-sm text-gray-500 mt-2">
        还没有联系人？ <Link href="/contacts" className="text-blue-500">新增联系人</Link>
      </p>
    </div>
  )
} 