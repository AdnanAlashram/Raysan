export interface Product {
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string; // رابط الصورة القادم من الـ API
    rating?: {
      rate: number;
      count: number;
    };
  }
  
  // هذه الواجهة مهمة جداً لصفحة السلة (Cart) 
  // لكي نتمكن من تتبع كمية كل منتج
  export interface CartItem extends Product {
    quantity: number;
  }
  
  // الواجهة التي يتوقعها الـ DataView كاستجابة من الـ API
  export interface ApiResponse<T> {
    items: T[];
    total: number;
  }