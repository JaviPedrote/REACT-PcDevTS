import React, { createContext, useContext, useReducer, useEffect } from 'react';
import type { Producto, ProductCart } from '../types';

type State = { items: ProductCart[] };
type Action =
  | { type: 'ADD'; payload: Producto }
  | { type: 'INC'; payload: number }
  | { type: 'DEC'; payload: number }
  | { type: 'REMOVE'; payload: number }
  | { type: 'CLEAR' };

const CartContext = createContext<{
  state: State;
  dispatch: React.Dispatch<Action>;
  totalItems: number;
  totalPrice: number;
}>({} as any);

const MAX_QTY = 5;

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'ADD': {
      const idx = state.items.findIndex(i => i.id === action.payload.id);
      if (idx !== -1) {
        const items = [...state.items];
        items[idx].cantidad = Math.min(items[idx].cantidad + 1, MAX_QTY);
        return { items };
      }
      return { items: [...state.items, { ...action.payload, cantidad: 1 }] };
    }
    case 'INC':
      return {
        items: state.items.map(i =>
          i.id === action.payload && i.cantidad < MAX_QTY
            ? { ...i, cantidad: i.cantidad + 1 }
            : i
        ),
      };
    case 'DEC':
      return {
        items: state.items.map(i =>
          i.id === action.payload && i.cantidad > 1
            ? { ...i, cantidad: i.cantidad - 1 }
            : i
        ),
      };
    case 'REMOVE':
      return { items: state.items.filter(i => i.id !== action.payload) };
    case 'CLEAR':
      return { items: [] };
    default:
      return state;
  }
}

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(
    reducer,
    { items: [] },
    () => ({ items: JSON.parse(localStorage.getItem('cart') || '[]') })
  );

  useEffect(() => localStorage.setItem('cart', JSON.stringify(state.items)), [state]);

  const totalItems: number = state.items.reduce((acc: number, i: ProductCart) => acc + i.cantidad, 0);
  const totalPrice: number = state.items.reduce((acc: number, i: ProductCart) => acc + i.cantidad * i.price, 0);

  return (
    <CartContext.Provider value={{ state, dispatch, totalItems, totalPrice }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
