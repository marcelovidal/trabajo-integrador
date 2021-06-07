#  Created with Kata Kuntur - Data Modeller
#  Version: 2.5.4
#  Web Site: http://katakuntur.jeanmazuelos.com/

#  Database Management System: MySQL/MariaDB
#  Diagram: TODO List
#  Author: GR
#  Date and time: 01/06/2021 20:15:08

DROP SCHEMA IF EXISTS TODO;

CREATE SCHEMA TODO;
USE TODO;

# GENERATING TABLES
CREATE TABLE `Usuario` (
	`id` INTEGER NOT NULL,
	`username` VARCHAR(25) NOT NULL,
	`nombre` VARCHAR(50) NULL,
	`apellido` VARCHAR(50) NULL,
	`password` CHAR(16) NOT NULL,
	`root` BIT NOT NULL,
	PRIMARY KEY(`id`)
) ENGINE=INNODB;
CREATE TABLE `Tarea` (
	`id` INTEGER NOT NULL,
	`titulo` VARCHAR(50) NOT NULL,
	`descripcion` VARCHAR(500) NULL,
	`fecha_limite` DATE NULL,
	`estado` VARCHAR(10) NOT NULL,
	`fecha_creacion` TIMESTAMP NOT NULL,
	`fecha_actualizacion` TIMESTAMP NULL,
	`usuario_id` INTEGER NOT NULL,
	KEY(`usuario_id`),
	PRIMARY KEY(`id`)
) ENGINE=INNODB;

# INSERTING INITIAL VALUES
INSERT INTO `Usuario` (`id`, `username`, `nombre`, `apellido`, `password`, `root`) VALUES 
	(1,'root', 'super', 'user', 'admin', 1), 
	(2,'mvidal', 'marcelo', 'vidal', 'mv2021', 0), 
	(3,'graby', 'gabriel', 'raby', 'gr2021', 0); 

INSERT INTO `Tarea` (`id`, `titulo`, `descripcion`, `fecha_limite`, `estado`, `fecha_creacion`, `fecha_actualizacion`, `usuario_id`) VALUES 
	(1,'Definir data model', 'Definir tablas, relaciones y constraints para el modelo de datos del proyecto TODO', '2021-06-07', 'completada', '2021-06-01', '2021-06-04', 3), 
	(2,'Construir API endpoints', 'Desarrollar los endpoints REST para el modelo de datos del proyecto TODO', '2021-06-09', 'pendiente', '2021-06-02', NULL, 2); 
    
# GENERATING RELATIONSHIPS
ALTER TABLE `Tarea` ADD CONSTRAINT `tarea_usuario_usuario_id` FOREIGN KEY (`usuario_id`) REFERENCES `Usuario`(`id`) ON DELETE NO ACTION ON UPDATE CASCADE;

# GENERATING OTHER CONSTRAINTS
ALTER TABLE `Usuario`
  MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

ALTER TABLE `Tarea`
  MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
  
