-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema libermusicmusica
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema libermusicmusica
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `libermusicmusica` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci ;
USE `libermusicmusica` ;

-- -----------------------------------------------------
-- Table `libermusicmusica`.`estatusderegistrosmusica`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `libermusicmusica`.`estatusderegistrosmusica` (
  `id` INT UNSIGNED NOT NULL,
  `nombreDeEstatus` VARCHAR(20) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `libermusicmusica`.`artistas`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `libermusicmusica`.`artistas` (
  `id` VARCHAR(200) NOT NULL,
  `nombre` VARCHAR(200) NOT NULL COMMENT 'nombre real del arista',
  `nombreArtistico` VARCHAR(200) NOT NULL COMMENT 'nombre con el que el artista sale en sus discos o canciones(el nombre de)',
  `anoDeNacimiento` INT NULL COMMENT 'año a partir de la cual el artista empezo su carrera',
  `web` LONGTEXT NULL,
  `nacionalidad` VARCHAR(100) NOT NULL,
  `fkIdEstatus` INT UNSIGNED NOT NULL DEFAULT 1,
  PRIMARY KEY (`id`),
  INDEX `fk_artistas_estatusdearchivos1_idx` (`fkIdEstatus` ASC) VISIBLE,
  CONSTRAINT `fk_artistas_estatusdearchivos1`
    FOREIGN KEY (`fkIdEstatus`)
    REFERENCES `libermusicmusica`.`estatusderegistrosmusica` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `libermusicmusica`.`albumes`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `libermusicmusica`.`albumes` (
  `id` VARCHAR(200) NOT NULL,
  `fkIdArtista` VARCHAR(200) NOT NULL,
  `titulo` VARCHAR(200) NOT NULL,
  `duracion` INT UNSIGNED NOT NULL COMMENT 'duracion en segundos',
  `numeroDeTracks` INT UNSIGNED NOT NULL,
  `companiaProductora` VARCHAR(200) NOT NULL,
  `tipoDeAlbum` VARCHAR(200) NOT NULL COMMENT 'sencillo,edicion especial,etc.',
  `anoDeLanzamiento` INT NULL,
  `fkIdEstatus` INT UNSIGNED NOT NULL DEFAULT 1,
  PRIMARY KEY (`id`),
  INDEX `fk_albumes_artistas1_idx` (`fkIdArtista` ASC) VISIBLE,
  INDEX `fk_albumes_estatusdearchivos1_idx` (`fkIdEstatus` ASC) VISIBLE,
  CONSTRAINT `fk_albumes_artistas1`
    FOREIGN KEY (`fkIdArtista`)
    REFERENCES `libermusicmusica`.`artistas` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_albumes_estatusdearchivos1`
    FOREIGN KEY (`fkIdEstatus`)
    REFERENCES `libermusicmusica`.`estatusderegistrosmusica` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `libermusicmusica`.`canciones`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `libermusicmusica`.`canciones` (
  `id` VARCHAR(200) NOT NULL,
  `fkIdAlbum` VARCHAR(200) NOT NULL,
  `titulo` VARCHAR(200) NOT NULL,
  `numeroDeTrack` INT UNSIGNED NOT NULL,
  `genero` VARCHAR(200) NOT NULL,
  `duracion` INT UNSIGNED NOT NULL,
  `contenidoExplicito` TINYINT(2) UNSIGNED NOT NULL,
  `fkIdEstatus` INT UNSIGNED NOT NULL DEFAULT 1,
  PRIMARY KEY (`id`),
  INDEX `fk_canciones_albumes1_idx` (`fkIdAlbum` ASC) VISIBLE,
  INDEX `fk_canciones_estatusdearchivos1_idx` (`fkIdEstatus` ASC) VISIBLE,
  CONSTRAINT `fk_canciones_albumes1`
    FOREIGN KEY (`fkIdAlbum`)
    REFERENCES `libermusicmusica`.`albumes` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_canciones_estatusdearchivos1`
    FOREIGN KEY (`fkIdEstatus`)
    REFERENCES `libermusicmusica`.`estatusderegistrosmusica` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `libermusicmusica`.`listasdereproduccion`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `libermusicmusica`.`listasdereproduccion` (
  `id` VARCHAR(200) NOT NULL,
  `fkIdUsuario` VARCHAR(200) NOT NULL,
  `nombre` VARCHAR(200) NOT NULL,
  `numeroDeTracks` INT UNSIGNED NOT NULL,
  `fkIdEstatus` INT UNSIGNED NOT NULL DEFAULT 1,
  PRIMARY KEY (`id`),
  INDEX `fk_listasdereproduccion_estatusdearchivos1_idx` (`fkIdEstatus` ASC) VISIBLE,
  CONSTRAINT `fk_listasdereproduccion_estatusdearchivos1`
    FOREIGN KEY (`fkIdEstatus`)
    REFERENCES `libermusicmusica`.`estatusderegistrosmusica` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `libermusicmusica`.`cancioneslistasdereproduccion`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `libermusicmusica`.`cancioneslistasdereproduccion` (
  `id` VARCHAR(200) NOT NULL,
  `fkIdCancion` VARCHAR(200) NOT NULL,
  `fkIdListaDeReproduccion` VARCHAR(200) NOT NULL,
  `fkIdEstatus` INT UNSIGNED NOT NULL DEFAULT 1,
  PRIMARY KEY (`id`),
  INDEX `fk_cancioneslistasdereproduccion_canciones1_idx` (`fkIdCancion` ASC) VISIBLE,
  INDEX `fk_cancioneslistasdereproduccion_listasdereproduccion1_idx` (`fkIdListaDeReproduccion` ASC) VISIBLE,
  INDEX `fk_cancioneslistasdereproduccion_estatusdearchivos1_idx` (`fkIdEstatus` ASC) VISIBLE,
  CONSTRAINT `fk_cancioneslistasdereproduccion_canciones1`
    FOREIGN KEY (`fkIdCancion`)
    REFERENCES `libermusicmusica`.`canciones` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_cancioneslistasdereproduccion_listasdereproduccion1`
    FOREIGN KEY (`fkIdListaDeReproduccion`)
    REFERENCES `libermusicmusica`.`listasdereproduccion` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_cancioneslistasdereproduccion_estatusdearchivos1`
    FOREIGN KEY (`fkIdEstatus`)
    REFERENCES `libermusicmusica`.`estatusderegistrosmusica` (`id`)
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

-- REGISTRO DE DATOS INICIALES
START TRANSACTION;
INSERT INTO `libermusicmusica`.`estatusderegistrosmusica` ( `id`,`nombreDeEstatus`) VALUES ('1',' activo' );
INSERT INTO `libermusicmusica`.`estatusderegistrosmusica` (`id` ,`nombreDeEstatus`) VALUES ('2','inactivo' );
INSERT INTO `libermusicmusica`.`estatusderegistrosmusica` (`id` ,`nombreDeEstatus`) VALUES ('3','en revision' );
INSERT INTO `libermusicmusica`.`artistas` ( `id`,`nombre`,`nombreArtistico`,`anoDeNacimiento`,`web`,`nacionalidad`) VALUES (' 1','James Labrie,John Perucci,Mike Portnoy','Dream Theather',1985,'www.dreamtheater.com','EUA');
INSERT INTO `libermusicmusica`.`albumes` ( `id`,`fkIdArtista`,`titulo`,`duracion`,`numeroDeTracks`,`companiaProductora`,`tipoDeAlbum`,`anoDeLanzamiento`) VALUES ('1',' 1' ,'When Dream and Day Unite',3600,9,'Mechanic Records','sencillo','1989');
INSERT INTO `libermusicmusica`.`canciones` ( `id`,`fkIdAlbum`,`titulo`,`numeroDeTrack`,`genero`,`duracion`,`contenidoExplicito`) VALUES ('1','1' ,'A fortune in lies',1,'Progresive metal',5,0);
INSERT INTO `libermusicmusica`.`listasdereproduccion` ( `id`,`fkIdUsuario` ,`nombre`,`numeroDeTracks`) VALUES ('1' ,'1','rock',0);
INSERT INTO `libermusicmusica`.`cancioneslistasdereproduccion` ( `id`,`fkIdCancion` ,`fkIdListaDeReproduccion`) VALUES ('1' ,'1','1');
COMMIT;
