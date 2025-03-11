
import { Tecnologia } from "./components/Tecnologia"
import { Header } from "./components/Header"
import { useTecnologies } from "./hooks/useTecnologies"


function App() {


  const {
    data,
    carrito,

    // Functions
    addCart,
    handleDelete,
    incrementarItem,
    decrementarItem,
    deleteAll,
    isEmpty,
    carTotal
  } = useTecnologies()


  return (
    <>
      <Header carrito={carrito} handleDelete={handleDelete} decrementarItem={decrementarItem} incrementarItem={incrementarItem} deleteAll={deleteAll} isEmpty={isEmpty} carTotal={carTotal} />

      <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>

        <div className="row mt-5">
          {data.map(producto => (
            <Tecnologia key={producto.id} producto={producto} addCart={addCart} />
          )
          )}

        </div>
      </main>
      <footer className="bg-dark mt-5 py-5">
        <div className="container-xl">
          <p className="text-white text-center fs-4 mt-4 m-md-0">PcDev - Todos los derechos Reservados</p>
        </div>
      </footer>

    </>
  )
}

export default App
