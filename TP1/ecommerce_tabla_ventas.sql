CREATE TABLE Ventas (
    id INT PRIMARY KEY AUTO_INCREMENT,
    producto_id INT,
    cantidad INT,
    fecha DATE,
    FOREIGN KEY (producto_id) REFERENCES productos(id)
);

-- Asegúrate de tener activado el modo seguro para AUTO_INCREMENT
SET AUTOCOMMIT = 0;

-- Generar 10,000 ventas aleatorias
DELIMITER $$

CREATE PROCEDURE generar_ventas()
BEGIN
  DECLARE i INT DEFAULT 0;
  WHILE i < 10000 DO
    INSERT INTO Ventas (producto_id, cantidad, fecha)
    VALUES (
      FLOOR(1 + RAND() * 100000), -- producto_id entre 1 y 100000
      FLOOR(1 + RAND() * 5),       -- cantidad entre 1 y 5
      DATE_SUB(CURDATE(), INTERVAL FLOOR(RAND() * 365) DAY) -- fecha aleatoria en el último año
    );
    SET i = i + 1;
  END WHILE;
END$$

DELIMITER ;

-- Ejecutar el procedimiento
CALL generar_ventas();

-- Eliminar el procedimiento si ya no lo necesitas
DROP PROCEDURE generar_ventas;

COMMIT;