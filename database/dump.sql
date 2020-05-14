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
21	Japan	https://images.pexels.com/photos/46253/mt-fuji-sea-of-clouds-sunrise-46253.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800	2020-05-19	2020-05-23	Visit Japan with Helen, David, and Frank	ChIJLxl_1w9OZzQRRFJmfNR1QvU
17	China	https://images.pexels.com/photos/683419/pexels-photo-683419.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800	2020-05-14	2020-05-24	Visit the great wall of China	ChIJwULG5WSOUDERbzafNHyqHZU
23	New Zealand	https://images.pexels.com/photos/2259917/pexels-photo-2259917.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800	2020-05-26	2020-05-31	Visit LOTR set	ChIJh5Z3Fw4gLG0RM0dqdeIY1rE
24	Mexico	https://images.pexels.com/photos/2388639/pexels-photo-2388639.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800	2020-05-24	2020-05-30	Get some yummy burritos	ChIJU1NoiDs6BIQREZgJa760ZO0
25	South Africa	https://images.pexels.com/photos/59989/elephant-herd-of-elephants-african-bush-elephant-africa-59989.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800	2020-05-13	2020-05-26	Visit Simba and Nala and the Lion King	ChIJQbeMyNikZh4ReUEdli5FMYE
26	Canada	https://images.pexels.com/photos/1563524/pexels-photo-1563524.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800	2020-05-17	2020-05-23	Visit family for the vacation	ChIJ2WrMN9MDDUsRpY9Doiq3aJk
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
20	UA2765	2020-05-11	LAX	4	United 
21	AC7220	2020-05-11	AKL	4	Canada
23	ewf	2020-05-12	fewfwef	17	fefewfw
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
22	Tiger Sugar	Day 1	At this location, I will	51	17
23	East West Ice Palace	Day 4	Ice skate	52	17
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
44	(37.5665350000000018,126.977969200000004)	ChIJzWXFYYuifDUR64Pq5LTtioU
45	(35.8616600000000076,104.195397)	ChIJwULG5WSOUDERbzafNHyqHZU
46	(36.2048240000000021,138.252924000000007)	ChIJLxl_1w9OZzQRRFJmfNR1QvU
47	(33.9880386999999899,-117.904589400000006)	ChIJ75Fo1xIrw4ARRMGCFLFcNLE
48	(33.8685660000000013,-118.060523500000002)	ChIJd2gVOf8s3YARX_SOrjse-b4
49	(33.8685660000000013,-118.060523500000002)	ChIJd2gVOf8s3YARX_SOrjse-b4
50	(33.9976829000000009,-118.420310900000004)	ChIJERNbcWy6woARfDzciYUJCVM
51	(33.9880386999999899,-117.904589400000006)	ChIJ75Fo1xIrw4ARRMGCFLFcNLE
52	(33.8726659000000012,-118.089230299999997)	ChIJmeB7KW0t3YAR7jG1vgMw41Y
53	(37.5665350000000018,126.977969200000004)	ChIJzWXFYYuifDUR64Pq5LTtioU
54	(36.2048240000000021,138.252924000000007)	ChIJLxl_1w9OZzQRRFJmfNR1QvU
55	(36.2048240000000021,138.252924000000007)	ChIJLxl_1w9OZzQRRFJmfNR1QvU
56	(35.8616600000000076,104.195397)	ChIJwULG5WSOUDERbzafNHyqHZU
57	(-40.9005569999999921,174.885971000000012)	ChIJh5Z3Fw4gLG0RM0dqdeIY1rE
58	(23.6345010000000002,-102.552784000000003)	ChIJU1NoiDs6BIQREZgJa760ZO0
59	(-32.9628159999999895,27.3543026000000005)	ChIJQbeMyNikZh4ReUEdli5FMYE
60	(56.1303660000000022,-106.346771000000004)	ChIJ2WrMN9MDDUsRpY9Doiq3aJk
\.


--
-- Data for Name: Lodging; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."Lodging" ("lodgingId", "lodgingConfNum", "checkInDateTime", "checkOutDateTime", "destinationId", "locationId", "lodgingName") FROM stdin;
10	asdf	2021-05-09	2021-05-15	10	1	Hilton
11	asdf	2021-05-09	2021-05-15	10	1	Hilton
12	asdf	2021-05-09	2021-05-15	10	1	Hilton
57	asdf	2021-05-09	2021-05-15	1	1	Hilton
58	asdf	2021-05-09	2021-05-15	1	1	Hilton
61	ASDF1234	2020-05-11 01:00	2020-05-20 01:00	1	39	The Ritz-Carlton, Laguna Niguel
\.


--
-- Name: Destinations_destinationId_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."Destinations_destinationId_seq"', 26, true);


--
-- Name: Flight_flightId_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."Flight_flightId_seq"', 23, true);


--
-- Name: ItineraryList_itineraryId_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."ItineraryList_itineraryId_seq"', 23, true);


--
-- Name: Locations_locationId_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."Locations_locationId_seq"', 60, true);


--
-- Name: Lodging_lodgingId_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."Lodging_lodgingId_seq"', 64, true);


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

