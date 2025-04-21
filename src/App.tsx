import { Header } from './components/Header';
import { ProductCard } from './components/ProductCard';
import { CartProvider } from './contexts/CartContext';
import { db } from './data/db';

export default function App() {
  return (
    <CartProvider>
      <Header />

      <main className="max-w-screen-2xl mx-auto px-4 mt-10">
        <h2 className="text-center text-4xl font-black text-brand mb-10">Nuestra colección</h2>

        <section className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {db.map(producto => (
            <ProductCard key={producto.id} producto={producto} />
          ))}
        </section>
      </main>

      <footer className="bg-black text-white py-8 mt-16">
        <p className="text-center">&copy; {new Date().getFullYear()} PcDev — Todos los derechos reservados</p>
      </footer>
    </CartProvider>
  );
}
