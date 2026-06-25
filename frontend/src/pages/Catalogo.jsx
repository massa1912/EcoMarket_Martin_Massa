import React, { useState } from 'react';
import { useCarrito } from '../context/CarritoContext';

const PRODUCTOS_MOCK = [
    {id: 1, nombre: 'Manzana', precio: 1000, stock: 15 },
    { id: 2, nombre: 'Aceite de Oliva Extra Virgen', precio: 8500, stock: 8 },
    { id: 3, nombre: 'Miel Pura de Abeja', precio: 3400, stock: 20 },
];

function Catalogo() {
    const [productos] = useState(PRODUCTOS_MOCK);
    const { agregarProducto } = useCarrito();

    return(
        <div className="seccion-contenedor" style={{ padding: '30px' }}>
            <h2 style={{ color: 'var(--verde-musgo)', borderBottom: '2px solid var(--verde-hoja)', paddingBottom: '10px', margin: 0 }}>
                Catálogo de Productos EcoMarket
            </h2>
            
            <div className="catalogo-grid">
                {productos.map((prod) => (
                    <div key={prod.id} className="producto-card">
                        <div>
                            <h3 style={{ margin: '0 0 10px 0', color: 'var(--verde-musgo)' }}>{prod.nombre}</h3>
                            <p style={{ fontWeight: 'bold', fontSize: '1.1em', margin: '10px 0' }}>
                                ${prod.precio}
                            </p>
                            <p style={{ color: prod.stock < 10 ? '#D97706' : 'var(--verde-hoja)', fontWeight: '500', margin: '5px 0' }}>
                                Stock: {prod.stock} unidades
                            </p>
                        </div>
                        <button 
                            style={{ 
                                width: '100%', 
                                padding: '10px', 
                                backgroundColor: 'var(--verde-musgo)', 
                                color: 'var(--blanco)', 
                                border: 'none', 
                                borderRadius: '6px',
                                cursor: 'pointer',
                                fontWeight: 'bold',
                                marginTop: '15px'
                            }}
                            onClick={() => agregarProducto(prod)}
                        >
                            Agregar al Carrito
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Catalogo;