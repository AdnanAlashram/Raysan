import { useTranslation } from "react-i18next";
import { Globe } from "lucide-react";

export default function Lang() {
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === "ar";

  const toggleLang = () => {
    const newLang = isArabic ? "en" : "ar";
    i18n.changeLanguage(newLang);
    localStorage.setItem("lang", newLang);
    document.documentElement.dir = newLang === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = newLang;
  };

  return (
    <div className="flex items-center gap-3 p-1.5 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 shadow-sm">
      <div className="flex items-center gap-2 px-1">
        <div className="p-1.5 rounded-lg bg-textHighlight/10">
          <Globe className="w-4 h-4 text-textHighlight" />
        </div>
        <span className="hidden sm:block text-xs font-semibold text-textMain uppercase tracking-wider">
          {t('Language')}
        </span>
      </div>

      <button
        onClick={toggleLang}
        className={`
          relative w-14 h-7 flex items-center rounded-full p-1 
          transition-all duration-300 ease-out active:scale-90
          ${isArabic ? 'bg-textHighlight' : 'bg-slate-600'}
          shadow-inner
        `}
        role="switch"
        aria-label="Toggle Language"
      >
        <div
          className={`
            absolute w-5 h-5 rounded-full bg-white shadow-lg
            transition-transform duration-300 ease-out
            flex items-center justify-center
            ${isArabic ? '-translate-x-0' : 'translate-x-7'} 
          `}
        >
          <span className="text-[10px] font-black text-slate-800">
            {isArabic ? 'AR' : 'EN'}
          </span>
        </div>
      </button>
    </div>
  );
}