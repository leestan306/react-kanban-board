import KanbanBoard from "./components/custom/KanbanBoard";
import { ModeToggle } from "./components/mode-toggle";

function App() {
  return (
    <div>
      <div className="fixed top-4 right-4">
        <ModeToggle />
      </div>
      <KanbanBoard />
    </div>
  );
}

export default App;
