# EcoMarket - Plataforma de Comercio Electrónico Sostenible

Este proyecto consiste en una aplicación web de comercio electrónico modular y desacoplada (*Full-Stack*) desarrollada como Trabajo Práctico Integrador para la materia **Taller de Construcción de Software** en la **Universidad Siglo 21**.

La plataforma permite a los usuarios navegar por un catálogo de productos ecológicos, gestionar un carrito de compras volátil y confirmar órdenes de compra con persistencia transaccional, además de ofrecer un panel de administración integrado para el control de stock y alta de productos.

---

## Integrantes del Grupo

* **Massa, Martín** (Ingeniería de Software)

---

## Tecnologías y Herramientas Utilizadas

### Backend

* **Lenguaje:** Java
* **Framework:** Spring Boot
* **Persistencia:** Spring Data JPA + Hibernate
* **Base de Datos:** MySQL
* **Gestión de dependencias:** Maven / Lombok

### Frontend

* **Entorno de desarrollo:** Node.js + Vite
* **Librería principal:** React (Componentes funcionales y Hooks nativos)
* **Enrutamiento:** React Router Dom
* **Gestión de Estado:** Context API + LocalStorage

---

## Instrucciones de Ejecución Local

### 1. Requisitos Previos

Asegurate de tener instalado en tu sistema:

* Java Development Kit (JDK) 17 o superior.
* Node.js (versión 18 o superior) y npm.
* Motor de base de datos MySQL corriendo localmente.

---

### 2. Configuración y Ejecución del Backend (Spring Boot)

1. Dirigite a la carpeta del backend en tu terminal:

   ```bash
   cd backend
   ```

2. **Configuración de Credenciales Seguras:** Por motivos de seguridad, el archivo de propiedades local con las credenciales reales está ignorado en el repositorio público. Copiá el archivo de plantilla y renombralo en tu máquina local:

   ```bash
   cp src/main/resources/application.properties.example src/main/resources/application.properties
   ```

   (Si estás en Windows PowerShell, podés usar: `copy src/main/resources/application.properties.example src/main/resources/application.properties`)

3. Abrí el nuevo archivo `application.properties` que se generó y colocá tu usuario y contraseña local de MySQL.

4. Compilá y ejecutá la aplicación utilizando tu IDE de preferencia o mediante la terminal con Maven:

   ```bash
   ./mvnw spring-boot:run
   ```

5. El servidor backend iniciará en el puerto local: `http://localhost:8080`

---

### 3. Configuración y Ejecución del Frontend (React)

1. Abrí una nueva terminal y dirigite a la carpeta del frontend:

   ```bash
   cd frontend
   ```

2. Instalá las dependencias del proyecto utilizando npm:

   ```bash
   npm install
   ```

3. Iniciá el servidor de desarrollo local con Vite:

   ```bash
   npm run dev
   ```

4. La aplicación web interactiva se abrirá de forma automática en el puerto local: `http://localhost:5173`

---

## Decisiones de Diseño e Ingeniería Destacadas

* **Arquitectura de Capas Separadas:** El backend implementa un patrón estricto dividido en Controladores (`@RestController`), Servicios (`@Service`), Repositorios (`JpaRepository`) y Modelos (`@Entity`) para asegurar el bajo acoplamiento.

* **Transaccionalidad Segura (ACID):** El procesamiento de pedidos implementa la anotación `@Transactional`. En caso de que se intente comprar múltiples artículos y uno de ellos no posea stock suficiente, el sistema ejecuta un rollback automático impidiendo mutaciones inconsistentes de los datos.

* **Carrito Volátil en el Cliente:** Para mantener el backend sin estado (stateless), el carrito de compras se procesa en el frontend mediante `Context API` e interactúa con el `localStorage` del navegador. El servidor interviene exclusivamente ante la confirmación final de la orden de compra a través de una petición síncrona de tipo `POST`.

* **Interfaz Adaptativa (Responsive):** La UI se reestructura mediante Media Queries en CSS, incorporando un Menú Hamburguesa interactivo controlado por estados en dispositivos móviles para optimizar la navegación.
