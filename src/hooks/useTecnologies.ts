import { useEffect, useState } from "react";
import { db } from '../data/db'
import type { Producto, ProductCart } from '../types/index'

export const useTecnologies = () => {

  const initialCarrito = (): ProductCart[] => {
    const localStorageCarrito = localStorage.getItem('carrito')
    return localStorageCarrito ? JSON.parse(localStorageCarrito) : []
  }

  // state
  const [data] = useState(db);
  const [carrito, setCarrito] = useState(initialCarrito)


  useEffect(() => {
    localStorage.setItem('carrito', JSON.stringify(carrito))
    initialCarrito()
  }, [carrito])

  function addCart(item: Producto) {
    const guitarExist: number = carrito.findIndex((producto: Producto) => producto.id === item.id)
    if (guitarExist !== -1) {
      if (carrito[guitarExist].cantidad < 5) {
        const updateCarrito = [...carrito]
        updateCarrito[guitarExist].cantidad++
        setCarrito(updateCarrito)
      }

    } else {
      const newItem = { ...item, cantidad: 1 }
      setCarrito([...carrito, newItem])
    }
  }
  function handleDelete(item: ProductCart) {
    setCarrito(prevState => prevState.filter((producto: ProductCart) => producto.id !== item.id))
  }

  function incrementarItem(id: number) {
    const updateCarrito = carrito.map((producto: ProductCart) => {
      if (id === producto.id && producto.cantidad < 5) {

        return {
          ...producto,
          cantidad: producto.cantidad + 1
        }
      } else {
        return producto
      }
    }
    )
    setCarrito(updateCarrito)
  }

  function decrementarItem(id: number) {
    const updateCarrito = carrito.map(guitar => {
      if (id === guitar.id && guitar.cantidad > 1) {
        return {
          ...guitar,
          cantidad: guitar.cantidad - 1
        }
      } else {
        return guitar
      }
    }
    )
    setCarrito(updateCarrito)
  }

  function deleteAll() {
    setCarrito([])
  }

  function saveLocalStorage() {

  }

  const isEmpty = carrito.length === 0

  const carTotal = carrito.reduce((acc, guitar) => acc + (guitar.price * guitar.cantidad), 0)


  return {
    // Variables
    data,
    carrito,
    setCarrito,
    initialCarrito,

    // Functions
    addCart,
    handleDelete,
    incrementarItem,
    decrementarItem,
    deleteAll,
    saveLocalStorage,
    isEmpty,
    carTotal

  }


}
