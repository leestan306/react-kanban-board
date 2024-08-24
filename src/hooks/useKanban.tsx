import { KanbanContext } from "@/components/contextsProviders/kanbanContextProvider";
import { useContext } from "react";

const useKanban = () => {
  const context = useContext(KanbanContext);
  if (!context) {
    throw new Error("usekanban must be used within a KabanContextProvider");
  }
  return context;
};

export default useKanban;
