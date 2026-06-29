import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function Historial() {
  const [pedidos, setPedidos] = useState([]);
  const [cargando, setCargando] = useState(true);
  
  const location = useLocation();
  const [notificacion, setNotificacion] = useState(location.state?.mensajeExito || null);

  const cargarPedidos = () => {
    fetch('http://localhost:8080/api/pedidos')
      .then((res) => res.json())
      .then((data) => {
        setPedidos(data);
        setCargando(false);
      })
      .catch((err) => {
        console.error("Error al traer el historial:", err);
        setCargando(false);
      });
  };

  useEffect(() => {
    cargarPedidos();

    if (notificacion) {
      const timer = setTimeout(() => {
        setNotificacion(null);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [notificacion]);

  const handleVaciarHistorial = () => {
    if (!window.confirm("¿Estás seguro de que querés eliminar permanentemente todo tu historial de pedidos?")) return;

    fetch('http://localhost:8080/api/pedidos', {
      method: 'DELETE'
    })
    .then(res => {
      if (res.ok) {
        setNotificacion("¡Historial vaciado correctamente!");
        setPedidos([]); 
      } else {
        alert("Hubo un error al intentar vaciar el historial.");
      }
    })
    .catch(err => console.error("Error en DELETE historial:", err));
  };

  if (cargando) {
    return <div className="seccion-contenedor" style={{ padding: '30px' }}>🌱 Buscando tus pedidos en el servidor...</div>;
  }

  return (
    <div className="seccion-contenedor" style={{ padding: '30px' }}>

      {notificacion && (
        <div style={{
          backgroundColor: '#e8f5e9',
          color: '#2e7d32',
          border: '1px solid #c8e6c9',
          padding: '15px 20px',
          borderRadius: '8px',
          marginBottom: '20px',
          fontWeight: '600',
          boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
          animation: 'fadeIn 0.5s ease'
        }}>
          {notificacion}
        </div>
      )}
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '2px solid var(--verde-hoja)', paddingBottom: '10px' }}>
        <h2 style={{ color: 'var(--verde-musgo)', margin: 0 }}>
          Historial de Pedidos Realizados
        </h2>
        
        {pedidos.length > 0 && (
          <button 
            onClick={handleVaciarHistorial}
            style={{
              padding: '8px 16px',
              backgroundColor: '#d32f2f',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              fontWeight: 'bold',
              fontSize: '0.9em'
            }}
          >
            Vaciar Historial
          </button>
        )}
      </div>

      {pedidos.length === 0 ? (
        <p style={{ marginTop: '20px' }}>Todavía no registraste ninguna compra en EcoMarket.</p>
      ) : (
        <div style={{ marginTop: '20px', display: 'flex', flexDirection: 'column', gap: '15px' }}>
          {pedidos.map((pedido) => (
            <div 
              key={pedido.id} 
              style={{ 
                border: '1px solid #e0e0e0', 
                borderRadius: '8px', 
                padding: '20px', 
                backgroundColor: '#f9f9f9',
                boxShadow: '0 2px 4px rgba(0,0,0,0.02)'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px dashed #ccc', paddingBottom: '10px', marginBottom: '10px' }}>
                <span style={{ fontWeight: 'bold', color: 'var(--verde-musgo)' }}>Pedido N°: {pedido.id}</span>
                <span style={{ color: '#666', fontSize: '0.9em' }}>
                  Fecha: {pedido.fechaConfirmacion ? new Date(pedido.fechaConfirmacion).toLocaleDateString() : 'Sin fecha'}
                </span>
              </div>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                {pedido.items && pedido.items.map((item) => (
                  <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.95em' }}>
                    <span>{item.producto?.nombre || 'Producto'} x{item.cantidad}</span>
                    <span style={{ color: '#444' }}>${item.precioUnitario * item.cantidad}</span>
                  </div>
                ))}
              </div>

              <div style={{ textAlign: 'right', marginTop: '12px', paddingTop: '10px', borderTop: '1px solid #eee', fontWeight: 'bold', fontSize: '1.1em', color: 'var(--verde-hoja)' }}>
                Total Abonado: ${pedido.total}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Historial;