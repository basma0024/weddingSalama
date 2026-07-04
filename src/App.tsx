import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import HomePage from './pages/HomePage';
import PageTransition from './components/PageTransition';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function AppLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <main className="flex-grow">
        <PageTransition>
          <Routes>
            <Route path="/" element={<HomePage />} />
            
          </Routes>
        </PageTransition>
      </main>
    </div>
  );
}

function App() {

 

  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/*" element={<AppLayout />} />
      </Routes>
    </Router>
  );
}

export default App;
