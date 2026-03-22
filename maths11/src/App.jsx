import { useState } from 'react';
import { Sidebar } from './components/layout/Sidebar';
import { TopBar } from './components/layout/TopBar';
import { ChapterPage } from './components/book/ChapterPage';

function App() {
  const [activeChapter, setActiveChapter] = useState('1');

  return (
    <div className="app-container">
      <Sidebar activeChapter={activeChapter} onSelectChapter={setActiveChapter} />
      
      <div className="main-content">
        <TopBar activeChapter={activeChapter} />
        <div className="page-content">
          <ChapterPage chapterId={activeChapter} />
        </div>
      </div>
    </div>
  );
}

export default App;
