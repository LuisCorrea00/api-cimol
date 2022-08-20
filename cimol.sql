
-- -----------------------------------------------------
-- Schema cimol
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema cimol
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `cimol` DEFAULT CHARACTER SET utf8 ;
USE `cimol` ;

-- -----------------------------------------------------
-- Table `cimol`.`pessoa`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `cimol`.`pessoa` (
  `id_pessoa` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(45) NOT NULL,
  `email` VARCHAR(90) NOT NULL,
  PRIMARY KEY (`id_pessoa`),
  UNIQUE INDEX `id_pessoa_UNIQUE` (`id_pessoa` ASC) )
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `cimol`.`professor`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `cimol`.`professor` (
  `pessoa_id_pessoa` INT UNSIGNED NOT NULL,
  PRIMARY KEY (`pessoa_id_pessoa`),
  CONSTRAINT `fk_professor_pessoa`
    FOREIGN KEY (`pessoa_id_pessoa`)
    REFERENCES `cimol`.`pessoa` (`id_pessoa`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `cimol`.`aluno`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `cimol`.`aluno` (
  `pessoa_id_pessoa` INT UNSIGNED NOT NULL,
  `matricula` INT NOT NULL,
  PRIMARY KEY (`pessoa_id_pessoa`),
  CONSTRAINT `fk_aluno_pessoa1`
    FOREIGN KEY (`pessoa_id_pessoa`)
    REFERENCES `cimol`.`pessoa` (`id_pessoa`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `cimol`.`curso`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `cimol`.`curso` (
  `id_curso` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(45) NOT NULL,
  `numero` VARCHAR(45) NOT NULL,
  `logo` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id_curso`),
  UNIQUE INDEX `id_curso_UNIQUE` (`id_curso` ASC) )
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `cimol`.`coordenacao`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `cimol`.`coordenacao` (
  `professor_pessoa_id_pessoa` INT UNSIGNED NOT NULL,
  `curso_id_curso` INT UNSIGNED NOT NULL,
  `data_inicio` DATE NOT NULL,
  `data_fim` DATE NOT NULL,
  `ativo` ENUM('S', 'N') NOT NULL DEFAULT 'S',
  PRIMARY KEY (`professor_pessoa_id_pessoa`, `curso_id_curso`),
  INDEX `fk_professor_has_curso_curso1_idx` (`curso_id_curso` ASC) ,
  INDEX `fk_professor_has_curso_professor1_idx` (`professor_pessoa_id_pessoa` ASC) ,
  CONSTRAINT `fk_professor_has_curso_professor1`
    FOREIGN KEY (`professor_pessoa_id_pessoa`)
    REFERENCES `cimol`.`professor` (`pessoa_id_pessoa`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_professor_has_curso_curso1`
    FOREIGN KEY (`curso_id_curso`)
    REFERENCES `cimol`.`curso` (`id_curso`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `cimol`.`aluno_curso`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `cimol`.`aluno_curso` (
  `aluno_pessoa_id_pessoa` INT UNSIGNED NOT NULL,
  `curso_id_curso` INT UNSIGNED NOT NULL,
  PRIMARY KEY (`aluno_pessoa_id_pessoa`, `curso_id_curso`),
  INDEX `fk_aluno_has_curso_curso1_idx` (`curso_id_curso` ASC) ,
  INDEX `fk_aluno_has_curso_aluno1_idx` (`aluno_pessoa_id_pessoa` ASC) ,
  CONSTRAINT `fk_aluno_has_curso_aluno1`
    FOREIGN KEY (`aluno_pessoa_id_pessoa`)
    REFERENCES `cimol`.`aluno` (`pessoa_id_pessoa`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_aluno_has_curso_curso1`
    FOREIGN KEY (`curso_id_curso`)
    REFERENCES `cimol`.`curso` (`id_curso`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `cimol`.`usuario`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `cimol`.`usuario` (
  `senha` VARCHAR(60) NOT NULL,
  `token` VARCHAR(120) NULL,
  `pessoa_id_pessoa` INT UNSIGNED NOT NULL,
  INDEX `fk_usuario_pessoa1_idx` (`pessoa_id_pessoa` ASC) ,
  CONSTRAINT `fk_usuario_pessoa1`
    FOREIGN KEY (`pessoa_id_pessoa`)
    REFERENCES `cimol`.`pessoa` (`id_pessoa`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `cimol`.`administrador`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `cimol`.`administrador` (
  `pessoa_id_pessoa` INT UNSIGNED NOT NULL,
  PRIMARY KEY (`pessoa_id_pessoa`),
  CONSTRAINT `fk_administrador_pessoa1`
    FOREIGN KEY (`pessoa_id_pessoa`)
    REFERENCES `cimol`.`pessoa` (`id_pessoa`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `cimol`.`biblio_tipo`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `cimol`.`biblio_tipo` (
  `id_tipo` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id_tipo`),
  UNIQUE INDEX `id_tipo_UNIQUE` (`id_tipo` ASC) )
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `cimol`.`biblio_editora`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `cimol`.`biblio_editora` (
  `id_editora` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id_editora`),
  UNIQUE INDEX `id_editora_UNIQUE` (`id_editora` ASC) )
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `cimol`.`biblio_obra`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `cimol`.`biblio_obra` (
  `id_obra` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `img` VARCHAR(255) NOT NULL,
  `titulo` VARCHAR(255) NOT NULL,
  `isbn` INT(13) NOT NULL,
  `sinopse` LONGTEXT NOT NULL,
  `n_paginas` INT NOT NULL,
  `n_edicao` INT NOT NULL,
  `data_retirada` DATE NULL,
  `data_devolucao` DATE NULL,
  `tipo_id_tipo` INT UNSIGNED NOT NULL,
  `editora_id_editora` INT UNSIGNED NOT NULL,
  `pessoa_id_pessoa` INT UNSIGNED NULL,
  `situacao` ENUM('disponivel', 'indisponivel') NOT NULL,
  PRIMARY KEY (`id_obra`, `tipo_id_tipo`, `editora_id_editora`, `pessoa_id_pessoa`),
  INDEX `fk_obra_tipo1_idx` (`tipo_id_tipo` ASC) ,
  INDEX `fk_biblio_obra_biblio_editora1_idx` (`editora_id_editora` ASC) ,
  INDEX `fk_biblio_obra_pessoa1_idx` (`pessoa_id_pessoa` ASC) ,
  UNIQUE INDEX `id_obra_UNIQUE` (`id_obra` ASC) ,
  CONSTRAINT `fk_obra_tipo1`
    FOREIGN KEY (`tipo_id_tipo`)
    REFERENCES `cimol`.`biblio_tipo` (`id_tipo`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_biblio_obra_biblio_editora1`
    FOREIGN KEY (`editora_id_editora`)
    REFERENCES `cimol`.`biblio_editora` (`id_editora`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_biblio_obra_pessoa1`
    FOREIGN KEY (`pessoa_id_pessoa`)
    REFERENCES `cimol`.`pessoa` (`id_pessoa`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `cimol`.`biblio_genero`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `cimol`.`biblio_genero` (
  `id_genero` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id_genero`),
  UNIQUE INDEX `id_genero_UNIQUE` (`id_genero` ASC) )
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `cimol`.`biblio_autor`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `cimol`.`biblio_autor` (
  `id_autor` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id_autor`),
  UNIQUE INDEX `id_autor_UNIQUE` (`id_autor` ASC) )
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `cimol`.`biblio_obra_autor`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `cimol`.`biblio_obra_autor` (
  `biblio_obra_id_obra` INT UNSIGNED NOT NULL,
  `biblio_autor_id_autor` INT UNSIGNED NOT NULL,
  PRIMARY KEY (`biblio_obra_id_obra`, `biblio_autor_id_autor`),
  INDEX `fk_biblio_obra_has_biblio_autor_biblio_autor1_idx` (`biblio_autor_id_autor` ASC) ,
  INDEX `fk_biblio_obra_has_biblio_autor_biblio_obra1_idx` (`biblio_obra_id_obra` ASC) ,
  CONSTRAINT `fk_biblio_obra_has_biblio_autor_biblio_obra1`
    FOREIGN KEY (`biblio_obra_id_obra`)
    REFERENCES `cimol`.`biblio_obra` (`id_obra`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_biblio_obra_has_biblio_autor_biblio_autor1`
    FOREIGN KEY (`biblio_autor_id_autor`)
    REFERENCES `cimol`.`biblio_autor` (`id_autor`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `cimol`.`biblio_obra_genero`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `cimol`.`biblio_obra_genero` (
  `biblio_obra_id_obra` INT UNSIGNED NOT NULL,
  `biblio_genero_id_genero` INT UNSIGNED NOT NULL,
  PRIMARY KEY (`biblio_obra_id_obra`, `biblio_genero_id_genero`),
  INDEX `fk_biblio_obra_has_biblio_genero_biblio_genero1_idx` (`biblio_genero_id_genero` ASC) ,
  INDEX `fk_biblio_obra_has_biblio_genero_biblio_obra1_idx` (`biblio_obra_id_obra` ASC) ,
  CONSTRAINT `fk_biblio_obra_has_biblio_genero_biblio_obra1`
    FOREIGN KEY (`biblio_obra_id_obra`)
    REFERENCES `cimol`.`biblio_obra` (`id_obra`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_biblio_obra_has_biblio_genero_biblio_genero1`
    FOREIGN KEY (`biblio_genero_id_genero`)
    REFERENCES `cimol`.`biblio_genero` (`id_genero`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;