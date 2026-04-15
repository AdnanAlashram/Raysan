import { Link } from "@tanstack/react-router";
import { Trash2, ShoppingBag, ArrowRight, Minus, Plus } from "lucide-react";
import { t } from "i18next";
import { useCart } from "@/context/CartContext";

export const Carts = () => {
    const { cart, removeFromCart, addToCart, totalPrice, totalCount, decressCart } = useCart();

    if (cart.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-32 animate__animated animate__fadeIn">
                <div className="relative mb-10">
                    <div className="absolute inset-0 bg-highlight/20 blur-[120px] rounded-full" />
                    <div className="relative p-10 bg-white/5 backdrop-blur-3xl border border-white/10 rounded-[3rem] shadow-2xl">
                        <ShoppingBag size={80} className="text-highlight opacity-80" />
                    </div>
                </div>
                <h2 className="text-4xl font-black text-main mb-4 tracking-tighter">{t("سلتك فارغة")}</h2>
                <p className="text-gray-500 text-center max-w-sm mb-12 leading-relaxed font-medium">
                    {t("يبدو أنك لم تضف أي منتج بعد، تصفح متجرنا واختر ما يناسبك من أفضل المنتجات.")}
                </p>
                <Link
                    to="/"
                    className="px-12 py-5 bg-highlight text-white rounded-2xl font-black shadow-xl shadow-highlight/20 hover:scale-105 transition-all active:scale-95 flex items-center gap-3"
                >
                    {t("ابدأ التسوق الآن")}
                    <ArrowRight size={20} className="rtl:rotate-180" />
                </Link>
            </div>
        );
    }

    return (
        <div className="animate__animated animate__fadeIn space-y-12 pb-20">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-white/5 pb-10">
                <div className="space-y-2">
                    <h1 className="text-5xl font-black text-main tracking-tighter flex items-center gap-5">
                        <div className="p-4 bg-highlight/10 rounded-[1.5rem] text-highlight border border-highlight/20">
                            <ShoppingBag size={36} />
                        </div>
                        {t("سلة المشتريات")}
                    </h1>
                    <p className="text-gray-500 text-lg font-medium">
                        {t("لديك")} <span className="text-highlight font-black underline decoration-highlight/30 underline-offset-8">{totalCount}</span> {t("منتجات جاهزة للدفع")}
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
                
                <div className="lg:col-span-2 space-y-6">
                    {cart.map((item) => (
                        <div
                            key={item.id}
                            className="group relative flex flex-col sm:flex-row items-center gap-8 p-6 bg-white/[0.03] backdrop-blur-2xl border border-white/10 rounded-[3rem] hover:bg-white/[0.07] transition-all duration-500 shadow-2xl"
                        >
                            <div className="w-44 h-44 flex-shrink-0 bg-white rounded-[2.5rem] p-6 shadow-inner relative group-hover:scale-105 transition-transform duration-500 overflow-hidden">
                                <img src={item.image} alt={item.title} className="w-full h-full object-contain drop-shadow-2xl relative z-10" />
                                <div className="absolute inset-0 bg-gradient-to-tr from-gray-100 to-transparent opacity-50" />
                            </div>

                            <div className="flex-grow space-y-4 w-full">
                                <div className="space-y-1">
                                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-highlight/50">{item.category}</span>
                                    <h3 className="text-2xl font-bold text-main line-clamp-1 tracking-tight">{item.title}</h3>
                                </div>

                                <div className="flex items-center justify-between pt-2">
                                    <div className="text-3xl font-black text-main tracking-tighter">${item.price}</div>

                                    <div className="flex items-center bg-black/40 p-2 rounded-2xl border border-white/5">
                                        <button 
                                            onClick={() => decressCart(item)} 
                                            className="w-10 h-10 flex items-center justify-center hover:bg-white/10 text-main rounded-xl transition-all active:scale-90"
                                        >
                                            <Minus size={16} />
                                        </button>
                                        <span className="w-12 text-center font-black text-lg text-main">{item.quantity}</span>
                                        <button
                                            onClick={() => addToCart(item)}
                                            className="w-10 h-10 flex items-center justify-center bg-highlight text-white rounded-xl hover:brightness-110 transition-all shadow-lg shadow-highlight/20 active:scale-90"
                                        >
                                            <Plus size={16} />
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <button
                                onClick={() => removeFromCart(item.id)}
                                className="absolute top-6 right-6 p-3 text-red-400/50 hover:text-red-500 hover:bg-red-500/10 rounded-2xl transition-all duration-300"
                            >
                                <Trash2 size={22} />
                            </button>
                        </div>
                    ))}
                </div>

                <div className="lg:col-span-1">
                    <div className="sticky top-32 p-10 bg-white/[0.04] backdrop-blur-3xl rounded-[3.5rem] border border-white/10 shadow-2xl relative overflow-hidden">
                        <div className="absolute -top-24 -right-24 w-64 h-64 bg-highlight/10 blur-[100px] rounded-full animate-pulse" />
                        <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-blue-500/10 blur-[100px] rounded-full animate-pulse" style={{ animationDelay: '1s' }} />

                        <h2 className="text-2xl font-black mb-10 relative z-10 flex items-center justify-between text-main">
                            {t("ملخص الطلب")}
                            <div className="h-1 w-12 bg-highlight rounded-full" />
                        </h2>

                        <div className="space-y-6 mb-12 relative z-10">
                            <div className="flex justify-between items-center text-gray-400 font-bold">
                                <span>{t("إجمالي العناصر")}</span>
                                <span className="text-main bg-white/5 px-3 py-1 rounded-lg border border-white/5">{totalCount}</span>
                            </div>

                            <div className="flex justify-between items-center text-gray-400 font-bold">
                                <span>{t("المجموع الفرعي")}</span>
                                <span className="text-main font-black text-xl tracking-tighter">${totalPrice.toFixed(2)}</span>
                            </div>
                            
                            <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-white/10 to-transparent my-8" />

                            <div className="flex justify-between items-end pt-4">
                                <div>
                                    <span className="text-gray-500 text-xs font-black uppercase tracking-widest block mb-2">{t("السعر النهائي")}</span>
                                    <div className="text-5xl font-black text-highlight tracking-tighter drop-shadow-[0_0_15px_rgba(0,188,212,0.3)]">
                                        ${totalPrice.toFixed(2)}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <Link
                            to="/checkout"
                            className="relative overflow-hidden group flex items-center justify-center gap-3 w-full py-6 bg-highlight text-white rounded-[2rem] font-black text-xl shadow-2xl shadow-highlight/30 transition-all duration-500 hover:-translate-y-2 active:scale-95"
                        >
                            <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_2s_infinite] pointer-events-none" />
                            
                            <span className="relative z-10">{t("إتمام الشراء")}</span>
                            <ArrowRight size={24} className="relative z-10 transition-transform duration-500 group-hover:translate-x-2 rtl:rotate-180 rtl:group-hover:-translate-x-2" />
                        </Link>

                    </div>
                </div>
            </div>
        </div>
    );
};