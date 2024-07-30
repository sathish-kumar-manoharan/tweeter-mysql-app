-- run this to set up the tables for the tweeter application

CREATE TABLE IF NOT EXISTS `tweeter`.`user` (
  `userId` INT NOT NULL AUTO_INCREMENT,
  `userName` VARCHAR(45) NOT NULL,
  `age` INT NULL,
  `gender` VARCHAR(10) NULL,
  `email` VARCHAR(45) NULL,
  PRIMARY KEY (`userId`, `userName`),
  UNIQUE INDEX `userId_UNIQUE` (`userId` ASC),
  UNIQUE INDEX `userName_UNIQUE` (`userName` ASC))
COMMENT = 'stores the users informations';


CREATE TABLE IF NOT EXISTS `tweeter`.`messages` (
  `messageId` INT NOT NULL AUTO_INCREMENT,
  `userName` VARCHAR(45) NOT NULL,
  `content` VARCHAR(500) NOT NULL,
  PRIMARY KEY (`messageId`),
  INDEX `userName` (`userName` ASC, `messageId` ASC),
  CONSTRAINT `userName`
    FOREIGN KEY (`userName`)
    REFERENCES `tweeter`.`user` (`userName`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
COMMENT = 'stores messages posted by users';


CREATE TABLE `tweeter`.`following` (
  `userName` VARCHAR(45) NOT NULL,
  `followingUserName` VARCHAR(45) NOT NULL,
  INDEX `following_userName_idx` (`userName` ASC),
  CONSTRAINT `following_userName`
    FOREIGN KEY (`userName`)
    REFERENCES `tweeter`.`user` (`userName`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
COMMENT = 'stores the information of who is following whom.';
