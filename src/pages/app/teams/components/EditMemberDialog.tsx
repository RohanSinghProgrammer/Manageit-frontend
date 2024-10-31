import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

interface TeamMember {
  id: string
  name: string
  email: string
  role: string
  avatarUrl?: string
}

interface EditMemberDialogProps {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  editingMember: TeamMember | null
  onEditingMemberChange: (member: TeamMember | null) => void
  onEditMember: () => void
}

const EditMemberDialog = ({
  isOpen,
  onOpenChange,
  editingMember,
  onEditingMemberChange,
  onEditMember,
}: EditMemberDialogProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Team Member</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Input
              placeholder="Name"
              value={editingMember?.name || ""}
              onChange={(e) =>
                onEditingMemberChange(
                  editingMember ? { ...editingMember, name: e.target.value } : null
                )
              }
            />
          </div>
          <div className="space-y-2">
            <Input
              placeholder="Email"
              type="email"
              value={editingMember?.email || ""}
              onChange={(e) =>
                onEditingMemberChange(
                  editingMember ? { ...editingMember, email: e.target.value } : null
                )
              }
            />
          </div>
          <div className="space-y-2">
            <Input
              placeholder="Role"
              value={editingMember?.role || ""}
              onChange={(e) =>
                onEditingMemberChange(
                  editingMember ? { ...editingMember, role: e.target.value } : null
                )
              }
            />
          </div>
          <Button className="w-full" onClick={onEditMember}>
            Save Changes
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default EditMemberDialog