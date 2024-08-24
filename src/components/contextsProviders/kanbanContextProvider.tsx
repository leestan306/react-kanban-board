import React, { useState } from "react";

import {
  boardsPreData,
  columnsPredata,
  tasksPreData,
} from "@/lib/constants/_data";
import { generateId } from "@/lib/utils";
import useLocalStorage from "@/hooks/useStorageHook";

export const KanbanContext = React.createContext<KanbanContextType | null>(
  null
);
export const KabanContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [columns, setColumns] = useLocalStorage<Column[]>(
    "columns",
    columnsPredata
  );
  const [boards, setBoards] = useLocalStorage<Board[]>("boards", boardsPreData);
  const [tasks, setTasks] = useLocalStorage<Task[]>("tasks", tasksPreData);
  const [activeColumn, setActiveColumn] = useState<Column | null>(null);
  const [activeCard, setActiveCard] = useState<Task | null>(null);
  const [activeBoard, setActiveBoard] = useLocalStorage<Board | null>(
    "activeBoard",
    boards[0] || null
  );

  const createBoard = () => {
    const boardToAdd: Board = {
      title: `Board ${boards.length + 1}`,
      id: generateId(),
    };
    setBoards([...boards, boardToAdd]);
    setActiveBoard(boardToAdd);
  };

  const deleteBoard = (id: Id) => {
    const filteredBoards = boards.filter((board) => board.id !== id);
    setBoards(filteredBoards);
  };

  const editBoard = (id: Id, title: string) => {
    const updatedBoards = boards.map((board) => {
      if (board.id === id) {
        return { ...board, title };
      }
      return board;
    });
    setBoards(updatedBoards);
  };

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

  const createColumn = () => {
    const columnToAdd: Column = {
      title: `Column ${
        columns.filter((column) => column.boardId === activeBoard?.id).length +
        1
      }`,
      id: generateId(),
      boardId: activeBoard?.id,
    };
    setColumns([...columns, columnToAdd]);
    console.log(columns);
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

  return (
    <KanbanContext.Provider
      value={{
        columns: columns.filter((column) => column.boardId === activeBoard?.id),
        updateColumn,
        deleteColumn,
        createColumn,
        activeColumn,
        setActiveColumn,
        setColumns,

        tasks,
        createTask,
        editTask,
        deleteTask,
        activeCard,
        setActiveCard,
        setTasks,

        boards,
        createBoard,
        deleteBoard,
        editBoard,
        activeBoard,
        setActiveBoard,
        setBoards,
      }}
    >
      {children}
    </KanbanContext.Provider>
  );
};
