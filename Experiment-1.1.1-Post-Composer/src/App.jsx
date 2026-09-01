import { useState } from "react";

import Header from "./components/Header";
import PlatformSelector from "./components/PlatformSelector";
import PostEditor from "./components/PostEditor";
import CharacterCounter from "./components/CharacterCounter";
import ValidationPanel from "./components/ValidationPanel";
import UploadBox from "./components/UploadBox";
import PublishButton from "./components/PublishButton";

import "./styles/App.css";

function App() {
  const [selectedPlatforms, setSelectedPlatforms] = useState([]);
  const [post, setPost] = useState("");

  return (
    <div className="container">
      <Header />

      <PlatformSelector
        selectedPlatforms={selectedPlatforms}
        setSelectedPlatforms={setSelectedPlatforms}
      />

      <PostEditor
        post={post}
        setPost={setPost}
      />

      <CharacterCounter
        selectedPlatforms={selectedPlatforms}
        post={post}
      />
      <ValidationPanel
        selectedPlatforms={selectedPlatforms}
        post={post}
     />
     <UploadBox />

     <PublishButton />
    </div>
  );
}

export default App;