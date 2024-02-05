DROP DATABASE IF EXISTS BD_TAREAS;
CREATE DATABASE BD_TAREAS;
USE BD_TAREAS;
-- --------------------------------------------------------

-- 
-- Estructura de tabla para la tabla tareas
-- 

DROP TABLE IF EXISTS `tareas`;
CREATE TABLE `tareas` (
  `id` mediumint(2) unsigned NOT NULL auto_increment,
  `nombre` varchar(255) NOT NULL default '',
  `descripcion` varchar(500) NOT NULL default '',  
  PRIMARY KEY  (`id`),
  unique key `nombre` (`nombre`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1 COMMENT='Gestor de tareas' AUTO_INCREMENT=1 ;

-- 

insert into tareas(nombre, descripcion) values ( 'tarea1', 'descripcion tarea 1');
insert into tareas(nombre, descripcion) values ( 'tarea2', 'descripcion tarea 2');