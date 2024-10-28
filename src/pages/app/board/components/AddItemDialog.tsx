import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Input } from "../../../../components/ui/input";
import { Button } from "../../../../components/ui/button";

type AddItemDialogProps = {
  open: boolean;
  onClose: () => void;
  itemName: string;
  setItemName: (name: string) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
};

const AddItemDialog = ({
  open,
  onClose,
  itemName,
  setItemName,
  handleSubmit,
}: AddItemDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="mt-4">
        <DialogTitle>Add Column</DialogTitle>
        <form onSubmit={handleSubmit}>
          <Input
            placeholder="Column Title"
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
          />
          <Button type="submit" className="mt-4 w-full">
            Add Column
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddItemDialog;
