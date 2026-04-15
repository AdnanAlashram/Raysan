import { t } from "i18next";
import React, { useEffect, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import Select from "react-select";
import { AsyncPaginate } from "react-select-async-paginate";

interface Option {
    value: any;
    label: string;
}

interface FieldConfig {
    name: string;
    type: string;
    label?: string;
    placeholder?: string;
    options?: any[];
    url?: any;
    optionLabel?: string;
    optionValue?: string;
    displayFields?: string[];
    isMulti?: boolean;
    radionName?: string[];
    radionlabel?: string[];
    onChange?: (value: any) => void;
}

interface Props {
    field: FieldConfig;
    formik: any;
    previews?: { [key: string]: string | null | any };
    handleFileChange?: (
        event: React.ChangeEvent<HTMLInputElement>,
        field: string,
        setFieldValue: (field: string, value: any) => void
    ) => void;
}

function getValueByPath(obj: any, path: string) {
    return path
        .replace(/\[(\d+)\]/g, '.$1')
        .split('.')
        .reduce((acc, part) => acc && acc[part], obj);
}
export const FormBuilderInput = ({
    field,
    formik,
    previews = {},
    handleFileChange,
}: Props) => {
    // ... (الـ Destructuring والـ State لم يتم تغييرها) ...
    const {
        name,
        type,
        label,
        placeholder,
        options = [],
        url,
        optionLabel = "name",
        optionValue = "id",
        displayFields = [],
        isMulti = false,
        radionName = [],
        radionlabel = [],
    } = field;

    const [selectedDateTime, setSelectedDateTime] = useState<Date | null>(null);
    const [showPassword, setShowPassword] = useState(false);
    const hasError = formik.touched[name] && formik.errors[name];

    // ... (دالة loadApiOptions لم يتم تغييرها) ...
    const loadApiOptions: any = async (
        inputValue: string,
        loadedOptions: Option[],
        additional: { page: number }
    ) => {
        console.log(loadedOptions);

        if (!url) return { options: [], hasMore: false, additional: { page: 1 } };

        const perPage = 15;
        let res;

        if (typeof url === "function") {
            res = await url(additional.page, perPage, inputValue);
        } else {
            const params: any = { page: additional.page, perPage };
            if (inputValue) params.search = inputValue;
            res = await fetch(url + "?" + new URLSearchParams(params)).then((r) =>
                r.json()
            );
        }

        const items = res.items || [];
        const newOptions: Option[] = items.map((item: any) => ({
            value: item[optionValue],
            label: item[optionLabel],
        }));

        return {
            options: newOptions,
            hasMore: res.currentPage < res.totalPages,
            additional: { page: additional.page + 1 },
        };
    };

    // ... (الـ useEffect لم يتم تغييرها) ...
    // useEffect(() => {
    //     if (type === "datetime" && formik.values[name]) {
    //         const [datePart, timePart] = formik.values[name]?.split(" ") || [];
    //         if (!datePart || !timePart) return;
    //         const [year, month, day] = datePart.split("-").map(Number);
    //         const [hours, minutes] = timePart.split(":").map(Number);
    //         setSelectedDateTime(new Date(year, month - 1, day, hours, minutes));
    //     }
    // }, [formik.values[name], name, type]);
    // 🚨 الحل الرئيسي: قراءة القيمة الحالية مع قيمة افتراضية 0
    // يتم استخدام getValueByPath لقراءة المسار المعقد مثل features[0].telegram
    const rawValue = getValueByPath(formik.values, name);
    const checkboxValue = rawValue === undefined || rawValue === null ? 0 : rawValue;
    useEffect(() => {
        const value = formik.values[name];

        // إذا لم توجد قيمة، نخرج
        if (!value || typeof value !== 'string') {
            setSelectedDateTime(null);
            return;
        }

        let dateToSet: Date | null = null;

        if (type === "time") {
            // معالجة قيمة الوقت "HH:mm:ss"
            const [hours, minutes, seconds = 0] = value.split(":").map(Number);

            // نستخدم تاريخ ثابت (مثل Jan 1, 2000) لإنشاء كائن Date ثم نحدد الوقت.
            // DatePicker سيستخدم مكونات الوقت فقط (الساعات والدقائق والثواني).
            dateToSet = new Date(2000, 0, 1, hours, minutes, seconds);

        } else if (type === "date") {
            // معالجة التاريخ "YYYY-MM-DD"
            const [year, month, day] = value.split("-").map(Number);
            dateToSet = new Date(year, month - 1, day);
        } else if (type === "datetime") {
            // معالجة التاريخ والوقت "YYYY-MM-DD HH:mm"
            // نستخدم الدالة البانية لـ Date مباشرة لمعظم التنسيقات القياسية
            dateToSet = new Date(value);

            // إذا كان التنسيق غير قياسي، نستخدم المنطق اليدوي (للتوافق مع الكود السابق)
            if (isNaN(dateToSet.getTime())) {
                const [datePart, timePart] = value.split(" ") || [];
                if (datePart && timePart) {
                    const [year, month, day] = datePart.split("-").map(Number);
                    const [hours, minutes] = timePart.split(":").map(Number);
                    dateToSet = new Date(year, month - 1, day, hours, minutes);
                }
            }
        }

        // نتحقق من أن كائن التاريخ صالح قبل التعيين
        if (dateToSet && !isNaN(dateToSet.getTime())) {
            setSelectedDateTime(dateToSet);
        } else {
            setSelectedDateTime(null);
        }

    }, [formik.values[name], name, type]); // تم تحسين قائمة التبعيات

    // 🚨 التعديل الرئيسي: تطبيق الألوان المخصصة (mainBg, tableBg, highlight, border-table)
    const inputClass = `
    w-full px-4 py-3 rounded-2xl 
      placeholder-text-sidebar-text text-lg
    bg-tableBg text-main transition-all duration-300
    ${hasError
            ? `border border-red-500/50 shadow-[0_0_15px_rgba(255,0,0,0.4)]`
            : `border border-border-table shadow-[0_0_10px_rgba(0,0,0,0.1)]` // border-table
        }
    focus:outline-none focus:ring-2 focus:ring-text-highlight
`;

    const labelClass = "mb-2 block text-sm text-main font-medium "; // text-main
    const errorClass = "text-sm mt-1 text-red-500"; // استخدام اللون الأحمر للأخطاء

    // ... (بقية المكون) ...
    // -----------------------------------------------------
    //                       دوال العرض (renderInput)
    // -----------------------------------------------------

    const renderInput = () => {
        switch (type) {
            case "text":
            case "number":
            case "email":
            case "password":
                return (
                    <div className="relative">
                        <input
                            id={name}
                            {...formik.getFieldProps(name)}
                            type={type === "password" ? (showPassword ? "text" : "password") : type}
                            placeholder={t(placeholder || "")}
                            className={inputClass}
                        />
                    </div>
                );


            case "select":
            case "selectMulti":
                const customStyles = {
                    control: (base: any, state: any) => ({
                        ...base,
                        background: 'var(--color-table-bg)', 
                        minHeight: '52px',
                        borderRadius: '1rem', 
                        paddingLeft: '6px',
                        borderColor: state.isFocused ? 'var(--color-text-highlight)' : 'var(--color-border)',
                        boxShadow: state.isFocused
                            ? '0 0 0 2px var(--color-text-highlight)' 
                            : '0 0 10px rgba(0,0,0,0.1)',
                        transition: 'all 0.3s',
                        '&:hover': {
                            borderColor: state.isFocused ? 'var(--color-text-highlight)' : 'var(--color-border)',
                        },
                    }),
                    placeholder: (base: any) => ({
                        ...base,
                        color: 'var(--sidebar-text)', 
                    }),
                    singleValue: (base: any) => ({
                        ...base,
                        color: 'var(--color-text-main)', 
                    }),
                    input: (base: any) => ({
                        ...base,
                        color: 'var(--color-text-main)',
                    }),
                    menu: (base: any) => ({
                        ...base,
                        background: 'var(--color-main-bg)', 
                        color: 'var(--color-text-main)', 
                        borderRadius: '1rem',
                        overflow: 'hidden',
                        zIndex: 20,
                    }),
                    option: (base: any, state: any) => ({
                        ...base,
                        background: state.isSelected
                            ? 'var(--color-text-highlight)'
                            : state.isFocused
                                ? 'var(--color-text-highlight-300)' 
                                : 'var(--color-table-bg)',
                        color: state.isSelected ? 'var(--color-main-bg)' : 'var(--color-text-main)',
                        cursor: 'pointer',
                        transition: 'background-color 0.1s',
                        '&:active': {
                            background: 'var(--color-text-highlight)',
                        }
                    }),
                    multiValue: (base: any) => ({
                        ...base,
                        background: 'var(--color-text-highlight)', 
                        color: 'var(--color-main-bg)', 
                        borderRadius: '0.75rem',
                        padding: '2px 6px',
                    }),
                    multiValueLabel: (base: any) => ({
                        ...base,
                        color: 'var(--color-main-bg)',
                    }),
                    multiValueRemove: (base: any) => ({
                        ...base,
                        color: 'var(--color-main-bg)',
                        '&:hover': {
                            backgroundColor: 'var(--color-text-highlight)',
                            color: 'white',
                        },
                    }),
                };


                if (url) {
                    return (
                        <AsyncPaginate
                            isMulti={isMulti}
                            loadOptions={loadApiOptions}
                            additional={{ page: 1 }}
                            debounceTimeout={400}
                            cacheUniqs={[url]}
                            defaultOptions={true}
                            isClearable
                            placeholder={t(placeholder || "choose")}
                            onChange={(selected: any) => {
                                const val = isMulti
                                    ? selected.map((opt: any) => opt.value)
                                    : selected?.value;

                                formik.setFieldValue(name, val);
                                field.onChange?.(val);
                            }}
                            styles={customStyles}
                        />
                    );
                }
                const selectOptions: Option[] = options.map((item) => ({
                    value: item.id ?? item.value,
                    label: displayFields.length
                        ? displayFields.map((f) => item[f]).join(" ")
                        : item.label ?? item.value,
                }));

                const value = isMulti
                    ? selectOptions.filter((opt) => formik.values[name]?.includes(opt.value))
                    : selectOptions.find((opt) => opt.value === formik.values[name]) || null;
                return (
                    <Select
                        isMulti={isMulti}
                        options={selectOptions}
                        value={value}
                        placeholder={t(placeholder || "choose")}
                        onChange={(selected: any) => {
                            const val = isMulti
                                ? selected.map((opt: any) => opt.value)
                                : selected?.value;

                            formik.setFieldValue(name, val);
                            field.onChange?.(val);
                        }}
                        styles={customStyles}
                    />
                );




            default:
                return null;
        }
    };

    return (
        <div className="mb-6">
            {label && type !== "checkbox" && <label htmlFor={name} className={labelClass}>{t(label)}</label>}
            {renderInput()}
            {hasError && <div className={errorClass}>{t(formik.errors[name])}</div>}
        </div>
    );
};