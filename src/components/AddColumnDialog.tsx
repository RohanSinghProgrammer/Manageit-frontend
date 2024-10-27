import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

type AddColumnDialogProps = {
  open: boolean;
  onClose: () => void;
  containerName: string;
  setContainerName: (name: string) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
};

const AddColumnDialog = ({
  open,
  onClose,
  containerName,
  setContainerName,
  handleSubmit,
}: AddColumnDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="mt-4">
        <DialogTitle>Add Column</DialogTitle>
        <form onSubmit={handleSubmit}>
          <Input
            placeholder="Column Title"
            value={containerName}
            onChange={(e) => setContainerName(e.target.value)}
          />
          <Button type="submit" className="mt-4 w-full">
            Add Column
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddColumnDialog;
