# Trabajo Práctico - Bases de Datos 2  
**Tema:** Fundamentos, Integridad, Concurrencia, Optimización, Seguridad y Mantenimiento  
**Motor utilizado:** MySQL  

---

## Fundamentos, Integridad y Concurrencia

### Ejercicio 1: Reglas de Integridad  
Si se elimina un estudiante que tiene cursos inscritos, se violaría la **integridad referencial** si existen claves foráneas apuntando a ese estudiante desde la tabla `Inscripciones`.

**Mecanismos para evitarlo:**
- Usar **restricciones ON DELETE RESTRICT** en la clave foránea.
- Alternativamente, usar **ON DELETE CASCADE** si se desea eliminar también las inscripciones asociadas automáticamente.
- Validaciones lógicas desde la aplicación.

---

### Ejercicio 2: Implementación de Restricciones  
```sql
CREATE TABLE Estudiantes (
    id INT PRIMARY KEY,
    nombre VARCHAR(100)
);

CREATE TABLE Cursos (
    id INT PRIMARY KEY,
    nombre VARCHAR(100)
);

CREATE TABLE Matriculas (
    id_estudiante INT,
    id_curso INT,
    FOREIGN KEY (id_estudiante) REFERENCES Estudiantes(id),
    FOREIGN KEY (id_curso) REFERENCES Cursos(id)
);
```

**Intento de inserción que viola integridad:**
```sql
INSERT INTO Matriculas (id_estudiante, id_curso) VALUES (999, 1);
```

**Error generado:**
```
ERROR 1452 (23000): Cannot add or update a child row: a foreign key constraint fails
```

---

### Ejercicio 3: Concurrencia  
**Simulación:** Dos usuarios intentan actualizar el mismo saldo al mismo tiempo.

```sql
-- Usuario A
START TRANSACTION;
SELECT saldo FROM Cuentas WHERE id = 1; -- saldo = 100
UPDATE Cuentas SET saldo = 80 WHERE id = 1;
-- no hace COMMIT todavía

-- Usuario B
START TRANSACTION;
SELECT saldo FROM Cuentas WHERE id = 1;
UPDATE Cuentas SET saldo = 120 WHERE id = 1;
```

**Comparación:**

- `READ COMMITTED`: el usuario B ve el saldo original (100), puede pisar el cambio de A si A aún no hizo commit.
- `SERIALIZABLE`: el usuario B esperará a que A termine o recibirá un error si hay conflicto.

---

## Optimización de Consultas, Índices y Vistas

### Ejercicio 4: Plan de Ejecución  
**Consulta sin índice:**
```sql
EXPLAIN SELECT * FROM Productos WHERE nombre = 'Teclado';
```

**Resultado:**
- `type`: ALL (full table scan)
- `rows`: >100000

**Consulta con índice:**
```sql
CREATE INDEX idx_nombre ON Productos(nombre);
EXPLAIN SELECT * FROM Productos WHERE nombre = 'Teclado';
```

**Resultado:**
- `type`: ref o index
- `rows`: mucho menor, mejora significativa

---

### Ejercicio 5: Creación de Índices  
**Consulta:**
```sql
SELECT * FROM Ventas WHERE producto_id = 3 AND fecha BETWEEN '2023-01-01' AND '2023-01-31';
```

**Índices creados:**
```sql
CREATE INDEX idx_producto ON Ventas(producto_id);
CREATE INDEX idx_fecha ON Ventas(fecha);
CREATE INDEX idx_producto_fecha ON Ventas(producto_id, fecha);
```

**Mejor rendimiento:**
- El índice compuesto `idx_producto_fecha` ofrece mejor rendimiento para esta consulta específica.

---

### Ejercicio 6: Vistas  
```sql
CREATE VIEW VentasMensuales AS
SELECT producto_id, MONTH(fecha) AS mes, SUM(cantidad) AS total_vendido
FROM Ventas
GROUP BY producto_id, MONTH(fecha);
```

**Consulta sobre la vista:**
```sql
SELECT producto_id, SUM(total_vendido) AS total
FROM VentasMensuales
GROUP BY producto_id
ORDER BY total DESC
LIMIT 5;
```

---

## Administración, Seguridad y Mantenimiento

### Ejercicio 7: Gestión de Permisos  
```sql
CREATE USER 'analista'@'localhost' IDENTIFIED BY 'clave_segura';
GRANT SELECT ON Ventas TO 'analista'@'localhost';
FLUSH PRIVILEGES;
```

**Intento de inserción:**
```sql
INSERT INTO Ventas (producto, fecha, cantidad) VALUES ('Monitor', '2023-10-01', 5);
```

**Error:**
```
ERROR 1142 (42000): INSERT command denied to user 'analista'@'localhost' for table 'Ventas'
```

---

### Ejercicio 8: Seguridad y Auditoría  
```sql
CREATE TABLE AuditoriaClientes (
    id_auditoria INT AUTO_INCREMENT PRIMARY KEY,
    id_cliente INT,
    accion VARCHAR(50),
    usuario VARCHAR(50),
    fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    detalle TEXT
);

DELIMITER $$

CREATE TRIGGER auditoria_clientes_update
BEFORE UPDATE ON Clientes
FOR EACH ROW
BEGIN
    INSERT INTO AuditoriaClientes (id_cliente, accion, usuario, detalle)
    VALUES (
        OLD.id_cliente,
        'UPDATE',
        USER(),
        CONCAT('Nombre: ', OLD.nombre, ' → ', NEW.nombre, ', ',
               'Email: ', OLD.email, ' → ', NEW.email)
    );
END$$

DELIMITER ;
```

---

### Ejercicio 9: Backup y Restore

#### **MySQL - Backup:**
```bash
mysqldump -u root -p --all-databases > backup_completo.sql
```

#### **MySQL - Restore:**
```bash
mysql -u root -p < backup_completo.sql
```

#### **Simular pérdida y recuperación:**
```sql
DROP DATABASE mi_base_de_datos;
```
Luego se recupera con el backup.

#### **PostgreSQL - Backup:**
```bash
pg_dump -U postgres -F c -b -v -f backup_completo.dump mi_base_de_datos
```

#### **PostgreSQL - Restore:**
```bash
pg_restore -U postgres -d mi_base_de_datos -v backup_completo.dump
```

---

