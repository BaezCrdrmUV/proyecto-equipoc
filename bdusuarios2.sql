-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema libermusicusuarios
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema libermusicusuarios
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `libermusicusuarios` ;
USE `libermusicusuarios` ;

-- -----------------------------------------------------
-- Table `libermusicusuarios`.`estatusderegistros`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `libermusicusuarios`.`estatusderegistros` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `nombreDeEstatus` VARCHAR(20) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `libermusicusuarios`.`usuarios`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `libermusicusuarios`.`usuarios` (
  `id` VARCHAR(200) NOT NULL,
  `fkIdArtista` INT UNSIGNED NULL,
  `nombreDeUsuario` VARCHAR(200) NOT NULL COMMENT 'nombre de usuario(nickname) de la cuenta que se esta creando',
  `nombreDelPropietario` VARCHAR(200) NOT NULL COMMENT 'nombre de la persona a quien pertenece la cuenta de usuario',
  `fkidEstatus` INT UNSIGNED NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_usuarios_EstatusDeRegistros1_idx` (`fkidEstatus` ASC) VISIBLE,
  UNIQUE INDEX `nombreDeUsuario_UNIQUE` (`nombreDeUsuario` ASC) VISIBLE,
  CONSTRAINT `fk_usuarios_EstatusDeRegistros1`
    FOREIGN KEY (`fkidEstatus`)
    REFERENCES `libermusicusuarios`.`estatusderegistros` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `libermusicusuarios`.`datosdelocalizacion`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `libermusicusuarios`.`datosdelocalizacion` (
  `email` VARCHAR(200) NOT NULL,
  `pais` VARCHAR(200) NOT NULL,
  `fkIdUsuario` VARCHAR(200) NOT NULL,
  PRIMARY KEY (`fkIdUsuario`),
  UNIQUE INDEX `email_UNIQUE` (`email` ASC) VISIBLE,
  CONSTRAINT `fk_datosdelocalizacion_usuarios1`
    FOREIGN KEY (`fkIdUsuario`)
    REFERENCES `libermusicusuarios`.`usuarios` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `libermusicusuarios`.`contrasenas`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `libermusicusuarios`.`contrasenas` (
  `contrasena` VARCHAR(200) NOT NULL,
  `fkIdUsuario` VARCHAR(200) NOT NULL,
  PRIMARY KEY (`fkIdUsuario`),
  CONSTRAINT `fk_contrasenas_usuarios1`
    FOREIGN KEY (`fkIdUsuario`)
    REFERENCES `libermusicusuarios`.`usuarios` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

SET SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';
CREATE USER 'admin' IDENTIFIED WITH mysql_native_password BY 'admin';
-- GRANT ALL PRIVILEGES ON *.* TO 'admin'@'localhost' WITH GRANT OPTION;
GRANT ALL PRIVILEGES ON *.* TO 'admin'@'%' WITH GRANT OPTION;

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

-- REGISTRO DE USUARIOS  INICIALES
START TRANSACTION;
INSERT INTO `libermusicusuarios`.`estatusderegistros` ( `nombreDeEstatus`) VALUES (' activo' );
INSERT INTO `libermusicusuarios`.`estatusderegistros` ( `nombreDeEstatus`) VALUES (' inactivo' );
INSERT INTO `libermusicusuarios`.`usuarios` ( `id`,`nombreDeUsuario`,`nombreDelPropietario`,`fkIdEstatus`) VALUES ('1',' AaronHL99' ,'Aaron Hernandez Lara',1);
INSERT INTO `libermusicusuarios`.`usuarios` ( `id`,`nombreDeUsuario`,`nombreDelPropietario`,`fkIdEstatus`) VALUES ('2',' Juan99' ,'juan perez perez',1);
INSERT INTO `libermusicusuarios`.`contrasenas` ( `fkIdUsuario` ,`contrasena`) VALUES (1 ,'admin99');
INSERT INTO `libermusicusuarios`.`contrasenas` ( `fkIdUsuario` ,`contrasena`) VALUES (2 ,'admin99');
INSERT INTO `libermusicusuarios`.`datosdelocalizacion` ( `fkIdUsuario` ,`email`,`pais`) VALUES (1 ,'aaron@correo.com','Mexico');
INSERT INTO `libermusicusuarios`.`datosdelocalizacion` ( `fkIdUsuario` ,`email`,`pais`) VALUES (2 ,'juan@correo.com','Mexico');
COMMIT;