import KanbanBoard from "./components/custom/KanbanBoard";
import { ModeToggle } from "./components/mode-toggle";

function App() {
  return (
    <div>
      <div className="flex justify-end p-4">
        <ModeToggle />
      </div>
      <KanbanBoard />;
    </div>
  );
}

export default App;
