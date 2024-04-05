DROP TABLE IF EXISTS ekey CASCADE ;
DROP TABLE IF EXISTS student CASCADE ;
DROP TABLE IF EXISTS ausleihe CASCADE ;
DROP TABLE IF EXISTS pfandKasse CASCADE ;
DROP TABLE IF EXISTS einbehaltenesPfand CASCADE ;

CREATE TABLE kassenbuch(
    kassenid INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    file pg_catalog.bytea
);

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
                       pfand INTEGER DEFAULT 25,
                       UNIQUE(ekeyid,ende),
                       FOREIGN KEY (matrnr) REFERENCES student(matrnr),
                       FOREIGN KEY (ekeyid) REFERENCES ekey(ekeyid)

);


CREATE TABLE pfandKasse(
    eintragnr INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    wert INTEGER,
    bemerkung TEXT,
    ausleihid INTEGER,
    ausfuehrung DATE,
    FOREIGN KEY (ausleihid) REFERENCES ausleihe(ausleihnr)
);

CREATE TABLE einbehaltenesPfand(
    eintragnr INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    wert INTEGER,
    ehmausleihid INTEGER,
    ausfuehrung DATE,
    bemerkung TEXT,
    FOREIGN KEY (ehmausleihid) REFERENCES ausleihe(ausleihnr)
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
    pfand INTEGER;
BEGIN
    keyid := NEW.ekeyid;
    pfand := NEW.pfand;
    SELECT besitzer INTO currbesitz FROM ekey WHERE ekey.ekeyid = keyid;


    -- Corrected CASE statement syntax for PL/pgSQL
    IF currbesitz = 'FSR' THEN
        --25 von student nehmen
        currbesitz := 'Student';
        INSERT INTO pfandKasse (wert, ausfuehrung,bemerkung,ausleihid) VALUES (pfand,CURRENT_TIMESTAMP,'Ekey Ausgabe',NEW.ausleihnr);
    ELSE
        -- Handle other cases or do nothing
    END IF;

    UPDATE ekey SET besitzer = currbesitz WHERE ekey.ekeyid = keyid;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE TRIGGER ausleihe AFTER INSERT ON ausleihe
FOR EACH ROW EXECUTE PROCEDURE switchschluesselbesitzer();

-- wenn ekey gesperrt wird pfand zurück nehmen

-- key zurück geben
CREATE OR REPLACE FUNCTION keyzurueckgeben(keyid TEXT) RETURNS TEXT AS $$
DECLARE
    pfandwert INTEGER;
    datum DATE;
    currbesitz TEXT;
    status TEXT;
    oldausleihid INTEGER;
BEGIN
    datum := CURRENT_TIMESTAMP;
    SELECT besitzer INTO currbesitz FROM ekey WHERE ekey.ekeyid = keyid;
    SELECT zustand INTO status FROM ekey WHERE ekey.ekeyid = keyid;
    SELECT pfand INTO pfandwert FROM ausleihe where ekeyid=keyid AND ende IS NULL;
    SELECT ausleihnr INTO oldausleihid FROM ausleihe where ekeyid=keyid AND ende IS NULL;

    IF currbesitz = 'Student' THEN
        --wird an FSR zurück gegeben
        IF status = 'defekt' OR status='funktioniert' THEN
            -- Student ist für rückzahlung freigegeben
            INSERT INTO pfandKasse (wert, ausfuehrung,bemerkung,ausleihid) VALUES (-pfandwert,datum,'ekey Rückgabe',oldausleihid);
        END IF;
    ELSE
    END IF;

    UPDATE ekey SET besitzer='FSR' WHERE ekeyid=keyid;
    UPDATE ausleihe SET ende =datum WHERE ekeyid=keyid AND ende IS NULL;
    RETURN keyid;
END;
$$ LANGUAGE plpgsql;


-- key sperren, Pfand einbehalten
CREATE OR REPLACE FUNCTION keysperren(keyid TEXT) RETURNS TEXT AS $$
DECLARE
    pfandwert INTEGER;
    datum DATE;
    currbesitz TEXT;
    aleihnr INTEGER;
BEGIN
    datum := CURRENT_TIMESTAMP;
    SELECT besitzer INTO currbesitz FROM ekey WHERE ekey.ekeyid = keyid;


    IF currbesitz !='FSR' THEN
        SELECT pfand INTO pfandwert FROM ausleihe where ekeyid=keyid AND ende IS NULL;
        SELECT ausleihnr INTO aleihnr FROM ausleihe where ekeyid=keyid AND ende IS NULL;
        INSERT INTO pfandKasse (wert, ausfuehrung,bemerkung,ausleihid) VALUES (-pfandwert,datum,'ekey gesperrt, Pfand einbehalten',aleihnr);
        INSERT INTO einbehaltenesPfand (wert, ehmausleihid,ausfuehrung, bemerkung) VALUES (pfandwert,aleihnr,datum, 'Ekey Pfand einbehalten');
        UPDATE ausleihe SET ende=datum WHERE ekeyid=keyid AND ende IS NULL;
    END IF;

    UPDATE ekey SET zustand='gesperrt' WHERE ekeyid=keyid;
    RETURN keyid;
END;
$$ LANGUAGE plpgsql;

-- Key war gesperrt und wird zurück genommen
CREATE OR REPLACE FUNCTION keyzurueck(keyid TEXT) RETURNS TEXT AS $$
DECLARE
    currzustand TEXT;
BEGIN
    SELECT zustand INTO currzustand FROM ekey WHERE ekey.ekeyid = keyid;
    IF NOT FOUND THEN
        RAISE EXCEPTION 'Key mit ID % nicht gefunden', keyid;
    END IF;

    IF currzustand ='gesperrt' THEN
        UPDATE ekey SET besitzer='FSR' WHERE ekeyid=keyid;
    ELSE
        RAISE EXCEPTION 'Key mit ID % ist nicht gesperrt', keyid;
    END IF;

    RETURN keyid;
END;
$$ LANGUAGE plpgsql;


-- Key wird entsperrt
CREATE OR REPLACE FUNCTION keyentsperren(keyid TEXT, note TEXT) RETURNS TEXT AS $$
DECLARE
  currzustand TEXT;
  currbesitzer TEXT;
BEGIN
  SELECT zustand INTO currzustand FROM ekey WHERE ekey.ekeyid = keyid;
  SELECT besitzer INTO currbesitzer FROM ekey WHERE ekey.ekeyid = keyid;
  IF NOT FOUND THEN
    RAISE EXCEPTION 'Key mit ID % nicht gefunden', keyid;
  END IF;

  IF currzustand ='gesperrt' THEN
    IF currbesitzer='FSR' THEN
      UPDATE ekey SET zustand='funktioniert', notiz=note WHERE ekeyid=keyid;
    ELSE
      RAISE EXCEPTION 'Key mit ID % ist nicht im FSR Bestand', keyid;
    END IF;
  ELSE
    RAISE EXCEPTION 'Key mit ID % ist nicht gesperrt', keyid;
  END IF;

  RETURN keyid;
END;
$$ LANGUAGE plpgsql;


-- Beispiel inserts
INSERT INTO ekey (ekeyID, besitzer, zustand, berechtigung, notiz) VALUES ('24CHRXXXX', 'Student', 'funktioniert', 'STUD', NULL), ('35CHRXXXX', 'FSR', 'defekt', 'FSRF', NULL);

INSERT INTO student (matrnr, vorname, nachname, email) VALUES (7200000,'ABC', 'DEF', 'ABC.DEF000@stud.fh-dortmund.de'), (7220300,'ahoi', 'piraten', 'omgeinemail.DEF000@stud.fh-dortmund.de');

INSERT INTO ausleihe (matrnr, ekeyid, beginn, ende, notiz, letzte_rückmeldung, hat_studienbescheinigung) VALUES (7200000,'35CHRXXXX',CURRENT_TIMESTAMP, null, null, null, true), (7220300,'24CHRXXXX',CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'hat rumgezickt', current_timestamp, false);

SELECT * FROM Ausleihe NATURAL JOIN student NATURAL JOIN ekey;
