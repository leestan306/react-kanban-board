type Id = string | number;

type Board = {
  id: Id;
  title: string;
};

type Column = {
  id: Id;
  title: string;
  boardId?: Id;
};

type ColumnProps = {
  column: Column;
  tasks: Task[];
};

type Task = {
  id: Id;
  columnId: Id;
  content: string;
};

type KanbanContextType = {
  columns: Column[];
  createColumn: () => void;
  deleteColumn: (id: Id) => void;
  updateColumn: (id: Id, title: string) => void;
  activeColumn: Column | null;
  setActiveColumn: React.Dispatch<React.SetStateAction<Column | null>>;
  setColumns: React.Dispatch<React.SetStateAction<Column[]>>;
  arrayMoveColumns: (from: number, to: number) => void;

  createTask: (columnId: Id) => void;
  tasks: Task[];
  deleteTask: (taskId: Id) => void;
  editTask: (id: Id, content: string) => void;
  activeCard: Task | null;
  setActiveCard: React.Dispatch<React.SetStateAction<Task | null>>;
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
  arrayMoveTasks: (from: number, to: number) => void;

  boards: Board[];
  createBoard: () => void;
  deleteBoard: (id: Id) => void;
  editBoard: (id: Id, title: string) => void;
  activeBoard: Board | null;
  setActiveBoard: React.Dispatch<React.SetStateAction<Board | null>>;
  setBoards: React.Dispatch<React.SetStateAction<Board[]>>;
};
