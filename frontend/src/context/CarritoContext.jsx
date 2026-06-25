import React, { createContext, useContext, useState, useEffect } from 'react';

const CarritoContext = createContext();

export function CarritoProvider({ children }) {
  const [carrito, setCarrito] = useState(() => {
    const carritoGuardado = localStorage.getItem('ecomarket_carrito');
    return carritoGuardado ? JSON.parse(carritoGuardado) : [];
  });

  useEffect(() => {
    localStorage.setItem('ecomarket_carrito', JSON.stringify(carrito));
  }, [carrito]);

  const agregarProducto = (producto) => {
    setCarrito((itemsActuales) => {
      const existe = itemsActuales.find((item) => item.id === producto.id);
      if (existe) {
        return itemsActuales.map((item) =>
          item.id === producto.id ? { ...item, cantidad: item.cantidad + 1 } : item
        );
      }
      return [...itemsActuales, { ...producto, cantidad: 1 }];
    });
  };

  const restarProducto = (id) => {
    setCarrito((itemsActuales) => {
      const producto = itemsActuales.find((item) => item.id === id);
      if (!producto) return itemsActuales;
      if (producto.cantidad === 1) {
        return itemsActuales.filter((item) => item.id !== id);
      }
      return itemsActuales.map((item) =>
        item.id === id ? { ...item, cantidad: item.cantidad - 1 } : item
      );
    });
  };

  const limpiarCarrito = () => {
    setCarrito([]);
  };

  const cantidadTotalItems = carrito.reduce((total, item) => total + item.cantidad, 0);

  return (
    <CarritoContext.Provider value={{ carrito, agregarProducto, restarProducto, limpiarCarrito, cantidadTotalItems }}>
      {children}
    </CarritoContext.Provider>
  );
}

export function useCarrito() {
  return useContext(CarritoContext);
}