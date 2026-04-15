import { Outlet } from '@tanstack/react-router';
import Header from './Header';

const Layout = () => {


  return (
    <div className="min-h-screen bg-mainBg selection:bg-textHighlight/30">
      <Header />
      <main className="relative z-10 container mx-auto pb-20">
        <div
          className={`
            mt-6 mx-4 md:mx-8 p-4 md:p-8       
            rounded-[2.5rem] 
            shadow-2xl shadow-black/5
            animate__animated animate__fadeIn
          `}
        >

          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default Layout;