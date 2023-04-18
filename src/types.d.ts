export interface UserType {
    id: number;
    token: string;
    email: string;
}

export interface ProductType {
    id: number;
    title: string;
    description?: string;
    price: number;
    
}