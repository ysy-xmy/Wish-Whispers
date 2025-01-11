import { useState } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';

const Layout = ({ children }) => {
  const [theme, setTheme] = useState('light');

  return (
    <div className={`app-container ${theme}`}>
      <Header theme={theme} setTheme={setTheme} />
      <div className="main-content">
        <Sidebar />
        <main>{children}</main>
      </div>
    </div>
  );
};

export default Layout; 