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
  tipo: "entrada", // "entrada" o "salida"
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

**1 -** ```agregarProducto(producto)``` - Añadir producto al catálogo.

**2 -** ```registrarMovimiento(movimiento)``` - Registrar entrada o salida de stock.

**3 -** ```consultarStock(codigo)``` - Ver stock actual de un producto por su código.

**4 -** ```productosStockBajo()``` - Listar productos con stock por debajo del mínimo.

**5 -** ```reporteMovimientos(fechaInicio, fechaFin)``` - Reporte de movimientos en un período determinado.






