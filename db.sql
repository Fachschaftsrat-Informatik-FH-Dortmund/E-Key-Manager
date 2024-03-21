
CREATE TABLE ekey(
    ekeyid TEXT PRIMARY KEY,
    besitzer TEXT CHECK(besitzer = ANY('{FSR,Student,verloren}')) NOT NULL,
    zustand TEXT CHECK(zustand = ANY('{defekt,gesperrt,funktioniert}')) NOT NULL,
    berechtigung TEXT CHECK ( berechtigung=ANY('{STUD,FSRF,FSR}') ) NOT NULL,
    notiz TEXT
);

CREATE TABLE student(
    matrnr integer PRIMARY KEY,
    vorname TEXT NOT NULL ,
    nachname TEXT NOT NULL,
    email TEXT NOT NULL
);

CREATE TABLE ausleihe(
    matrnr integer,
    ekeyid text,
    beginn date,
    ende date DEFAULT NULL,
    notiz text,
    letzte_rückmeldung date,
    hat_studienbescheinigung boolean
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

INSERT INTO student (matrnr, vorname, nachname, email, hat_studienbescheinigung) VALUES (7200000,'ABC', 'DEF', 'ABC.DEF000@stud.fh-dortmund.de', true), (7220300,'ahoi', 'piraten', 'omgeinemail.DEF000@stud.fh-dortmund.de', false);

INSERT INTO Ausleihe (MatrNr, KeyID, Beginn, Ende, bemerkung, letzteRückmeldung) VALUES (7200000,'35CHRXXXX',CURRENT_TIMESTAMP, null, null, null);

SELECT * FROM Ausleihe NATURAL JOIN Person NATURAL JOIN Key;
