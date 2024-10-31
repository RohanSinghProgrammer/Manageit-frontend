import { useState, useEffect, FormEvent, useRef } from "react";
import { v4 as uuidv4 } from "uuid";

// DND
import {
  DndContext,
  DragEndEvent,
  DragMoveEvent,
  DragOverlay,
  DragStartEvent,
  KeyboardSensor,
  PointerSensor,
  UniqueIdentifier,
  closestCorners,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  sortableKeyboardCoordinates,
} from "@dnd-kit/sortable";
// Components
import { Button } from "@/components/ui/button";
import Container from "@/pages/app/board/components/Container";
import Items from "@/pages/app/board/components/Items";
import { Plus } from "lucide-react";
import Navbar from "./components/Navbar";
import AddContainerDialog from "./components/AddContainerDialog";
import AddItemDialog from "./components/AddItemDialog";

type DNDType = {
  id: UniqueIdentifier;
  title: string;
  items: {
    id: UniqueIdentifier;
    title: string;
  }[];
};

const Home = () => {
  const [containers, setContainers] = useState<DNDType[]>([
    {
      id: "container-1",
      title: "To Do",
      items: [
        { id: "item-1", title: "Task 1" },
        { id: "item-2", title: "Task 2" }
      ]
    },
    {
      id: "container-2", 
      title: "In Progress",
      items: [
        { id: "item-3", title: "Task 3" }
      ]
    },
    {
      id: "container-3",
      title: "Done",
      items: [
        { id: "item-4", title: "Task 4" }
      ]
    }
  ]);
  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);
  const [currentContainerId, setCurrentContainerId] = useState<UniqueIdentifier>();
  const [containerName, setContainerName] = useState("");
  const [itemName, setItemName] = useState("");
  const [showAddContainerModal, setShowAddContainerModal] = useState(false);
  const [showAddItemModal, setShowAddItemModal] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [isDraggingContainer, setIsDraggingContainer] = useState(false);
  const [isDraggingItem, setIsDraggingItem] = useState(false);
  const boardRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [autoScrollInterval, setAutoScrollInterval] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setIsClient(true);
    return () => {
      if (autoScrollInterval) {
        clearInterval(autoScrollInterval);
      }
    };
  }, []);

  const onAddContainer = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!containerName) return;
    const id = `container-${uuidv4()}`;
    setContainers([
      ...containers,
      {
        id,
        title: containerName,
        items: [],
      },
    ]);
    setContainerName("");
    setShowAddContainerModal(false);
  };

  const onAddItem = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!itemName) return;
    const id = `item-${uuidv4()}`;
    const container = containers.find((item) => item.id === currentContainerId);
    if (!container) return;
    container.items.push({
      id,
      title: itemName,
    });
    setContainers([...containers]);
    setItemName("");
    setShowAddItemModal(false);
  };

  function findValueOfItems(id: UniqueIdentifier | undefined, type: string) {
    if (type === "container") {
      return containers.find((item) => item.id === id);
    }
    if (type === "item") {
      return containers.find((container) =>
        container.items.find((item) => item.id === id)
      );
    }
  }

  const findItemTitle = (id: UniqueIdentifier | undefined) => {
    const container = findValueOfItems(id, "item");
    if (!container) return "";
    const item = container.items.find((item) => item.id === id);
    if (!item) return "";
    return item.title;
  };

  const findContainerTitle = (id: UniqueIdentifier | undefined) => {
    const container = findValueOfItems(id, "container");
    if (!container) return "";
    return container.title;
  };

  const findContainerItems = (id: UniqueIdentifier | undefined) => {
    const container = findValueOfItems(id, "container");
    if (!container) return [];
    return container.items;
  };

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  function handleDragStart(event: DragStartEvent) {
    const { active } = event;
    const { id } = active;
    setActiveId(id);
    if (id.toString().includes("container")) {
      setIsDraggingContainer(true);
    }
    if (id.toString().includes("item")) {
      setIsDraggingItem(true);
    }
  }

  const handleDragMove = (event: DragMoveEvent) => {
    const { active, over } = event;

    if (
      active.id.toString().includes("item") &&
      over?.id.toString().includes("item") &&
      active &&
      over &&
      active.id !== over.id
    ) {
      const activeContainer = findValueOfItems(active.id, "item");
      const overContainer = findValueOfItems(over.id, "item");

      if (!activeContainer || !overContainer) return;

      const activeContainerIndex = containers.findIndex(
        (container) => container.id === activeContainer.id
      );
      const overContainerIndex = containers.findIndex(
        (container) => container.id === overContainer.id
      );

      const activeitemIndex = activeContainer.items.findIndex(
        (item) => item.id === active.id
      );
      const overitemIndex = overContainer.items.findIndex(
        (item) => item.id === over.id
      );

      if (activeContainerIndex === overContainerIndex) {
        let newItems = [...containers];
        newItems[activeContainerIndex].items = arrayMove(
          newItems[activeContainerIndex].items,
          activeitemIndex,
          overitemIndex
        );
        setContainers(newItems);
      } else {
        let newItems = [...containers];
        const [removeditem] = newItems[activeContainerIndex].items.splice(
          activeitemIndex,
          1
        );
        newItems[overContainerIndex].items.splice(
          overitemIndex,
          0,
          removeditem
        );
        setContainers(newItems);
      }
    }

    if (
      active.id.toString().includes("item") &&
      over?.id.toString().includes("container") &&
      active &&
      over &&
      active.id !== over.id
    ) {
      const activeContainer = findValueOfItems(active.id, "item");
      const overContainer = findValueOfItems(over.id, "container");

      if (!activeContainer || !overContainer) return;

      const activeContainerIndex = containers.findIndex(
        (container) => container.id === activeContainer.id
      );
      const overContainerIndex = containers.findIndex(
        (container) => container.id === overContainer.id
      );

      const activeitemIndex = activeContainer.items.findIndex(
        (item) => item.id === active.id
      );

      let newItems = [...containers];
      const [removeditem] = newItems[activeContainerIndex].items.splice(
        activeitemIndex,
        1
      );
      newItems[overContainerIndex].items.push(removeditem);
      setContainers(newItems);
    }

    // Handle horizontal scrolling when dragging
    if (boardRef.current && isDraggingContainer) {
      const clientX = 'clientX' in event.activatorEvent ? event.activatorEvent.clientX : (event.activatorEvent as TouchEvent).touches[0].clientX;
      const boardWidth = boardRef.current.scrollWidth;
      const viewportWidth = boardRef.current.clientWidth;
      const scrollThreshold = 150; // Increased threshold for better UX
      const maxScroll = boardWidth - viewportWidth;

      if (autoScrollInterval) {
        clearInterval(autoScrollInterval);
      }

      if ((clientX as number) < scrollThreshold) {
        // Scroll left with smooth animation
        const interval = setInterval(() => {
          if (boardRef.current) {
            const newScrollLeft = Math.max(0, boardRef.current.scrollLeft - 10);
            boardRef.current.scrollLeft = newScrollLeft;
          }
        }, 16);
        setAutoScrollInterval(interval);
      } else if ((clientX as number) > viewportWidth - scrollThreshold) {
        // Scroll right with smooth animation
        const interval = setInterval(() => {
          if (boardRef.current) {
            const newScrollLeft = Math.min(maxScroll, boardRef.current.scrollLeft + 10);
            boardRef.current.scrollLeft = newScrollLeft;
          }
        }, 16);
        setAutoScrollInterval(interval);
      }
    }
  };

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (autoScrollInterval) {
      clearInterval(autoScrollInterval);
      setAutoScrollInterval(null);
    }

    if (
      active.id.toString().includes("container") &&
      over?.id.toString().includes("container") &&
      active &&
      over &&
      active.id !== over.id
    ) {
      const activeContainerIndex = containers.findIndex(
        (container) => container.id === active.id
      );
      const overContainerIndex = containers.findIndex(
        (container) => container.id === over.id
      );
      let newItems = [...containers];
      newItems = arrayMove(newItems, activeContainerIndex, overContainerIndex);
      setContainers(newItems);
    }

    if (
      active.id.toString().includes("item") &&
      over?.id.toString().includes("item") &&
      active &&
      over &&
      active.id !== over.id
    ) {
      const activeContainer = findValueOfItems(active.id, "item");
      const overContainer = findValueOfItems(over.id, "item");

      if (!activeContainer || !overContainer) return;

      const activeContainerIndex = containers.findIndex(
        (container) => container.id === activeContainer.id
      );
      const overContainerIndex = containers.findIndex(
        (container) => container.id === overContainer.id
      );

      const activeitemIndex = activeContainer.items.findIndex(
        (item) => item.id === active.id
      );
      const overitemIndex = overContainer.items.findIndex(
        (item) => item.id === over.id
      );

      if (activeContainerIndex === overContainerIndex) {
        let newItems = [...containers];
        newItems[activeContainerIndex].items = arrayMove(
          newItems[activeContainerIndex].items,
          activeitemIndex,
          overitemIndex
        );
        setContainers(newItems);
      } else {
        let newItems = [...containers];
        const [removeditem] = newItems[activeContainerIndex].items.splice(
          activeitemIndex,
          1
        );
        newItems[overContainerIndex].items.splice(
          overitemIndex,
          0,
          removeditem
        );
        setContainers(newItems);
      }
    }

    if (
      active.id.toString().includes("item") &&
      over?.id.toString().includes("container") &&
      active &&
      over &&
      active.id !== over.id
    ) {
      const activeContainer = findValueOfItems(active.id, "item");
      const overContainer = findValueOfItems(over.id, "container");

      if (!activeContainer || !overContainer) return;

      const activeContainerIndex = containers.findIndex(
        (container) => container.id === activeContainer.id
      );
      const overContainerIndex = containers.findIndex(
        (container) => container.id === overContainer.id
      );

      const activeitemIndex = activeContainer.items.findIndex(
        (item) => item.id === active.id
      );

      let newItems = [...containers];
      const [removeditem] = newItems[activeContainerIndex].items.splice(
        activeitemIndex,
        1
      );
      newItems[overContainerIndex].items.push(removeditem);
      setContainers(newItems);
    }
    setActiveId(null);
    setIsDraggingContainer(false);
    setIsDraggingItem(false);
  }

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!boardRef.current || isDraggingContainer || isDraggingItem) return;
    setIsDragging(true);
    setStartX(e.pageX);
    setScrollLeft(boardRef.current.scrollLeft);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging || !boardRef.current || isDraggingContainer || isDraggingItem) return;
    e.preventDefault();
    const x = e.pageX - startX;
    boardRef.current.scrollLeft = scrollLeft - x;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!boardRef.current || isDraggingContainer || isDraggingItem) return;
    setIsDragging(true);
    setStartX(e.touches[0].pageX);
    setScrollLeft(boardRef.current.scrollLeft);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!isDragging || !boardRef.current || isDraggingContainer || isDraggingItem) return;
    const x = e.touches[0].pageX - startX;
    boardRef.current.scrollLeft = scrollLeft - x;
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  if (!isClient) {
    return null;
  }

  return (
    <>
      <Navbar />
      <div 
        className="mx-auto max-w-full bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1483232539664-d89822fb5d3e?q=80&w=2848&auto=format&fit=crop')",
          backgroundColor: 'rgba(0,0,0,0.5)',
          backgroundBlendMode: 'overlay'
        }}
      >
        <div 
          ref={boardRef}
          className="flex overflow-x-auto p-6 h-[90vh] scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-transparent"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <DndContext
            sensors={sensors}
            collisionDetection={closestCorners}
            onDragStart={handleDragStart}
            onDragMove={handleDragMove}
            onDragEnd={handleDragEnd}
          >
            <SortableContext items={containers.map((i) => i.id)}>
              <div className="flex gap-6">
                {containers.map((container) => (
                  <Container
                    id={container.id}
                    title={container.title}
                    key={container.id}
                    onAddItem={() => {
                      setShowAddItemModal(true);
                      setCurrentContainerId(container.id);
                    }}
                  >
                    <SortableContext items={container.items.map((i) => i.id)}>
                      <div className="flex items-start flex-col gap-y-3 min-h-[200px]">
                        {container.items.map((i) => (
                          <Items title={i.title} id={i.id} key={i.id} />
                        ))}
                      </div>
                    </SortableContext>
                  </Container>
                ))}
              </div>
            </SortableContext>
            <DragOverlay adjustScale={false}>
              {activeId && activeId.toString().includes("item") && (
                <Items id={activeId} title={findItemTitle(activeId)} />
              )}
              {activeId && activeId.toString().includes("container") && (
                <Container
                  id={activeId}
                  title={findContainerTitle(activeId)}
                  className="h-[500px] bg-white/50 backdrop-blur-sm"
                >
                  <div className="flex items-start flex-col gap-y-3 min-h-[200px]">
                    {findContainerItems(activeId).map((i) => (
                      <Items key={i.id} title={i.title} id={i.id} />
                    ))}
                  </div>
                </Container>
              )}
            </DragOverlay>
          </DndContext>
          <div className="flex-shrink-0 ml-4">
            <Button
              className="w-72 bg-white hover:bg-gray-50 text-gray-700 border-2 border-gray-200"
              onClick={() => setShowAddContainerModal(true)}
            >
              <Plus className="size-4 mr-2" />
              Add New Container
            </Button>
          </div>
        </div>
        <AddContainerDialog
          open={showAddContainerModal}
          onClose={() => setShowAddContainerModal(false)}
          containerName={containerName}
          setContainerName={setContainerName}
          handleSubmit={onAddContainer}
        />
        <AddItemDialog
          open={showAddItemModal}
          onClose={() => setShowAddItemModal(false)}
          itemName={itemName}
          setItemName={setItemName}
          handleSubmit={onAddItem}
        />
      </div>
    </>
  );
};

export default Home;
