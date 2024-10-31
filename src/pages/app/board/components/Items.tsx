import { cn } from "@/lib/utils";
import { UniqueIdentifier } from "@dnd-kit/core";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Calendar } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type AssignedUser = {
  id: string;
  name: string;
  avatar: string;
};

type ItemsType = {
  id: UniqueIdentifier;
  title: string;
  dueDate?: string;
  assignedUsers?: AssignedUser[];
};

const Items = ({
  id,
  title,
  dueDate = new Date().toISOString(),
  assignedUsers = [],
}: ItemsType) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: id,
    data: {
      type: "item",
    },
  });

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={{
        transition,
        transform: CSS.Translate.toString(transform),
      }}
      className={cn(
        "p-4 bg-white shadow-sm rounded-lg w-full border border-gray-100 hover:border-gray-200 hover:shadow-md transition-all cursor-grab active:cursor-grabbing",
        isDragging && "opacity-50"
      )}
    >
      <div className="space-y-3">
        <div className="flex items-start justify-between">
          <h3 className="font-medium text-gray-900">{title}</h3>
        </div>

        {dueDate && (
          <div className="flex items-center text-sm text-gray-500">
            <Calendar className="h-4 w-4 mr-2" />
            <span>{new Date(dueDate).toLocaleDateString()}</span>
          </div>
        )}

        <div className="flex -space-x-2 overflow-hidden">
          <TooltipProvider>
            {assignedUsers.length > 0 ? (
              assignedUsers.map((user) => (
                <Tooltip key={user.id}>
                  <TooltipTrigger>
                    <img
                      className="inline-block h-8 w-8 rounded-full ring-2 ring-white"
                      src={user.avatar}
                      alt={user.name}
                    />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{user.name}</p>
                  </TooltipContent>
                </Tooltip>
              ))
            ) : (
              <Tooltip>
                <TooltipTrigger className="cursor-pointer flex items-center justify-center gap-x-2">
                  <div className="h-8 w-8 rounded-full ring-2 ring-white bg-gray-200 flex items-center justify-center">
                    <span className="text-gray-500 text-xs">?</span>
                  </div>
                  <span className="text-xs">Unassigned</span>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Unassigned</p>
                </TooltipContent>
              </Tooltip>
            )}
          </TooltipProvider>
        </div>
      </div>
    </div>
  );
};

export default Items;
