import { Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

interface AddMemberDialogProps {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  newMember: {
    name: string
    email: string
    role: string
  }
  onNewMemberChange: (member: { name: string; email: string; role: string }) => void
  onAddMember: () => void
}

const AddMemberDialog = ({
  isOpen,
  onOpenChange,
  newMember,
  onNewMemberChange,
  onAddMember,
}: AddMemberDialogProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Add Member
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Team Member</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Input
              placeholder="Name"
              value={newMember.name}
              onChange={(e) =>
                onNewMemberChange({ ...newMember, name: e.target.value })
              }
            />
          </div>
          <div className="space-y-2">
            <Input
              placeholder="Email"
              type="email" 
              value={newMember.email}
              onChange={(e) =>
                onNewMemberChange({ ...newMember, email: e.target.value })
              }
            />
          </div>
          <div className="space-y-2">
            <Input
              placeholder="Role"
              value={newMember.role}
              onChange={(e) =>
                onNewMemberChange({ ...newMember, role: e.target.value })
              }
            />
          </div>
          <Button className="w-full" onClick={onAddMember}>
            Add Member
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default AddMemberDialog