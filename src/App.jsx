import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Home from './app/page';
import Festivals from './app/festivals/page';
import Birthdays from './pages/Birthdays';
import Wishes from './pages/Wishes';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/festivals" element={<Festivals />} />
          <Route path="/birthdays" element={<Birthdays />} />
          <Route path="/wishes" element={<Wishes />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App; 