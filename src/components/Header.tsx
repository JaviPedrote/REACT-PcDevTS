import { ProductCart } from "../types";

type propsHeader = {
  carrito: ProductCart[];
  handleDelete: (item: ProductCart) => void;
  incrementarItem: (id: number) => void;
  decrementarItem: (id: number) => void;
  deleteAll: () => void;
  isEmpty: boolean;
  carTotal: number;
};

export const Header = ({
  carrito,
  handleDelete,
  incrementarItem,
  decrementarItem,
  deleteAll,
  isEmpty,
  carTotal,
}: propsHeader) => {
  return (
    <header className="py-5 header">
      <div className="container-xl">
        <div className="row justify-content-center justify-content-md-between">
          <div className="col-8 col-md-3">
            <a className="portfolio" href="https://www.kodedev.tech/">
              Portfolio
            </a>
          </div>
          <nav className="col-md-6 a mt-5 d-flex align-items-start justify-content-end">
            <div className="carrito">
              <img
                className="img-fluid"
                src="/img/carrito.png"
                alt="imagen carrito"
              />

              <div id="carrito" className="bg-white p-3">
                {isEmpty ? (
                  <p className="text-center">El carrito esta vacio</p>
                ) : (
                  <>
                    <table className="w-100 table">
                      <thead>
                        <tr>
                          <th>Imagen</th>
                          <th>Nombre</th>
                          <th>Precio</th>
                          <th>Cantidad</th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody>
                        {carrito.map((guitar) => (
                          <tr key={guitar.id}>
                            <td>
                              <img
                                className="img-fluid"
                                src={`img/${guitar.image}.webp`}
                                alt="imagen guitarra"
                              />
                            </td>
                            <td>{guitar.name}</td>
                            <td className="fw-bold">{guitar.price}</td>
                            <td className="flex align-items-start gap-4">
                              <button
                                onClick={() => decrementarItem(guitar.id)}
                                type="button"
                                className="btn btn-dark"
                              >
                                -
                              </button>
                              {guitar.cantidad}
                              <button
                                onClick={() => incrementarItem(guitar.id)}
                                type="button"
                                className="btn btn-dark"
                              >
                                +
                              </button>
                            </td>
                            <td>
                              <button
                                onClick={() => handleDelete(guitar)}
                                className="btn btn-danger"
                                type="button"
                              >
                                X
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    <p className="text-end">
                      pagar: <span className="fw-bold"></span>
                      {carTotal}
                    </p>
                  </>
                )}
                <button
                  onClick={deleteAll}
                  className="btn btn-dark w-100 mt-3 p-2"
                >
                  Vaciar Carrito
                </button>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};
