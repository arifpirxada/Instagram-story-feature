import {Routes, Route} from 'react-router-dom';
import HomePage from '../pages/HomePage';
import StoryPage from '../pages/StoryPage';

function Router() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/stories/:id" element={<StoryPage />} />
    </Routes>
  )
}

export default Router