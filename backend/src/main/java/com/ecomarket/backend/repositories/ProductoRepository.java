package com.ecomarket.backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ecomarket.backend.models.Producto;

@Repository
public interface ProductoRepository extends JpaRepository<Producto, Long> {
    
}
