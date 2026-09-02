import Header from "./components/Header";
import Stats from "./components/Stats";
import FilterBar from "./components/FilterBar";
import PostList from "./components/PostList";
import PerformancePanel from "./components/PerformancePanel";

function App() {
  return (
    <div className="app">
      <Header />

      <main className="container">
        <Stats />

        <FilterBar />

        <PerformancePanel />

        <PostList />
      </main>

      <footer>
        <p>
          Experiment 1.2.2 • Selector Optimization using
          Redux Toolkit
        </p>
      </footer>
    </div>
  );
}

export default App;