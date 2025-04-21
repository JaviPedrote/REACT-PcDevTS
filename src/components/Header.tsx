import { ShoppingCart } from "lucide-react";
import { useCart } from "../contexts/CartContext";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "../components/ui/popover";

export const Header = () => {
  const { state, dispatch, totalItems, totalPrice } = useCart();

  return (
    <header className="bg-gradient-to-r from-black/40 to-black/0 py-6 px-8 sticky top-0 z-30 backdrop-blur-sm outline">
      <div className="max-w-screen-xl mx-auto px-4 flex items-center justify-between">
        <a
          href="https://www.kodedev.tech/"
          className="lg:text-3xl font-black text-brand"
        >
          Portfolio
        </a>

        {/* CART */}
        <Popover>
          <PopoverTrigger asChild>
            <button className="relative ">
              <ShoppingCart
                className="w-5 h-5
                  sm:w-6 sm:h-6
                  md:w-7 md:h-7
                  lg:w-9 lg:h-9 "
              />
              {totalItems > 0 && (
                <span className="absolute -right-2 -top-3 w-5 h-5 rounded-full bg-brand text-xs text-black grid place-content-center animate-pulse">
                  {totalItems}
                </span>
              )}
            </button>
          </PopoverTrigger>

          <PopoverContent className="w-80">
            {state.items.length === 0 ? (
              <p className="text-center py-4">El carrito está vacío</p>
            ) : (
              <>
                <ul className="divide-y">
                  {state.items.map(({ id, image, name, price, cantidad }) => (
                    <li key={id} className="flex gap-3 py-2">
                      <img
                        src={`img/${image}.webp`}
                        className="w-12 h-12 object-cover"
                      />
                      <div className="flex-1">
                        <p className="font-medium">{name}</p>
                        <p className="text-sm text-muted-foreground">
                          {cantidad} × {format(price)}
                        </p>
                      </div>
                      <div className="flex flex-col gap-1">
                        <button
                          onClick={() => dispatch({ type: "INC", payload: id })}
                        >
                          ＋
                        </button>
                        <button
                          onClick={() => dispatch({ type: "DEC", payload: id })}
                        >
                          −
                        </button>
                      </div>
                      <button
                        className="ml-2 text-red-600"
                        onClick={() =>
                          dispatch({ type: "REMOVE", payload: id })
                        }
                      >
                        ×
                      </button>
                    </li>
                  ))}
                </ul>

                <p className="text-right mt-4 font-bold">
                  {format(totalPrice)}
                </p>
                <button
                  className="btn btn-dark w-full mt-3"
                  onClick={() => dispatch({ type: "CLEAR" })}
                >
                  Vaciar carrito
                </button>
              </>
            )}
          </PopoverContent>
        </Popover>
      </div>
    </header>
  );
};

const format = (n: number) =>
  new Intl.NumberFormat("es-ES", { style: "currency", currency: "EUR" }).format(
    n
  );
