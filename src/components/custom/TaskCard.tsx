import { FaTrashAlt } from "react-icons/fa";
import { Button } from "../ui/button";
import { useState } from "react";
import { Textarea } from "../ui/textarea";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
function TaskCard({
  task,
  deleteTask,
  editTask,
}: {
  task: Task;
  deleteTask: (id: Id) => void;
  editTask: (id: Id, content: string) => void;
}) {
  const [editMode, setEditMode] = useState(false);
  const {
    attributes,
    setNodeRef,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: task.id,
    data: {
      type: "Task",
      task,
    },
    disabled: editMode,
  });
  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  if (isDragging) {
    return (
      <div
        className="bg-background p-2 min-h-[100px] items-center flex text-lft rounded-xl hover:ring-4 hover:ring-accent cursor-grab justify-between group overflow-hidden"
        ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners}
      ></div>
    );
  }

  return (
    <div
      className="bg-background p-2 min-h-[100px] items-center flex text-lft rounded-xl hover:ring-4 hover:ring-accent cursor-grab justify-between group overflow-hidden"
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      onClick={() => setEditMode(true)}
    >
      <div className="flex-1 flex-grow h-full flex w-full ">
        {!editMode && (
          <div className=" overflow-hidden my-auto">
            <p className="whitespace-pre-wrap ">{task.content}</p>
          </div>
        )}
        {editMode && (
          <Textarea
            className="w-full"
            value={task.content}
            onChange={(e) => editTask(task.id, e.target.value)}
            onBlur={() => setEditMode(false)}
            autoFocus
            onKeyDown={(e) =>
              e.key === "Enter" && e.shiftKey && setEditMode(false)
            }
          ></Textarea>
        )}
      </div>
      {!editMode && (
        <Button
          className="hidden group-hover:flex"
          variant={"destructive"}
          onClick={(e) => {
            e.stopPropagation();
            deleteTask(task.id);
          }}
        >
          <FaTrashAlt />
        </Button>
      )}
    </div>
  );
}

export default TaskCard;
