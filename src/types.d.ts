type Id = string | number;

type Column = {
  id: Id;
  title: string;
};

type ColumnProps = {
  column: Column;
  deleteColum: (id: Id) => void;
  updateColumn: (id: Id, title: string) => void;
  createTask: (columnId: Id) => void;
  tasks: Task[];
  deleteTask: (taskId: Id) => void;
  editTask: (id: Id, content: string) => void;
};

type Task = {
  id: Id;
  columnId: Id;
  content: string;
};
