# TP4: Neo4J

📘 **Guía de Ejercicios – Neo4j y Cypher**

---

El TP4 consiste en implementar al menos dos (2) de los cuatro ejercicios presentados. Estos ejercicios son a elección del grupo de trabajo.

## Tabla de contenidos

- Ejercicio 1: Sistema de Gestión de Proyectos  
  - Requisitos  
  - Actividades  
- Ejercicio 2: Biblioteca Universitaria Extendida  
  - Requisitos  
  - Actividades  
- Ejercicio 3: Red Social Profesional  
  - Requisitos  
  - Actividades  
- Ejercicio 4: Sistema de Cursos y Calificaciones  
  - Requisitos  
  - Actividades  

---

**Materia:** Bases de Datos II – UTN-FRBB  
**Nivel:** Intermedio  
**Objetivo:** Practicar modelado de grafos, consultas Cypher, filtrado, agregaciones y patrones avanzados.

---

## Ejercicio 1: Sistema de Gestión de Proyectos

### Requisitos

Modelar un sistema donde:  
- Cada Empleado pertenece a un Departamento.  
- Los Proyectos pueden tener asignados múltiples empleados con horas semanales.  
- Un empleado puede liderar uno o varios proyectos.

### Actividades

**Modelado**  
- Crear nodos y relaciones con ejemplos de datos:

  - Al menos 3 empleados en diferentes departamentos.
  - 2 proyectos.
  - Asignaciones de horas semanales.
  - Un líder por proyecto.

**Consultas**  
- Obtener el nombre del proyecto, su líder y los empleados asignados.
- Calcular el total de horas semanales por proyecto.
- Listar los empleados que trabajan en más de un proyecto.

---

## Ejercicio 2: Biblioteca Universitaria Extendida

### Requisitos

Modelar un sistema de préstamos donde:  
- Estudiantes piden libros prestados.  
- Cada libro pertenece a una Categoría.  
- Las relaciones de préstamo tienen fecha y estado ("Activo" o "Devuelto").  
- Cada estudiante pertenece a una Carrera.

### Actividades

**Modelado**  
- Crear datos con al menos:

  - 3 estudiantes de distintas carreras.
  - 4 libros de categorías diferentes.
  - 5 préstamos con fechas y estado.

**Consultas**  
- Obtener todos los libros actualmente prestados (estado "Activo").
- Listar cuántos libros ha pedido prestado cada estudiante.
- Mostrar las categorías con más préstamos activos.
- Encontrar los estudiantes que no tienen préstamos activos.

---

## Ejercicio 3: Red Social Profesional

### Requisitos

Crear una red donde:  
- Usuarios se conectan con otros usuarios mediante relaciones CONOCE.  
- Los usuarios publican Posts con fecha de publicación.  
- Cada usuario puede tener diferentes Habilidades, que otros pueden endosar.

### Actividades

**Modelado**  
- Insertar datos de:

  - 4 usuarios con conexiones entre ellos.
  - 3 posts de distintos usuarios.
  - Al menos 2 habilidades por usuario, con algunos endosos.

**Consultas**  
- Listar los usuarios con más conexiones (COUNT).
- Obtener los 2 usuarios con más publicaciones.
- Mostrar las habilidades más endosadas en total.
- Para un usuario específico, listar las habilidades que aún no ha endosado a otros.

---

## Ejercicio 4: Sistema de Cursos y Calificaciones

### Requisitos

Modelar un sistema académico que contemple:  
- Estudiantes inscritos en Cursos.  
- Cada curso corresponde a una Materia.  
- Los estudiantes obtienen calificaciones finales.  
- Las materias pueden tener prerrequisitos.

### Actividades

**Modelado**  
- Crear datos de:

  - 3 estudiantes.
  - 3 materias (al menos una con prerrequisito).
  - 4 cursos dictados.
  - Inscripciones y calificaciones.

**Consultas**  
- Listar la transcripción académica de un estudiante.
- Verificar si un estudiante puede inscribirse en una materia (si aprobó los prerrequisitos).
- Calcular el promedio de calificaciones por estudiante.
- Detectar materias con promedio inferior a 7.

---