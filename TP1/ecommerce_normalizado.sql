SELECT * FROM productos LIMIT 10;

CREATE TABLE marcas (
	id int auto_increment primary key not null unique,
	marca varchar(255) unique
);

CREATE TABLE categorias (
	id int auto_increment primary key not null unique,
	categoria varchar(255) unique
);

SELECT DISTINCT marca FROM productos;

INSERT INTO marcas(marca) VALUES
('Acme'),('Globex'),('Hooli'),('Initech'),('Oscorp'),('Soylent'),('Stark'),('Umbrella'),('Wayne'),('Wonka');

SELECT * FROM marcas;

ALTER TABLE productos ADD COLUMN marca_id INT;

UPDATE productos p
JOIN marcas m ON p.marca = m.marca
SET p.marca_id = m.id;

SELECT * FROM productos;

ALTER TABLE productos DROP COLUMN marca;

ALTER TABLE productos
ADD CONSTRAINT fk_marca
FOREIGN KEY (marca_id) REFERENCES marcas(id);

INSERT INTO categorias (categoria) 
SELECT DISTINCT categoria FROM productos;

SELECT * FROM categorias;


ALTER TABLE productos ADD COLUMN categoria_id INT;

UPDATE productos p
JOIN categorias c ON p.categoria = c.categoria
SET p.categoria_id = c.id;

SELECT * FROM productos;

ALTER TABLE productos DROP COLUMN categoria;

ALTER TABLE productos
ADD CONSTRAINT fk_categoria
FOREIGN KEY (categoria_id) REFERENCES categorias(id);
