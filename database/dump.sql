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
    "locationId" integer NOT NULL
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
14	United States	https://images.pexels.com/photos/259027/pexels-photo-259027.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800	2020-05-11	2020-05-12	as	ChIJPV4oX_65j4ARVW8IJ6IJUYs
\.


--
-- Data for Name: Flight; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."Flight" ("flightId", "flightNumber", "flightDate", "airportDeparture", "destinationId", "flightName") FROM stdin;
4	1	2021-04-09	LAX	1	Departing Flight
5	1	2021-04-09	LAX	1	Departing Flight
6	1	2021-04-09	LAX	1	Departing Flight
7	1	2021-04-09	LAX	1	Departing Flight
8	1	2021-04-09	LAX	1	Departing Flight
9	d2222	2020-05-14	SAD	2	ccsc
10	101010	2020-05-26	MXC	2	Router
11	39393	2020-05-31	Connected	2	the third one
12	99999	2020-05-31	JFK	3	MEXICO
15	JA-1010	2020-05-13	LAX	5	Japan
16	JAL110	2020-05-30	SFO	5	Second Flight
19	cccc	2020-05-27	cccc	4	cccc
\.


--
-- Data for Name: ItineraryList; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."ItineraryList" ("itineraryId", "itineraryName", "itineraryDay", "itineraryNote", "locationId", "destinationId") FROM stdin;
17	Tiger Sugar	Day	At this location, I will	35	10
18	Tiger Sugar	Day	At this location, I will	36	12
19	Tiger Sugar	Day	At this location, I will	37	12
20	Tiger Sugar	Day 1	At this location, I will	39	14
21	Burger King	Day	At this location, I will	40	14
\.


--
-- Data for Name: Locations; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."Locations" ("locationId", coordinates, "placeId") FROM stdin;
36	(33.9880386999999899,-117.904589400000006)	ChIJ75Fo1xIrw4ARRMGCFLFcNLE
37	(33.9880386999999899,-117.904589400000006)	ChIJ75Fo1xIrw4ARRMGCFLFcNLE
38	(36.7782610000000005,-119.417932399999998)	ChIJPV4oX_65j4ARVW8IJ6IJUYs
39	(33.9880386999999899,-117.904589400000006)	ChIJ75Fo1xIrw4ARRMGCFLFcNLE
40	(33.8394139999999979,-118.285613400000003)	ChIJl9jnb0U13YARGT7RnzC-nGo
41	(36.7782610000000005,-119.417932399999998)	ChIJPV4oX_65j4ARVW8IJ6IJUYs
42	(40,35)	12345
43	(40,35)	12345
\.


--
-- Data for Name: Lodging; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."Lodging" ("lodgingId", "lodgingConfNum", "checkInDateTime", "checkOutDateTime", "destinationId", "locationId") FROM stdin;
\.


--
-- Name: Destinations_destinationId_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."Destinations_destinationId_seq"', 15, true);


--
-- Name: Flight_flightId_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."Flight_flightId_seq"', 19, true);


--
-- Name: ItineraryList_itineraryId_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."ItineraryList_itineraryId_seq"', 21, true);


--
-- Name: Locations_locationId_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."Locations_locationId_seq"', 43, true);


--
-- Name: Lodging_lodgingId_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."Lodging_lodgingId_seq"', 9, true);


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

