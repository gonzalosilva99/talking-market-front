export interface UserDto {
  id: number;
  isOwner: boolean;
  firstname: string;
  lastname: string;
  email: string;
  image: string;
  birthday: string;
  token: string;
}

export interface ProductDto {
  id: number;
  name: string;
  description: string;
  image: string;
  price: number;
  stock: number;
  cost: number;
}

export interface ProductToBuy {
  product: ProductDto;
  units: number;
}

export interface CreateOrderDto {
  product_id: number;
  units: number;
}

export interface OrderDto {
  id: number;
  description: string;
  userId: number;
  createdAt: string;
  products: ProductUnitDto[];
}

export type ProductUnitDto = ProductDto & {
  UnitsProducts: { units: number };
};

export interface ProductProfitDto {
  product: ProductDto;
  profit: number;
}

export interface TotalProfitDto {
  total: number;
}

export type DailyProfitDto = ProductProfitDto & TotalProfitDto;
