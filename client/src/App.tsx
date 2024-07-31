import { Button } from "./components/ui/button";

const App = () => {
  return (
    <div className="h-screen bg-lime-200 text-gray-800 font-bold flex flex-col items-center justify-center text-lg">
      <h1>React DevKit</h1>
      <Button variant="destructive">Click here</Button>
    </div>
  );
};

export default App;
