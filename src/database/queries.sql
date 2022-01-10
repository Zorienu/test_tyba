CREATE DATABASE TEST_TYBA

-- TO USE uuid_generate_v4() FUNCTION
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS USERS (
	ID UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
	EMAIL TEXT UNIQUE,
	NAME TEXT NOT NULL,
	PASSWORD TEXT NOT NULL
) 

CREATE TABLE IF NOT EXISTS SEARCH_HISTORY (
   ID INTEGER PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
   USERID UUID REFERENCES USERS(ID)
   ON DELETE CASCADE ON UPDATE CASCADE,
   LATITUDE REAL NOT NULL,
   LONGITUDE REAL NOT NULL,
   COUNTRYCODE VARCHAR(10),
   COUNTRY TEXT,
   CITY TEXT,
   JADDRESS TEXT,
   SEARCHDATE DATE
)

CREATE TABLE IF NOT EXISTS RESULTS_HISTORY (
   ID INTEGER PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
   SEARCHID INTEGER REFERENCES SEARCH_HISTORY(ID)
   ON DELETE CASCADE ON UPDATE CASCADE,
   LATITUDE REAL NOT NULL,
   LONGITUDE REAL NOT NULL,
   DISTANCE REAL NOT NULL,
   TITLE TEXT,
   AVERAGERATING REAL,
   CATEGORY TEXT,
   ADDRESS TEXT
)