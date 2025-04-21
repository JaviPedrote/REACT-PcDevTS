import { Card, CardContent } from '../components/ui/card';
import type { Producto } from '../types';
import { useCart } from '../contexts/CartContext';

export const ProductCard = ({ producto }: { producto: Producto }) => {
  const { dispatch } = useCart();

  return (
    <Card className="hover:shadow-xl transition-shadow">
      <CardContent className="p-4 flex flex-col">
        <img
          src={`img/${producto.image}.webp`}
          alt={producto.name}
          className="h-40 w-full object-cover rounded-lg"
          loading="lazy"
        />
        <h3 className="mt-3 text-lg font-semibold text-brand">{producto.name}</h3>
        <p className="text-sm text-gray-600 flex-1">{producto.description}</p>
        <div className="flex items-center justify-between mt-4">
          <span className="text-lg font-bold">{format(producto.price)}</span>
          <button
            className="btn btn-dark cursor-pointer"
            onClick={() => dispatch({ type: 'ADD', payload: producto })}
          >
            Añadir
          </button>
        </div>
      </CardContent>
    </Card>
  );
};

const format = (n: number) =>
  new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' }).format(n);
