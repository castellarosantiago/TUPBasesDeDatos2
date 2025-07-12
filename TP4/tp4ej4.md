CREATE
//CREAR Estudiantes
(lucas:Estudiante {nombre: 'Lucas'}),
(roberto:Estudiante {nombre: 'Roberto'}),
(gianluca:Estudiante {nombre: 'Gianluca'}),
(lucia:Estudiante {nombre: 'Lucía'}),

//CREAR Curso
(c1:Curso {codigo: "BD3100"}),
(c2:Curso {codigo: "BD3101"}),
(c3:Curso {codigo: "AMAT1100"}),
(c4:Curso {codigo: "AMAT1101"}),

//CREAR Materias
(m1:Materia {nombre: "Análisis Matemático I"}),
(m2:Materia {nombre: "Base de Datos III"}),
(m3:Materia {nombre: "Programación IV"}),

//CREAR RELACIONES ENTRE Estudiantes y Cursos
(lucas)-[:CURSA {nota: 9.5}]->(c2),
(gianluca)-[:CURSA {nota: 7.5}]->(c1),
(lucas)-[:CURSA {nota: 5.5}]->(c4),
(lucia)-[:CURSA {nota: 6}]->(c3),
(roberto)-[:CURSA {nota: 3}]->(c1),

//CREAR RELACIONES ENTRE Materias Y Cursos
(c1)-[:CORRESPONDE]->(m2),
(c3)-[:CORRESPONDE]->(m3),
(c2)-[:CORRESPONDE]->(m2),
(c4)-[:CORRESPONDE]->(m1),

//CREAR PREREQUISITOS
(m1)-[:CORRELATIVA_CON]->(m3),
(m2)-[:CORRELATIVA_CON]->(m5),
(m3)-[:CORRELATIVA_CON]->(m6);

//QUERYS
//LISTAR LA TRANSCRIPCIÓN ACADÉMICA DE UN ESTUDIANTE
MATCH (e:Estudiante {nombre: "Lucas"})-[f:CURSA]->(c:Curso)-[:CORRESPONDE]->(m:Materia)
RETURN m.nombre AS materia, c.nombre AS curso, f.nota AS nota;

//PUEDE INSCRIBIRSE?
MATCH (e:Estudiante {nombre:'Lucas'}),
    (m:Materia {nombre: 'Programación IV'})<-[:CORRELATIVA_CON]-(p:Materia), 
    (c:Curso)-[:CORRESPONDE]->(p),
    (e)-[n:CURSA]->(c)
WITH n.nota AS nota
RETURN WHEN nota >= 6 THEN "Puede inscribirse" ELSE "No puede inscribirse";

//PROMEDIO DE CALIFICACIONES POR ESTUDIANTE
MATCH (e:Estudiante)-[c:CURSA]-()
RETURN e.nombre AS estudiante, AVG(c.nota) AS promedio;

//MATERIAS CON PROMEDIO INFERIOR A 7
MATCH (:Estudiante)-[i:CURSA]->(c:Curso)-[:CORRESPONDE]->(m:Materia)
WITH m.nombre AS materia, AVG(i.nota) AS promedio
WHERE promedio < 7
RETURN materia, promedio;
