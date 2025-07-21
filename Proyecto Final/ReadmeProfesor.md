# Mini Proyecto con MongoDB - JavaScript y Python

## Proyecto 4: Sistema de Inventario de Tienda

**Dificultad**: ⭐⭐⭐

---

## 📄 Descripción

Sistema de gestión de inventario para una tienda que maneja productos, proveedores y movimientos de stock.

---

## ✅ Requerimientos

- Catálogo de productos con stock actual
- Registro de proveedores y sus productos
- Movimientos de entrada y salida de mercancía
- Alertas de stock bajo

---

## 🗂️ Estructura de Datos

### 📦 Colección: `productos`

```js
{
  _id: ObjectId,
  codigo: "PROD001",
  nombre: "Laptop HP",
  categoria: "Electrónicos",
  precio: 799.99,
  stockActual: 15,
  stockMinimo: 5,
  proveedorId: ObjectId,
  fechaUltimaActualizacion: ISODate
}
```

### 🔁 Colección: movimientos

```js
{
  _id: ObjectId,
  productoId: ObjectId,
  tipo: "entrada", // "Entrada" o "Salida"
  cantidad: 10,
  motivo: "Compra a proveedor",
  fecha: ISODate,
  usuario: "admin"
}
```

### 🧾 Colección: proveedores

```js
{
  _id: ObjectId,
  nombre: "Distribuidora Tech",
  contacto: "Juan López",
  telefono: "+1234567890",
  email: "ventas@distritech.com",
  productosOfrecidos: ["PROD001", "PROD002"]
}
```

### 🧠 Funciones a Implementar

**1 -** `agregarProducto(producto)` - Añadir producto al catálogo.

**2 -** `registrarMovimiento(movimiento)` - Registrar entrada o salida de stock.

**3 -** `consultarStock(codigo)` - Ver stock actual de un producto por su código.

**4 -** `productosStockBajo()` - Listar productos con stock por debajo del mínimo.

**5 -** `reporteMovimientos(fechaInicio, fechaFin)` - Reporte de movimientos en un período determinado.

## CONDICIONES

La entrega del proyecto final consiste en subir un archivo de texto con la dirección del repositorio donde estén los archivos del código fuente. **En el README.md se deben incluir los integrantes del grupo** que hace la entrega.

Se debe elegir alguno **(solo uno)** de los proyectos del documento de los proyectos elegibles. En el README.md se debe aclarar cuál de los proyectos es el que se implementó. Se admite el uso de Python con PyMongo o de Node.js (Javascript) con Mongoose. En el README.md se debe aclarar también esta elección.

La interface de uso puede ser la consola (o terminal), una app web o una API. Cualquiera de estas opciones es admisible y debe aclararse en el README.md del proyecto.

La fecha final para la entrega es el **22 de julio a las 23:59**.

_NOTA_: Si se opta por desarrollar un proyecto que no esté incluido en la lista de proyectos elegibles, se debe enviar la propuesta de proyecto hasta el martes 8 de julio por email.
