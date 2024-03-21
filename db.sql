DROP TABLE Key CASCADE ;
DROP TABLE Person CASCADE ;
DROP TABLE Ausleihe CASCADE ;
DROP TABLE Warteliste CASCADE ;


CREATE TABLE ekey(
    ekeyID varchar(9) PRIMARY KEY,
    besitzer varchar(10) CHECK(besitzer = ANY('{FSR,Student,verloren}')) NOT NULL,
    zustand varchar(15) CHECK(zustand = ANY('{defekt,gesperrt,funktioniert}')) NOT NULL,
    berechtigung varchar(4) CHECK ( berechtigung=ANY('{STUD,FSRF,FSR}') ) NOT NULL,
    notiz text
);

CREATE TABLE Person(
    MatrNr integer PRIMARY KEY,
    Vorname VARCHAR(50),
    Nachname VARCHAR(40),
    Email VARCHAR(90)
);

CREATE TABLE Ausleihe(
    MatrNr integer,
    KeyID varchar(9),
    Beginn date ,
    Ende date,
    bemerkung varchar(30),
    -- z.B. verloren oder keine Rückmeldung
    letzteRückmeldung date,
    PRIMARY KEY (MatrNr, KeyID,Beginn),
    FOREIGN KEY (MatrNr) REFERENCES Person(MatrNr),
    FOREIGN KEY (KeyID) REFERENCES Key(KeyID)
);

CREATE TABLE Warteliste(
    Mail varchar(90) PRIMARY KEY,
    RegisterDate date
);

-- Beispiel inserts
INSERT INTO ekey (ekeyID, besitzer, zustand, berechtigung, notiz) VALUES ('24CHRXXXX', 'Student', 'funktioniert', 'STUD', NULL), ('35CHRXXXX', 'FSR', 'defekt', 'FSRF', NULL);

INSERT INTO Person (MatrNr, Vorname, Nachname, Email) VALUES (7200000,'ABC', 'DEF', 'ABC.DEF000@stud.fh-dortmund.de');

INSERT INTO Ausleihe (MatrNr, KeyID, Beginn, Ende, bemerkung, letzteRückmeldung) VALUES (7200000,'35CHRXXXX',CURRENT_TIMESTAMP, null, null, null);

SELECT * FROM Ausleihe NATURAL JOIN Person NATURAL JOIN Key;
