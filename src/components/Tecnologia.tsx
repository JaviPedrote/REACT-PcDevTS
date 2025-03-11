import type { Producto } from '../types/index';

type TecnologiaProps={
    producto: Producto;
    addCart: (item: Producto) => void;
  }

  export const Tecnologia= ({ producto, addCart } : TecnologiaProps) => {

const {name, description, price} = producto

    
  return (
    <>
        <div className="col-md-6 col-lg-4 my-4 row align-items-center">
                <div className="col-4">
                    <img className="img-fluid" src={`img/${producto.image}.webp`} alt="imagen producto" />
                </div>
                <div className="col-8">
                    <h3 className="text-black fs-4 fw-bold text-uppercase">{name}</h3>
                    <p>{description}</p>
                    <p className="fw-black text-primary fs-3">{price}€</p>
                    <button onClick={()=>addCart(producto)}
                        type="button"
                        className="btn btn-dark w-100"
                    >Agregar al Carrito</button>
                </div>
            </div>  
    </>
  )
}
