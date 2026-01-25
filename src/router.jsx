import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Hub from './app/hub/Hub.jsx';
import CommitConverterApp from './app/projects/commit-converter/CommitConverterApp.jsx';

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Hub />} />
        <Route path="/projects/commit-converter" element={<CommitConverterApp />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;