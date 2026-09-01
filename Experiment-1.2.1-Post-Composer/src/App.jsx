import PlatformSelector from "./components/PlatformSelector";
import PostComposer from "./components/PostComposer";
import PostList from "./components/PostList";

function App() {
  return (
    <div className="app">
      <header className="header">
        <div className="logo">
          <span>●</span>
          Redux Post Manager
        </div>

        <p>
          Centralized state management with
          Redux Toolkit
        </p>
      </header>

      <main className="container">
        <div className="hero">
          <span className="badge">
            Experiment 1.2.1
          </span>

          <h1>
            Multi-Platform Post Composer
          </h1>

          <p>
            Create, validate and manage posts
            using Redux Toolkit.
          </p>
        </div>

        <PlatformSelector />

        <PostComposer />

        <PostList />
      </main>

      <footer>
        <p>
          Full Stack-II • Redux Toolkit
        </p>
      </footer>
    </div>
  );
}

export default App;