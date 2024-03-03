DROP TABLE Key CASCADE ;
DROP TABLE Person CASCADE ;
DROP TABLE Ausleihe CASCADE ;
DROP TABLE Warteliste CASCADE ;


CREATE TABLE Key(
    KeyID varchar(9) PRIMARY KEY,
    status varchar(11) CHECK ( status=ANY('{"defekt","gesperrt","FSR-Besitz","vergeben"}') ) NOT NULL,
    berechtigung varchar(4) CHECK ( berechtigung=ANY('{"STUD","FSRF","FSR"}') ) NOT NULL
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
INSERT INTO Key (KeyID, status, berechtigung) VALUES ('35CHRXXXX','vergeben','FSRF');

INSERT INTO Person (MatrNr, Vorname, Nachname, Email) VALUES (7200000,'ABC', 'DEF', 'ABC.DEF000@stud.fh-dortmund.de');

INSERT INTO Ausleihe (MatrNr, KeyID, Beginn, Ende, bemerkung, letzteRückmeldung) VALUES (7200000,'35CHRXXXX',CURRENT_TIMESTAMP, null, null, null);

SELECT * FROM Ausleihe NATURAL JOIN Person NATURAL JOIN Key;
