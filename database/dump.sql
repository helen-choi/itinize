--
-- PostgreSQL database dump
--

-- Dumped from database version 10.12 (Ubuntu 10.12-0ubuntu0.18.04.1)
-- Dumped by pg_dump version 10.12 (Ubuntu 10.12-0ubuntu0.18.04.1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

ALTER TABLE ONLY public."Lodging" DROP CONSTRAINT "Lodging_pkey";
ALTER TABLE ONLY public."Locations" DROP CONSTRAINT "Locations_pkey";
ALTER TABLE ONLY public."ItineraryList" DROP CONSTRAINT "ItineraryList_pkey";
ALTER TABLE ONLY public."Flight" DROP CONSTRAINT "Flight_pkey";
ALTER TABLE ONLY public."Destinations" DROP CONSTRAINT "Destinations_pkey";
ALTER TABLE public."Lodging" ALTER COLUMN "lodgingId" DROP DEFAULT;
ALTER TABLE public."Locations" ALTER COLUMN "locationId" DROP DEFAULT;
ALTER TABLE public."ItineraryList" ALTER COLUMN "itineraryId" DROP DEFAULT;
ALTER TABLE public."Flight" ALTER COLUMN "flightId" DROP DEFAULT;
ALTER TABLE public."Destinations" ALTER COLUMN "destinationId" DROP DEFAULT;
DROP SEQUENCE public."Lodging_lodgingId_seq";
DROP TABLE public."Lodging";
DROP SEQUENCE public."Locations_locationId_seq";
DROP TABLE public."Locations";
DROP SEQUENCE public."ItineraryList_itineraryId_seq";
DROP TABLE public."ItineraryList";
DROP SEQUENCE public."Flight_flightId_seq";
DROP TABLE public."Flight";
DROP SEQUENCE public."Destinations_destinationId_seq";
DROP TABLE public."Destinations";
DROP EXTENSION plpgsql;
DROP SCHEMA public;
--
-- Name: public; Type: SCHEMA; Schema: -; Owner: -
--

CREATE SCHEMA public;


--
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON SCHEMA public IS 'standard public schema';


--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: Destinations; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."Destinations" (
    "destinationId" integer NOT NULL,
    "destinationName" text NOT NULL,
    "destinationImage" text NOT NULL,
    "tripStart" date NOT NULL,
    "tripEnd" date NOT NULL,
    description text NOT NULL,
    "placeId" text NOT NULL
);


--
-- Name: Destinations_destinationId_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."Destinations_destinationId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: Destinations_destinationId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."Destinations_destinationId_seq" OWNED BY public."Destinations"."destinationId";


--
-- Name: Flight; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."Flight" (
    "flightId" integer NOT NULL,
    "flightNumber" text NOT NULL,
    "flightDate" date NOT NULL,
    "airportDeparture" text NOT NULL,
    "destinationId" integer NOT NULL,
    status text NOT NULL,
    "flightName" text NOT NULL
);


--
-- Name: Flight_flightId_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."Flight_flightId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: Flight_flightId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."Flight_flightId_seq" OWNED BY public."Flight"."flightId";


--
-- Name: ItineraryList; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."ItineraryList" (
    "itineraryId" integer NOT NULL,
    "itineraryName" text NOT NULL,
    "itineraryDay" text NOT NULL,
    "itineraryNote" text NOT NULL,
    "locationId" integer NOT NULL,
    "destinationId" integer NOT NULL
);


--
-- Name: ItineraryList_itineraryId_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."ItineraryList_itineraryId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: ItineraryList_itineraryId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."ItineraryList_itineraryId_seq" OWNED BY public."ItineraryList"."itineraryId";


--
-- Name: Locations; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."Locations" (
    "locationId" integer NOT NULL,
    coordinates point NOT NULL,
    "placeId" text NOT NULL
);


--
-- Name: Locations_locationId_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."Locations_locationId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: Locations_locationId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."Locations_locationId_seq" OWNED BY public."Locations"."locationId";


--
-- Name: Lodging; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."Lodging" (
    "lodgingId" integer NOT NULL,
    "lodgingConfNum" text NOT NULL,
    "checkInDateTime" text NOT NULL,
    "checkOutDateTime" text NOT NULL,
    "destinationId" integer NOT NULL,
    "locationId" integer NOT NULL,
    "lodgingName" text NOT NULL
);


--
-- Name: Lodging_lodgingId_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."Lodging_lodgingId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: Lodging_lodgingId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."Lodging_lodgingId_seq" OWNED BY public."Lodging"."lodgingId";


--
-- Name: Destinations destinationId; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Destinations" ALTER COLUMN "destinationId" SET DEFAULT nextval('public."Destinations_destinationId_seq"'::regclass);


--
-- Name: Flight flightId; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Flight" ALTER COLUMN "flightId" SET DEFAULT nextval('public."Flight_flightId_seq"'::regclass);


--
-- Name: ItineraryList itineraryId; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."ItineraryList" ALTER COLUMN "itineraryId" SET DEFAULT nextval('public."ItineraryList_itineraryId_seq"'::regclass);


--
-- Name: Locations locationId; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Locations" ALTER COLUMN "locationId" SET DEFAULT nextval('public."Locations_locationId_seq"'::regclass);


--
-- Name: Lodging lodgingId; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Lodging" ALTER COLUMN "lodgingId" SET DEFAULT nextval('public."Lodging_lodgingId_seq"'::regclass);


--
-- Data for Name: Destinations; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."Destinations" ("destinationId", "destinationName", "destinationImage", "tripStart", "tripEnd", description, "placeId") FROM stdin;
3	Japan	https://images.pexels.com/photos/590478/pexels-photo-590478.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800	2020-09-09	2020-09-19	I am going to Japan!	dummyplaceId
\.


--
-- Data for Name: Flight; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."Flight" ("flightId", "flightNumber", "flightDate", "airportDeparture", "destinationId", status, "flightName") FROM stdin;
4	1	2021-04-09	LAX	1	pending	Departing Flight
5	1	2021-04-09	LAX	1	pending	Departing Flight
6	1	2021-04-09	LAX	1	pending	Departing Flight
7	1	2021-04-09	LAX	1	pending	Departing Flight
8	1	2021-04-09	LAX	1	pending	Departing Flight
\.


--
-- Data for Name: ItineraryList; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."ItineraryList" ("itineraryId", "itineraryName", "itineraryDay", "itineraryNote", "locationId", "destinationId") FROM stdin;
1	david	Day 2	Hello	5	10
2	Tiger Sugar	Day 2	place	-8	10
3	Tiger Sugar	Day 2	place	8	10
4	Tiger Sugar	Day 2	place	8	10
5	Tiger Sugar	Day 2	place	8	10
6	Tiger Sugar	Day	At this location, I will	24	4
7	Tiger Sugar	Day	At this location, I will	25	4
8	Tiger Sugar	Day	At this location, I will	26	4
9	Tiger Sugar	Day	At this location, I will	27	4
10	Tiger Sugar	Day	At this location, I will	28	4
11	Tiger Sugar	Day	At this location, I will	29	4
12	Tiger Sugar	Day	At this location, I will	30	4
13	Tiger Sugar	Day	At this location, I will	31	5
14	Tiger Sugar	Day	At this location, I will	32	5
15	Tiger Sugar	Day	At this location, I will	33	4
16	Tiger Sugar	Day	At this location, I will	34	3
\.


--
-- Data for Name: Locations; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."Locations" ("locationId", coordinates, "placeId") FROM stdin;
1	(1,4)	stuff
2	(1,4)	stuff
3	(1,4)	stuff
4	(1,3)	stuff
5	(1,3)	stuff
6	(12,12)	asdf
7	(33.9880386999999899,-117.904589400000006)	Some stuff in locations
8	(33.9880386999999899,-117.904589400000006)	Some stuff in locations
9	(12,12)	asdf
10	(12,-12)	asdf
11	(33.9880386999999899,-117.904589400000006)	ChIJ75Fo1xIrw4ARRMGCFLFcNLE
12	(33.9880386999999899,-117.904589400000006)	ChIJ75Fo1xIrw4ARRMGCFLFcNLE
13	(33.9880386999999899,-117.904589400000006)	ChIJ75Fo1xIrw4ARRMGCFLFcNLE
14	(33.9880386999999899,-117.904589400000006)	ChIJ75Fo1xIrw4ARRMGCFLFcNLE
15	(33.9880386999999899,-117.904589400000006)	ChIJ75Fo1xIrw4ARRMGCFLFcNLE
16	(33.9880386999999899,-117.904589400000006)	ChIJ75Fo1xIrw4ARRMGCFLFcNLE
17	(33.9880386999999899,-117.904589400000006)	ChIJ75Fo1xIrw4ARRMGCFLFcNLE
18	(33.9880386999999899,-117.904589400000006)	ChIJ75Fo1xIrw4ARRMGCFLFcNLE
19	(33.9880386999999899,-117.904589400000006)	ChIJ75Fo1xIrw4ARRMGCFLFcNLE
20	(33.9880386999999899,-117.904589400000006)	ChIJ75Fo1xIrw4ARRMGCFLFcNLE
21	(33.9880386999999899,-117.904589400000006)	ChIJ75Fo1xIrw4ARRMGCFLFcNLE
22	(33.9880386999999899,-117.904589400000006)	ChIJ75Fo1xIrw4ARRMGCFLFcNLE
23	(33.9880386999999899,-117.904589400000006)	ChIJ75Fo1xIrw4ARRMGCFLFcNLE
24	(33.9880386999999899,-117.904589400000006)	ChIJ75Fo1xIrw4ARRMGCFLFcNLE
25	(33.9880386999999899,-117.904589400000006)	ChIJ75Fo1xIrw4ARRMGCFLFcNLE
26	(33.9880386999999899,-117.904589400000006)	ChIJ75Fo1xIrw4ARRMGCFLFcNLE
27	(33.9880386999999899,-117.904589400000006)	ChIJ75Fo1xIrw4ARRMGCFLFcNLE
28	(33.9880386999999899,-117.904589400000006)	ChIJ75Fo1xIrw4ARRMGCFLFcNLE
29	(33.9880386999999899,-117.904589400000006)	ChIJ75Fo1xIrw4ARRMGCFLFcNLE
30	(33.9880386999999899,-117.904589400000006)	ChIJ75Fo1xIrw4ARRMGCFLFcNLE
31	(33.9880386999999899,-117.904589400000006)	ChIJ75Fo1xIrw4ARRMGCFLFcNLE
32	(33.9880386999999899,-117.904589400000006)	ChIJ75Fo1xIrw4ARRMGCFLFcNLE
33	(33.9880386999999899,-117.904589400000006)	ChIJ75Fo1xIrw4ARRMGCFLFcNLE
34	(33.9880386999999899,-117.904589400000006)	ChIJ75Fo1xIrw4ARRMGCFLFcNLE
\.


--
-- Data for Name: Lodging; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."Lodging" ("lodgingId", "lodgingConfNum", "checkInDateTime", "checkOutDateTime", "destinationId", "locationId", "lodgingName") FROM stdin;
1	ASDF1234	2021-04-09	2021-04-15	1	1	Some Resort
2	asdf1234	2021/04/09	2021/04/15	1	1	Some Resort
3	asdf1234	2021/04/09	2021/04/15	1	1	Some Resort
4	asdf1234	2021/04/09	2021/04/15	1	1	Some Resort
5	asdf1234	2021/04/09	2021/04/15	1	1	Some Resort
\.


--
-- Name: Destinations_destinationId_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."Destinations_destinationId_seq"', 9, true);


--
-- Name: Flight_flightId_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."Flight_flightId_seq"', 8, true);


--
-- Name: ItineraryList_itineraryId_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."ItineraryList_itineraryId_seq"', 16, true);


--
-- Name: Locations_locationId_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."Locations_locationId_seq"', 34, true);


--
-- Name: Lodging_lodgingId_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."Lodging_lodgingId_seq"', 5, true);


--
-- Name: Destinations Destinations_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Destinations"
    ADD CONSTRAINT "Destinations_pkey" PRIMARY KEY ("destinationId");


--
-- Name: Flight Flight_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Flight"
    ADD CONSTRAINT "Flight_pkey" PRIMARY KEY ("flightId");


--
-- Name: ItineraryList ItineraryList_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."ItineraryList"
    ADD CONSTRAINT "ItineraryList_pkey" PRIMARY KEY ("itineraryId");


--
-- Name: Locations Locations_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Locations"
    ADD CONSTRAINT "Locations_pkey" PRIMARY KEY ("locationId");


--
-- Name: Lodging Lodging_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Lodging"
    ADD CONSTRAINT "Lodging_pkey" PRIMARY KEY ("lodgingId");


--
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: -
--

GRANT ALL ON SCHEMA public TO PUBLIC;


--
-- PostgreSQL database dump complete
--

