import useKanban from "@/hooks/useKanban";
import { Button } from "../ui/button";
import BoardListItem from "./BoardListItem";

function SideBar() {
  const { createBoard, boards } = useKanban();
  return (
    <div className="w-[300px] border-r-[1px] min-h-[100dv] max-h-[100dvh] flex flex-col justify-between">
      <div className="flex p-4  gap-4 items-center">
        <img src="/logo.png" className="h-12" alt="" />
        <div className="text-3xl font-bold">Kanban</div>
      </div>
      <div className="p-4 flex flex-col gap-4">
        {boards.map((board) => (
          <BoardListItem key={board.id} board={board} />
        ))}
      </div>
      <Button onClick={createBoard} variant={"outline"}>
        Add Board
      </Button>
    </div>
  );
}

export default SideBar;
