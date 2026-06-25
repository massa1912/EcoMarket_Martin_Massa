package com.ecomarket.backend.services;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ecomarket.backend.models.ItemPedido;
import com.ecomarket.backend.models.Pedido;
import com.ecomarket.backend.models.Producto;
import com.ecomarket.backend.repositories.PedidoRepository;
import com.ecomarket.backend.repositories.ProductoRepository;

import jakarta.transaction.Transactional;

@Service
public class PedidoService {
    @Autowired
    private PedidoRepository pedidoRepository;

    @Autowired
    private ProductoRepository productoRepository;

    public List<Pedido> obtenerHistorial() {
        return pedidoRepository.findAll();
    }

    @Transactional
    public Pedido crearPedido(Pedido pedido) {
        pedido.setFechaConfirmacion(LocalDateTime.now());

        Double totalAcumulado = 0.0;

        for (ItemPedido item : pedido.getItems()) {
            Producto productoBD = productoRepository.findById(item.getProducto().getId())
            .orElseThrow(() -> new RuntimeException("Producto no encontrado con ID: " + item.getProducto().getId()));

            if (productoBD.getStock() < item.getCantidad()) {
                throw new RuntimeException("Stock insuficiente para el producto: " + productoBD.getNombre());
            }

            productoBD.setStock(productoBD.getStock() - item.getCantidad());
            productoRepository.save(productoBD);

            item.setPedido(pedido);
            item.setProducto(productoBD);
            item.setPrecioUnitario(productoBD.getPrecio());

            totalAcumulado += item.getPrecioUnitario() * item.getCantidad();
        }

        pedido.setTotal(totalAcumulado);

        return pedidoRepository.save(pedido);
    }
}
