export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  image: string;
}

export interface ApiResponse {
  products: Product[];
}
export interface Cart {
  id: string;
  // You can add other fields related to the Cart model if they exist
}
export interface CartItem {
  id: string;
  cartId: string;
  productId: string;
  quantity: number;
  product: Product;
}
