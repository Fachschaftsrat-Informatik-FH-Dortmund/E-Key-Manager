
CREATE TABLE ekey(
                   ekeyid TEXT PRIMARY KEY,
                   besitzer TEXT CHECK(besitzer = ANY('{FSR,Student,verloren}')) NOT NULL,
                   zustand TEXT CHECK(zustand = ANY('{defekt,gesperrt,funktioniert}')) NOT NULL,
                   berechtigung TEXT CHECK ( berechtigung=ANY('{STUD,FSRF,FSR}') ) NOT NULL,
                   notiz TEXT
);

CREATE TABLE student(
                      matrnr INTEGER PRIMARY KEY,
                      vorname TEXT NOT NULL ,
                      nachname TEXT NOT NULL,
                      email TEXT NOT NULL
);

CREATE TABLE ausleihe(
                       ausleihnr INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
                       matrnr INTEGER,
                       ekeyid TEXT,
                       beginn DATE NOT NULL,
                       ende DATE DEFAULT NULL,
                       notiz TEXT,
                       letzte_rückmeldung DATE,
                       hat_studienbescheinigung BOOLEAN,
                       FOREIGN KEY (matrnr) REFERENCES student(matrnr),
                       FOREIGN KEY (ekeyid) REFERENCES ekey(ekeyid)
);

/* TODO
CREATE TABLE warteliste(
                         Mail varchar(90) PRIMARY KEY,
                         RegisterDate date
);
*/


--
-- Funktionen/Trigger
--

--Wenn eine ausleihe eingefügt/beendet wird, wird der besitzer gewechselt
CREATE OR REPLACE FUNCTION switchschluesselbesitzer() RETURNS TRIGGER AS $$
DECLARE
    currbesitz TEXT;
    keyid TEXT ; -- Access the first argument passed to the trigger
BEGIN
    keyid := NEW.ekeyid;
    SELECT besitzer INTO currbesitz FROM ekey WHERE ekey.ekeyid = keyid;

    -- Corrected CASE statement syntax for PL/pgSQL
    IF currbesitz = 'FSR' THEN
        currbesitz := 'Student';
    ELSIF currbesitz = 'Student' THEN
        currbesitz := 'FSR';
    ELSE
        -- Handle other cases or do nothing
    END IF;

    -- Assuming you want to update the besitzer in the ekey table
    UPDATE ekey SET besitzer = currbesitz WHERE ekey.ekeyid = keyid;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;



CREATE OR REPLACE TRIGGER ausleihe AFTER INSERT OR UPDATE ON ausleihe
FOR EACH ROW EXECUTE PROCEDURE switchschluesselbesitzer();

-- Beispiel inserts
INSERT INTO ekey (ekeyID, besitzer, zustand, berechtigung, notiz) VALUES ('24CHRXXXX', 'Student', 'funktioniert', 'STUD', NULL), ('35CHRXXXX', 'FSR', 'defekt', 'FSRF', NULL);

INSERT INTO student (matrnr, vorname, nachname, email) VALUES (7200000,'ABC', 'DEF', 'ABC.DEF000@stud.fh-dortmund.de'), (7220300,'ahoi', 'piraten', 'omgeinemail.DEF000@stud.fh-dortmund.de');

INSERT INTO ausleihe (matrnr, ekeyid, beginn, ende, notiz, letzte_rückmeldung, hat_studienbescheinigung) VALUES (7200000,'35CHRXXXX',CURRENT_TIMESTAMP, null, null, null, true), (7220300,'24CHRXXXX',CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'hat rumgezickt', current_timestamp, false);

SELECT * FROM Ausleihe NATURAL JOIN student NATURAL JOIN ekey;
