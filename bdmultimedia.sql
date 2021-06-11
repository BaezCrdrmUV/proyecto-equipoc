-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema libermusicmultimedia
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema libermusicmultimedia
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `libermusicmultimedia` ;
USE `libermusicmultimedia` ;

-- -----------------------------------------------------
-- Table `libermusicmultimedia`.`estatusdearchivos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `libermusicmultimedia`.`estatusdearchivos` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(20) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `libermusicmultimedia`.`datosarchivosdeportadas`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `libermusicmultimedia`.`datosarchivosdeportadas` (
  `id` VARCHAR(200) NOT NULL,
  `fkIdArtista` VARCHAR(200) NULL, 
  `fkIdAlbum` VARCHAR(200) NULL,
  `nombreDeImagen` VARCHAR(45) NOT NULL,
  `formato` VARCHAR(10) NOT NULL,
  `urlDePortada` LONGTEXT NOT NULL,
  `urlPublicaDePortada` LONGTEXT NOT NULL,
  `fkIdEstatus` INT UNSIGNED NULL DEFAULT 1,
  PRIMARY KEY (`id`),
  INDEX `fk_datosarchivosdeportadas_estatusDeArchivos1_idx` (`fkIdEstatus` ASC) VISIBLE,
  CONSTRAINT `fk_datosarchivosdeportadas_estatusDeArchivos1`
    FOREIGN KEY (`fkIdEstatus`)
    REFERENCES `libermusicmultimedia`.`estatusdearchivos` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `libermusicmultimedia`.`datosarchivosdecanciones`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `libermusicmultimedia`.`datosarchivosdecanciones` (
  `id` VARCHAR(200) NOT NULL,
  `fkIdCancion` VARCHAR(200) NOT NULL,
  `fkIdPortada` VARCHAR(200) NULL,
  `portadaId` VARCHAR(200) NULL,
  `nombreDelArchivo` VARCHAR(200) NOT NULL,
  `tamanoEnMb` INT UNSIGNED NOT NULL,
  `formato` VARCHAR(10) NOT NULL,
  `codigoIsrc` VARCHAR(12) NOT NULL,
  `urlCancion` LONGTEXT NOT NULL,
  `urlPublicaCancion` LONGTEXT NOT NULL,
  `fkIdEstatus` INT UNSIGNED NULL DEFAULT 1,
  PRIMARY KEY (`id`),
  INDEX `fk_datosarchivosdecanciones_datosarchivosdeportadas1_idx` (`fkIdPortada` ASC) VISIBLE,
  INDEX `fk_datosarchivosdecanciones_estatusDeArchivos1_idx` (`fkIdEstatus` ASC) VISIBLE,
  CONSTRAINT `fk_datosarchivosdecanciones_datosarchivosdeportadas1`
    FOREIGN KEY (`fkIdPortada`)
    REFERENCES `libermusicmultimedia`.`datosarchivosdeportadas` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_datosarchivosdecanciones_estatusDeArchivos1`
    FOREIGN KEY (`fkIdEstatus`)
    REFERENCES `libermusicmultimedia`.`estatusdearchivos` (`id`)
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
INSERT INTO `libermusicmultimedia`.`estatusdearchivos` ( `id`,`nombre`) VALUES ('1',' activo' );
INSERT INTO `libermusicmultimedia`.`estatusdearchivos` (`id` ,`nombre`) VALUES ('2','inactivo' );
INSERT INTO `libermusicmultimedia`.`datosarchivosdeportadas` (`id` ,`fkIdAlbum`,`nombreDeImagen`,`formato`,`urlDePortada`,`urlPublicaDePortada`) VALUES ('1','1','imagen','.png','una/ruta','otra/ruta' );
INSERT INTO `libermusicmultimedia`.`datosarchivosdecanciones` ( `id`,`fkIdCancion`,`fkIdPortada`,`nombreDelArchivo`,`tamanoEnMb`,`formato`,`codigoIsrc`,`urlCancion`,`urlPublicaCancion`) VALUES (' 1','1','1','cancion',8,'.mp3','123456789101','una/ruta','otra ruta');
COMMIT;