SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

CREATE TABLE IF NOT EXISTS `customer` (
  `Id`      int(11)      NOT NULL AUTO_INCREMENT,
  `Name`    varchar(255) NOT NULL,
  `Address` varchar(255) NOT NULL,
  `Country` varchar(100) NOT NULL,
  `Phone`   int(10)      NOT NULL,
  `Created_on` datetime  NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `Updated_on` datetime  NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`Id`)
) ENGINE = InnoDB DEFAULT CHARSET = latin1 AUTO_INCREMENT = 1;