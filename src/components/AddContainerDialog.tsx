import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

type AddContainerDialogProps = {
  open: boolean;
  onClose: () => void;
  containerName: string;
  setContainerName: (name: string) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
};

const AddContainerDialog = ({
  open,
  onClose,
  containerName,
  setContainerName,
  handleSubmit,
}: AddContainerDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="mt-4">
        <DialogTitle>Add Container</DialogTitle>
        <form onSubmit={handleSubmit}>
          <Input
            placeholder="Container Title"
            value={containerName}
            onChange={(e) => setContainerName(e.target.value)}
          />
          <Button type="submit" className="mt-4 w-full">
            Add Container
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddContainerDialog;
