import { FormBuilder } from "@/components/form/FormBuilder";
import { useCart } from '@/context/CartContext';
import { useNavigate } from '@tanstack/react-router';
import { t } from 'i18next';
import { ArrowLeft, CheckCircle2, ShoppingBag } from 'lucide-react';
import { CheckoutVal } from './validation';

const ADDRESS_OPTIONS = [
    { value: '1', label: 'دمشق -الميسات' },
    { value: '2', label: 'دمشق - الجبة' },
    { value: '3', label: 'دمشق - الحمرا' },
];

export const Checkout = () => {
    const { clearCart, totalPrice, totalCount } = useCart();
    const navigate = useNavigate();

    const fields = [
        [
            {
                name: "name",
                label: t("الاسم الكامل"),
                type: "text",
                placeholder: t("أدخل اسمك هنا..."),
                wrapperClass: "col-span-2",
            },
            {
                name: "phone",
                label: t("رقم الهاتف"),
                type: "text",
                placeholder: "00 000 000",
                wrapperClass: "col-span-2",
            },
        ],
        [
            {
                name: "addressId",
                label: t("المنطقة"),
                type: "select",
                options: ADDRESS_OPTIONS,
                wrapperClass: "col-span-2",
            },
        ],
        [
            {
                name: "note",
                label: t("تفاصيل عن المنطقة"),
                type: "text",
                placeholder: t("ادخل التفاصيل..."),
                wrapperClass: "col-span-2",
            },
        ],
    ];

    const onSuccess = () => {

        return new Promise((resolve) => {

            setTimeout(() => {
                clearCart();
                navigate({ to: '/' });
                resolve({ success: true });
            }, 2000);
        });
    };

    return (
        <div className="max-w-6xl mx-auto animate__animated animate__fadeIn pb-20 px-4">

            
            <button
                onClick={() => window.history.back()}
                className="flex items-center gap-2 text-gray-500 hover:text-highlight transition-colors mb-10 font-bold group"
            >
                <ArrowLeft size={20} className="rtl:rotate-180 group-hover:-translate-x-1 transition-transform" />
                {t("العودة للسلة")}
            </button>

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">

                
                <div className="lg:col-span-3 space-y-8">
                    <section className="bg-white/[0.03] backdrop-blur-3xl border border-white/10 p-10 rounded-[3.5rem] shadow-2xl relative overflow-hidden">
                        
                        <div className="absolute -top-20 -left-20 w-64 h-64 bg-highlight/5 blur-[100px] rounded-full" />

                        <h2 className="text-3xl font-black text-main mb-10 flex items-center gap-4 relative z-10">
                            <span className="w-10 h-10 bg-highlight text-white rounded-2xl flex items-center justify-center text-lg shadow-lg shadow-highlight/20">
                                1
                            </span>
                            {t("معلومات التوصيل")}
                        </h2>

                        <div className="relative z-10">
                            <FormBuilder
                                validationSchema={CheckoutVal}
                                fields={fields}
                                errorRegistryName="checkout"
                                query={onSuccess}
                                loadingButtonLabel={t("جاري معالجة الطلب...")}
                                className="grid grid-cols-1 md:grid-cols-2 gap-6"
                            />
                        </div>
                    </section>
                </div>

                
                <div className="lg:col-span-2">
                    <div className="bg-white/[0.04] backdrop-blur-3xl p-10 rounded-[3.5rem] border border-white/10 shadow-2xl sticky top-32 overflow-hidden">
                        <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-blue-500/5 blur-[100px] rounded-full" />

                        <h3 className="text-2xl font-black text-main mb-8 flex items-center gap-3">
                            <ShoppingBag className="text-highlight" />
                            {t("تأكيد الطلب")}
                        </h3>

                        <div className="space-y-6 mb-10">
                            <div className="flex justify-between text-gray-400 font-bold text-lg">
                                <span>{t("عدد المنتجات")}</span>
                                <span className="text-main">{totalCount}</span>
                            </div>
                            <div className="flex justify-between text-gray-400 font-bold text-lg">
                                <span>{t("التوصيل")}</span>
                                <span className="text-green-400 uppercase tracking-widest text-sm">{t("مجاني")}</span>
                            </div>

                            <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-white/10 to-transparent my-8" />

                            <div className="flex justify-between items-center">
                                <span className="font-bold text-gray-500 uppercase tracking-tighter">{t("الإجمالي النهائي")}</span>
                                <span className="text-4xl font-black text-highlight drop-shadow-[0_0_15px_rgba(0,188,212,0.3)]">
                                    ${totalPrice.toFixed(2)}
                                </span>
                            </div>
                        </div>

                        <div className="p-6 bg-highlight/5 border border-highlight/10 rounded-[2rem] flex gap-4 items-start mb-8">
                            <CheckCircle2 className="text-highlight shrink-0" size={24} />
                            <p className="text-sm text-gray-400 leading-relaxed font-medium">
                                {t("سيتم التواصل معك هاتفياً لتأكيد موعد التوصيل فور إتمامك للطلب.")}
                            </p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};