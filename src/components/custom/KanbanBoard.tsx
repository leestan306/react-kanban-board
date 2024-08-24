import { useMemo, useState } from "react";
import { Button } from "../ui/button";
import { FaPlus } from "react-icons/fa";
import { generateId } from "@/lib/utils";
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { arrayMove, SortableContext } from "@dnd-kit/sortable";
import ColumnWrapper from "./ColumnWrapper";
import Taskcard from "./TaskCard";
import { columnsPredata, tasksPreData } from "@/lib/constants/_data";
import useLocalStorage from "@/hooks/useStorageHook";

function KanbanBoard() {
  const [columns, setColumns] = useLocalStorage<Column[]>(
    "columns",
    columnsPredata
  );
  const [tasks, setTasks] = useLocalStorage<Task[]>("tasks", tasksPreData);
  const [activeColumn, setActiveColumn] = useState<Column | null>(null);
  const [activeCard, setActiveCard] = useState<Task | null>(null);

  const createTask = (columnId: Id) => {
    const taskToAdd: Task = {
      id: generateId(),
      content: `Task ${tasks.length + 1}`,
      columnId,
    };
    setTasks([...tasks, taskToAdd]);
  };
  const deleteTask = (id: Id) => {
    const filteredTasks = tasks.filter((task) => task.id !== id);
    setTasks(filteredTasks);
  };

  const editTask = (id: Id, content: string) => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === id) {
        return { ...task, content };
      }
      return task;
    });
    setTasks(updatedTasks);
  };

  const createNewColumn = () => {
    const columnToAdd: Column = {
      title: `Column ${columns.length + 1}`,
      id: generateId(),
    };
    setColumns([...columns, columnToAdd]);
  };
  const deleteColumn = (id: Id) => {
    const filteredColumns = columns.filter((column) => column.id !== id);
    setColumns(filteredColumns);
  };

  const updateColumn = (id: Id, title: string) => {
    const updatedColumns = columns.map((column) => {
      if (column.id === id) {
        return { ...column, title };
      }
      return column;
    });
    setColumns(updatedColumns);
  };
  const columnsIds = useMemo(
    () => columns.map((column) => column.id),
    [columns]
  );

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
      setColumns((columns) => {
        return arrayMove(columns, activeColumnIndex, overColumnIndex);
      });
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
      setTasks((tasks) => {
        return arrayMove(tasks, activeCardIndex, overCardIndex);
      });
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

  return (
    <DndContext
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      sensors={sesnsors}
    >
      <div className="m-auto flex min-h-[calc(100vh-64px)] w-full items-center overflow-x-auto overflow-y-hidden px-[40px]">
        <div className="mx-auto flex gap-2">
          <div className="flex gap-2">
            <SortableContext items={columnsIds}>
              {columns.map((column) => (
                <ColumnWrapper
                  editTask={editTask}
                  deleteTask={deleteTask}
                  createTask={createTask}
                  key={column.id}
                  column={column}
                  deleteColum={deleteColumn}
                  updateColumn={updateColumn}
                  tasks={tasks.filter((task) => task.columnId === column.id)}
                />
              ))}
            </SortableContext>
          </div>
          <Button
            className="gap-4 w-[350px] border-4 p-6"
            onClick={createNewColumn}
            variant={"outline"}
          >
            Add Column <FaPlus />{" "}
          </Button>
        </div>
      </div>
      <DragOverlay>
        {activeColumn && (
          <ColumnWrapper
            editTask={editTask}
            deleteTask={deleteTask}
            createTask={createTask}
            column={activeColumn}
            deleteColum={deleteColumn}
            updateColumn={updateColumn}
            tasks={tasks.filter((task) => task.columnId === activeColumn.id)}
          />
        )}
        {activeCard && (
          <Taskcard
            task={activeCard}
            deleteTask={deleteTask}
            editTask={editTask}
          />
        )}
      </DragOverlay>
    </DndContext>
  );
}

export default KanbanBoard;
