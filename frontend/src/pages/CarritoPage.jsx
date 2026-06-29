import React from 'react';
import { useCarrito } from '../context/CarritoContext';
import { useNavigate } from 'react-router-dom';

function CarritoPage() {
  const { carrito, agregarProducto, restarProducto, limpiarCarrito } = useCarrito();
  const navigate = useNavigate();

  const totalCompra = carrito.reduce((acumulador, item) => acumulador + (item.precio * item.cantidad), 0);

  const handleConfirmarCompra = () => {
    if (carrito.length === 0) return;
    const nuevoPedido = {
      mensajePersonalizado: "Pedido web desde React",
      total: totalCompra,
      items: carrito.map(item => ({
        cantidad: item.cantidad,
        precioUnitario: item.precio,
        producto: {
          id: item.id
        }
      }))
    };

    fetch('http://localhost:8080/api/pedidos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(nuevoPedido)
      })
      .then(async res => {
        if (res.status === 201 || res.ok) {
          limpiarCarrito();
          navigate('/historial', { 
            state: { mensajeExito: "¡Compra procesada y registrada con éxito!" } 
          });
        } else {
          const errorMsg = await res.text();
          alert(`Error del servidor: ${errorMsg}`);
        }
      })
      .catch(err => {
        console.error("Error conectando con Spring Boot:", err);
        alert("No se pudo conectar con el servidor backend.");
      });
  };

  return (
    <div className="seccion-contenedor" style={{ padding: '30px' }}>
      <h2 style={{ color: 'var(--verde-musgo)', borderBottom: '2px solid var(--verde-hoja)', paddingBottom: '10px', margin: 0 }}>
        Tu Pedido
      </h2>

      {carrito.length === 0 ? (
        <p style={{ marginTop: '20px' }}>El carrito está vacío. ¡Volvé al catálogo para sumar productos!</p>
      ) : (
        <div style={{ marginTop: '20px' }}>
          
          <div className="carrito-contenedor">
            {carrito.map((item) => (
              <div key={item.id} className="carrito-item">
                
                <div style={{ flex: 1 }}>
                  <strong style={{ fontSize: '1.1em' }}>{item.nombre}</strong>
                  <div style={{ fontSize: '0.9em', color: '#666', marginTop: '4px' }}>
                    Precio unitario: ${item.precio}
                  </div>
                  
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '8px' }}>
                    <button 
                      style={{ padding: '2px 8px', borderRadius: '4px', border: '1px solid #ccc', cursor: 'pointer', fontWeight: 'bold' }}
                      onClick={() => restarProducto(item.id)}
                    >
                      -
                    </button>
                    <span style={{ fontWeight: 'bold', color: 'var(--verde-hoja)' }}>{item.cantidad} u.</span>
                    <button 
                      style={{ padding: '2px 8px', borderRadius: '4px', border: '1px solid #ccc', cursor: 'pointer', fontWeight: 'bold' }}
                      onClick={() => agregarProducto(item)}
                    >
                      +
                    </button>
                  </div>
                </div>

                <div style={{ fontWeight: '600', fontSize: '1.05em', color: 'var(--texto-oscuro)' }}>
                  Subtotal: ${item.precio * item.cantidad}
                </div>

              </div>
            ))}
            
            <div style={{ textAlign: 'right', marginTop: '20px', fontSize: '1.3em', fontWeight: 'bold', color: 'var(--verde-musgo)' }}>
              Total Pedido: ${totalCompra}
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
            <button 
              style={{ 
                padding: '12px 24px', 
                backgroundColor: '#d32f2f', 
                color: 'white', 
                border: 'none', 
                borderRadius: '6px', 
                cursor: 'pointer', 
                fontWeight: 'bold' 
              }}
              onClick={limpiarCarrito}
            >
              Vaciar Carrito
            </button>

            <button 
              style={{ 
                padding: '12px 24px', 
                backgroundColor: 'var(--verde-musgo)', 
                color: 'white', 
                border: 'none', 
                borderRadius: '6px', 
                cursor: 'pointer', 
                fontWeight: 'bold',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
              }}
              onClick={handleConfirmarCompra}
            >
              Confirmar Compra
            </button>
          </div>

        </div>
      )}
    </div>
  );
}

export default CarritoPage;