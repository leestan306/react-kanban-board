import { useState } from "react";
import { Card } from "../ui/card";
import useKanban from "@/hooks/useKanban";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { cn } from "@/lib/utils";

function BoardListItem({ board }: { board: Board }) {
  const { editBoard, deleteBoard, activeBoard, setActiveBoard } = useKanban();
  const [editMode, setEditMode] = useState(false);
  if (editMode)
    return (
      <Card className="p-4">
        <Input
          autoFocus
          onBlur={() => setEditMode(false)}
          value={board.title}
          onChange={(e) => editBoard(board.id, e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && setEditMode(false)}
        />
      </Card>
    );
  return (
    <Card
      className={cn(
        "p-4 flex justify-between items-center group cursor-pointer",
        activeBoard?.id === board.id ? "bg-primary text-primary-foreground" : ""
      )}
      onClick={() => setActiveBoard(board)}
    >
      <p className="flex-1 flex-grow">{board.title}</p>
      <div className="flex gap-1">
        <Button
          className="hidden group-hover:inline-flex"
          size={"icon"}
          variant={"outline"}
          onClick={(e) => {
            e.stopPropagation();
            setEditMode(true);
          }}
        >
          <FaEdit />
        </Button>
        <Button
          className="hidden group-hover:inline-flex"
          size={"icon"}
          onClick={(e) => {
            e.stopPropagation();
            deleteBoard(board.id);
          }}
          variant={"destructive"}
        >
          <FaTrashAlt />
        </Button>
      </div>
    </Card>
  );
}

export default BoardListItem;
