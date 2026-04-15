import { Link } from "@tanstack/react-router";
import { ShoppingCart, LayoutGrid } from "lucide-react";
import { useCart } from "../context/CartContext";
import Lang from "./Lang";

const Header = () => {
  const { totalCount } = useCart();

  return (
    <header className="sticky top-0 z-50 w-full px-4 md:px-8 py-4">

      <div className="max-w-7xl mx-auto h-16 md:h-20 bg-navBg/30 backdrop-blur-xl border border-white/10 rounded-[2rem] shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] flex items-center justify-between px-6 md:px-10 transition-all duration-300">


        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 bg-textHighlight rounded-xl flex items-center justify-center shadow-lg shadow-textHighlight/20 group-hover:rotate-12 transition-transform duration-300">
            <LayoutGrid className="text-white w-6 h-6" />
          </div>
          <span className="text-xl font-black text-main tracking-tighter">
            Test <span className="text-highlight">Logo</span>
          </span>
        </Link>


        <div className="flex items-center gap-2 md:gap-4">


          <Link
            to="/carts"
            className="relative p-3 text-main hover:bg-highlight/10 hover:text-highlight rounded-2xl transition-all duration-300 active:scale-90 group"
          >
            <ShoppingCart size={22} className="md:w-6 md:h-6" />


            {totalCount > 0 && (
              <span className="absolute -top-1 -right-1 flex items-center justify-center min-w-[20px] h-[20px] px-1.5 text-[10px] font-black text-white bg-red-500 rounded-full ring-4 ring-mainBg/50 animate-pulse">
                {totalCount}
              </span>
            )}
          </Link>


          <div className="h-6 w-[1px] bg-white/10 mx-1 hidden md:block" />


          <div className="scale-90 md:scale-100">
            <Lang />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;