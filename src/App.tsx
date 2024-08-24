import { KabanContextProvider } from "./components/contextsProviders/kanbanContextProvider";
import KanbanBoard from "./components/custom/KanbanBoard";
import { ModeToggle } from "./components/mode-toggle";

function App() {
  return (
    <KabanContextProvider>
      <div className="fixed top-4 right-4">
        <ModeToggle />
      </div>
      <KanbanBoard />
    </KabanContextProvider>
  );
}

export default App;
