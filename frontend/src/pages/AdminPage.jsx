import React, { useState, useEffect } from 'react';

function AdminPage() {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [inputsStock, setInputsStock] = useState({});

  const [nuevoProducto, setNuevoProducto] = useState({
    nombre: '',
    descripcion: '',
    precio: '',
    stock: '',
    imagenUrl: ''
  });

  const traerProductos = () => {
    fetch('http://localhost:8080/api/productos')
      .then((res) => res.json())
      .then((data) => {
        setProductos(data);
        setCargando(false);
      })
      .catch((err) => {
        console.error("Error en Admin al traer productos:", err);
        setCargando(false);
      });
  };

  useEffect(() => {
    traerProductos();
  }, []);

  const handleCrearProducto = (e) => {
    e.preventDefault();
    
    if (!nuevoProducto.nombre || !nuevoProducto.precio || !nuevoProducto.stock) {
      alert("Por favor, completá los campos obligatorios (Nombre, Precio y Stock).");
      return;
    }

    const productoPayload = {
      ...nuevoProducto,
      precio: parseFloat(nuevoProducto.precio),
      stock: parseInt(nuevoProducto.stock)
    };

    fetch('http://localhost:8080/api/productos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(productoPayload)
    })
    .then(res => {
      if (res.ok) {
        alert("¡Producto creado y agregado al catálogo con éxito!");
        setNuevoProducto({ nombre: '', descripcion: '', precio: '', stock: '', imagenUrl: '' });
        traerProductos();
      } else {
        alert("Hubo un error al crear el producto en el servidor.");
      }
    })
    .catch(err => console.error("Error en POST producto:", err));
  };

  const handleActualizarStock = (prodId, productoCompleto) => {
    const cantidadASumar = parseInt(inputsStock[prodId] || 0);
    if (isNaN(cantidadASumar) || cantidadASumar <= 0) {
      alert("Por favor, ingresá una cantidad válida mayor a 0.");
      return;
    }

    const productoActualizado = {
      ...productoCompleto,
      stock: productoCompleto.stock + cantidadASumar
    };

    fetch(`http://localhost:8080/api/productos/${prodId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(productoActualizado)
    })
    .then(res => {
      if (res.ok) {
        alert(`¡Stock actualizado con éxito para ${productoCompleto.nombre}!`);
        setInputsStock(prev => ({ ...prev, [prodId]: '' }));
        traerProductos(); 
      } else {
        alert("No se pudo actualizar el stock en el servidor.");
      }
    })
    .catch(err => console.error("Error en PUT stock:", err));
  };

  if (cargando) {
    return <div className="seccion-contenedor" style={{ padding: '30px' }}>⚙️ Cargando panel de control...</div>;
  }

  return (
    <div className="seccion-contenedor" style={{ padding: '30px', display: 'flex', flexDirection: 'column', gap: '30px' }}>

      <div style={{ backgroundColor: '#fff', border: '1px solid #e0e0e0', borderRadius: '8px', padding: '25px', boxShadow: '0 4px 6px rgba(0,0,0,0.02)' }}>
        <h3 style={{ margin: '0 0 15px 0', color: 'var(--verde-musgo)', borderBottom: '1px solid #eee', paddingBottom: '10px' }}>
          Agregar Nuevo Producto al Catálogo
        </h3>
        <form onSubmit={handleCrearProducto} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
            <input 
              type="text" placeholder="Nombre del producto (Obligatorio)" required
              value={nuevoProducto.nombre}
              onChange={(e) => setNuevoProducto({...nuevoProducto, nombre: e.target.value})}
              style={{ flex: '1', minWidth: '200px', padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
            />
            <input 
              type="number" placeholder="Precio ($) (Obligatorio)" min="0" step="any" required
              value={nuevoProducto.precio}
              onChange={(e) => setNuevoProducto({...nuevoProducto, precio: e.target.value})}
              style={{ width: '180px', padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
            />
            <input 
              type="number" placeholder="Stock Inicial (Obligatorio)" min="0" required
              value={nuevoProducto.stock}
              onChange={(e) => setNuevoProducto({...nuevoProducto, stock: e.target.value})}
              style={{ width: '180px', padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
            />
          </div>
          <input 
            type="text" placeholder="Descripción breve"
            value={nuevoProducto.descripcion}
            onChange={(e) => setNuevoProducto({...nuevoProducto, descripcion: e.target.value})}
            style={{ padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
          />
          <input 
            type="text" placeholder="URL de la Imagen (Opcional)"
            value={nuevoProducto.imagenUrl}
            onChange={(e) => setNuevoProducto({...nuevoProducto, imagenUrl: e.target.value})}
            style={{ padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
          />
          <button 
            type="submit"
            style={{ padding: '12px', backgroundColor: 'var(--verde-musgo)', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold', marginTop: '5px' }}
          >
            Guardar Producto
          </button>
        </form>
      </div>

      <div style={{ backgroundColor: '#fff', border: '1px solid #e0e0e0', borderRadius: '8px', padding: '25px', boxShadow: '0 4px 6px rgba(0,0,0,0.02)' }}>
        <h3 style={{ margin: '0 0 15px 0', color: '#2c3e50', borderBottom: '1px solid #eee', paddingBottom: '10px' }}>
          Panel de Control de Inventario (Admin)
        </h3>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {productos.length === 0 ? (
            <p style={{ color: '#666', margin: 0 }}>No hay productos registrados en el sistema. ¡Agrega uno arriba!</p>
          ) : (
            productos.map(prod => (
              <div 
                key={prod.id} 
                className="admin-producto-fila" 
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '15px', backgroundColor: '#f9f9f9', borderRadius: '6px', border: '1px solid #eee', flexWrap: 'wrap', gap: '10px' }}
              >
                <span style={{ fontWeight: '600', minWidth: '120px' }}>{prod.nombre}</span>
                <span style={{ color: '#555' }}>Stock actual: <strong>{prod.stock} u.</strong></span>
                
                <div className="admin-actions" style={{ display: 'flex', gap: '10px', alignItems: 'center', width: '100%', maxWidth: '280px', justifyContent: 'flex-end' }}>
                  <input 
                    type="number" placeholder="Cant. a sumar" min="1"
                    value={inputsStock[prod.id] || ''}
                    onChange={(e) => setInputsStock(prev => ({ ...prev, [prod.id]: e.target.value }))}
                    style={{ flex: 1, padding: '8px 10px', borderRadius: '4px', border: '1px solid #ccc', minWidth: '80px' }}
                  />
                  <button 
                    onClick={() => handleActualizarStock(prod.id, prod)}
                    style={{ padding: '8px 16px', backgroundColor: '#2e7d32', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold', fontSize: '0.9em', whiteSpace: 'nowrap' }}
                  >
                    Reponer Stock
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminPage;