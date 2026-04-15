import { DataView } from "@/components/view/DataView";
import { ShoppingCart, Plus } from "lucide-react";
import { Product } from "./interface";
import { ProductAPI } from "./api";
import { useCart } from "@/context/CartContext";

export const Products = () => {
  const { addToCart } = useCart();

  const renderProductCard = (product: Product) => (
    <div className="group relative flex flex-col h-full p-5 transition-all duration-500 bg-white/5 backdrop-blur-xl border border-white/10 rounded-[2.5rem] hover:bg-white/10 hover:-translate-y-2 shadow-xl shadow-black/20 overflow-hidden">


      <div className="absolute -top-20 -right-20 w-40 h-40 bg-highlight/10 blur-[50px] rounded-full group-hover:bg-highlight/20 transition-all duration-500" />


      <div className="relative flex items-center justify-center w-full h-48 mb-6 overflow-hidden bg-white rounded-[2rem] p-6 shadow-inner transition-transform duration-500 group-hover:scale-105">
        <img
          src={product.image}
          alt={product.title}
          className="object-contain w-full h-full drop-shadow-xl"
        />
      </div>


      <div className="flex flex-col flex-grow space-y-3 relative z-10">
        <h3 className="text-lg font-bold text-main line-clamp-2 leading-tight group-hover:text-highlight transition-colors">
          {product.title}
        </h3>

        <div className="flex items-center justify-between mt-auto pt-4">
          <div className="flex flex-col">
            <span className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Price</span>
            <p className="text-2xl font-black text-highlight tracking-tighter">
              ${product.price}
            </p>
          </div>


        </div>
      </div>

      <button
        onClick={() => addToCart(product)}
        className="flex items-center justify-center gap-2 w-full py-4 mt-6 text-white transition-all bg-white/5 border border-white/10 rounded-2xl hover:bg-highlight hover:border-highlight group/btn active:scale-95 font-bold"
      >
        <ShoppingCart size={18} className="group-hover/btn:animate-bounce" />
        Add to Cart
      </button>
    </div>
  );

  return (
    <DataView<Product>
      viewType="card"
      queryKey="products-list"
      queryFn={() => ProductAPI.list()}
      paginationType="none"
      renderCard={renderProductCard}
      className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
    />
  );
};