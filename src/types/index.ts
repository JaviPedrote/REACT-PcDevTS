
export type Producto={
    id: number;
    name: string;
    image: string;
    description: string;
    price: number;
}

export type ProductCart = Producto & {
    cantidad: number}

