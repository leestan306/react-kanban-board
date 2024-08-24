import { FaTrashAlt } from "react-icons/fa";
import { Button } from "../ui/button";
import { SortableContext, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Input } from "../ui/input";
import { useMemo, useState } from "react";
import Taskcard from "./TaskCard";
function ColumnWrapper(props: ColumnProps) {
  const {
    column,
    deleteColum,
    updateColumn,
    createTask,
    tasks,
    deleteTask,
    editTask,
  } = props;

  const [editMode, setEditMode] = useState(false);
  const {
    attributes,
    setNodeRef,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: column.id,
    data: {
      type: "Column",
      column,
    },
    disabled: editMode,
  });
  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };
  const tasksIds = useMemo(
    () =>
      tasks
        .filter((task) => task.columnId === column.id)
        .map((task) => task.id),
    [tasks, column.id]
  );
  if (isDragging)
    return (
      <div
        className="bg-accent/80 w-[350px] h-[80dvh] max-h-[80dvh] flex flex-col rounded-lg opacity-50 border-4 border-accent"
        ref={setNodeRef}
        style={style}
      ></div>
    );
  return (
    <div
      className="bg-accent/80 w-[350px] h-[80dvh] max-h-[80dvh] flex flex-col rounded-lg "
      ref={setNodeRef}
      style={style}
    >
      {/* columm title */}
      <div
        className="bg-background text-md h-[60px] cursor-grab rounded-t-lg p-3 font-bold border-4 flex gap-3 items-center justify-between"
        {...attributes}
        {...listeners}
        onClick={() => setEditMode(!editMode)}
      >
        <div className="flex gap-2 items-center">
          <Button className="rounded-full" size={"icon"}>
            {tasks.length}
          </Button>
          <div>
            {!editMode && column.title}
            {editMode && (
              <Input
                autoFocus
                onBlur={() => setEditMode(false)}
                value={column.title}
                onChange={(e) => updateColumn(column.id, e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") setEditMode(false);
                }}
              />
            )}
          </div>
        </div>
        <Button variant={"destructive"} onClick={() => deleteColum(column.id)}>
          <FaTrashAlt />
        </Button>
      </div>
      {/* column task container */}
      <div className="flex-1 flex-grow flex flex-col gap-2 overflow-x-hidden overflow-y-auto p-2">
        <SortableContext items={tasksIds}>
          {tasks.map((task) => (
            <Taskcard
              key={task.id}
              task={task}
              deleteTask={deleteTask}
              editTask={editTask}
            />
          ))}
        </SortableContext>
      </div>
      {/* footer */}
      <div className="w-full block">
        <Button
          variant={"outline"}
          className="block w-full"
          onClick={() => createTask(column.id)}
        >
          Add Item
        </Button>
      </div>
    </div>
  );
}

export default ColumnWrapper;
