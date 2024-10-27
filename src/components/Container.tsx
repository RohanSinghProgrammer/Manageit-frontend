import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Button } from "@/components/ui/button";
import ContainerProps from "@/types/container.types";
import { cn } from "@/lib/utils";
import { Ellipsis, Plus } from 'lucide-react';

const Container = ({
  id,
  children,
  title,
  description,
  onAddItem,
  className,  
}: ContainerProps) => {
  const {
    attributes,
    setNodeRef,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: id,
    data: {
      type: "container",
    },
  });
  return (
    <div
      {...attributes}
      ref={setNodeRef}
      style={{
        transition,
        transform: CSS.Translate.toString(transform),
      }}
      className={cn(
        "w-96 p-4 bg-gray-50 rounded-xl flex flex-col h-full",
        className,
        isDragging && "opacity-50"
      )}
    >
      <div {...listeners} className="flex items-center justify-between cursor-move mb-4">
        <div className="flex flex-col gap-y-1">
          <h1 className="text-gray-800 text-xl">{title}</h1>
          <p className="text-gray-400 text-sm">{description}</p>
        </div>
        <Button variant="ghost" size="icon">
          <Ellipsis className="size-4" />
        </Button>
      </div>

      <div className="flex-grow flex flex-col gap-y-4 overflow-y-auto">
        {children}
      </div>
      
      <Button variant="outline" onClick={onAddItem} className="mt-4">
        <Plus className="size-4" />
        Add Item
      </Button>
    </div>
  );
};

export default Container;
