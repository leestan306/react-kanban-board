import { useMemo } from "react";
import { Button } from "../ui/button";
import { FaPlus } from "react-icons/fa";

import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { SortableContext } from "@dnd-kit/sortable";
import ColumnWrapper from "./ColumnWrapper";
import Taskcard from "./TaskCard";

import SideBar from "./SideBar";
import useKanban from "@/hooks/useKanban";

function KanbanBoard() {
  const {
    tasks,
    columns,
    setActiveColumn,
    setActiveCard,

    activeCard,
    activeColumn,
    createColumn,

    arrayMoveColumns,
    arrayMoveTasks,

    activeBoard,
  } = useKanban();

  const onDragStart = (event: DragStartEvent) => {
    if (event.active.data.current?.type === "Column") {
      setActiveColumn(event.active.data.current?.column);
      return;
    }
    if (event.active.data.current?.type === "Task") {
      setActiveCard(event.active.data.current?.task);
      return;
    }
  };

  const onDragEnd = (event: DragEndEvent) => {
    setActiveCard(null);
    setActiveColumn(null);
    const { active, over } = event;
    if (!over) return;
    const activeColumnId =
      active.data.current?.type === "Column"
        ? active.data.current?.column.id
        : null;
    const overColumnId =
      over.data.current?.type === "Column"
        ? over.data.current?.column.id
        : null;
    if (activeColumnId && overColumnId && activeColumnId !== overColumnId) {
      //
      const activeColumnIndex = columns.findIndex(
        (column) => column.id === activeColumnId
      );
      const overColumnIndex = columns.findIndex(
        (column) => column.id === overColumnId
      );

      arrayMoveColumns(activeColumnIndex, overColumnIndex);

      return;
    }

    const activeCardId =
      active.data.current?.type === "Task"
        ? active.data.current?.task.id
        : null;
    const overCardId =
      over.data.current?.type === "Task" ? over.data.current?.task.id : null;
    if (activeCardId && overCardId && activeCardId !== overCardId) {
      const activeCardIndex = tasks.findIndex(
        (task) => task.id === activeCardId
      );
      const overCardIndex = tasks.findIndex((task) => task.id === overCardId);
      const activeTask = tasks[activeCardIndex];
      const overTask = tasks[overCardIndex];
      activeTask.columnId = overTask.columnId;

      arrayMoveTasks(activeCardIndex, overCardIndex);

      return;
    }
    if (overColumnId && activeCardId) {
      //
      const activeCard_ = tasks.find((task) => task.id === activeCardId);
      if (activeCard_) {
        activeCard_.columnId = overColumnId;
      }
    }
  };

  const sesnsors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    })
  );
  const activeColumns = useMemo(
    () => columns.filter((column) => column.boardId === activeBoard?.id),
    [columns, activeBoard]
  );
  const columnsIds = useMemo(
    () => activeColumns.map((column) => column.id),
    [activeColumns]
  );
  return (
    <DndContext
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      sensors={sesnsors}
    >
      <div className="flex">
        <SideBar />
        <div className="m-auto flex min-h-[calc(100vh)] w-full items-center overflow-x-auto overflow-y-hidden px-[40px] flex-1 flex-grow">
          <div className="mx-auto flex gap-2">
            <div className="flex gap-2">
              <SortableContext items={columnsIds}>
                {activeColumns.map((column) => (
                  <ColumnWrapper
                    key={column.id}
                    column={column}
                    tasks={tasks.filter((task) => task.columnId === column.id)}
                  />
                ))}
              </SortableContext>
            </div>
            <Button
              className="gap-4 w-[350px] border-4 p-6"
              onClick={() => createColumn()}
              variant={"outline"}
            >
              Add Column <FaPlus />{" "}
            </Button>
          </div>
        </div>
      </div>
      <DragOverlay>
        {activeColumn && (
          <ColumnWrapper
            column={activeColumn}
            tasks={tasks.filter((task) => task.columnId === activeColumn.id)}
          />
        )}
        {activeCard && <Taskcard task={activeCard} />}
      </DragOverlay>
    </DndContext>
  );
}

export default KanbanBoard;
