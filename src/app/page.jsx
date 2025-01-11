import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="home-container">
      <section className="welcome-section">
        <h1>欢迎使用节日织梦</h1>
        <p>不错过每一个值得纪念的日子</p>
      </section>
      
      <section className="upcoming-events">
        <h2>近期提醒</h2>
        <div className="events-grid">
          {/* 即将到来的节日和生日提醒将在这里显示 */}
        </div>
      </section>
      
      <section className="quick-actions">
        <h2>快捷操作</h2>
        <div className="actions-grid">
          <button>添加生日提醒</button>
          <button>写新心语</button>
          <button>查看节日日历</button>
        </div>
      </section>
      
      {/* 添加跳转到节假日页面的按钮 */}
      <Link to="/festivals">
        <button>查看节日</button>
      </Link>
    </div>
  );
};

export default Home;