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

ALTER TABLE ONLY public."Flight" DROP CONSTRAINT "Flight_pkey";
ALTER TABLE ONLY public."Destinations" DROP CONSTRAINT "Destinations_pkey";
ALTER TABLE public."Flight" ALTER COLUMN "flightId" DROP DEFAULT;
ALTER TABLE public."Destinations" ALTER COLUMN "destinationId" DROP DEFAULT;
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
-- Name: Destinations destinationId; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Destinations" ALTER COLUMN "destinationId" SET DEFAULT nextval('public."Destinations_destinationId_seq"'::regclass);


--
-- Name: Flight flightId; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Flight" ALTER COLUMN "flightId" SET DEFAULT nextval('public."Flight_flightId_seq"'::regclass);


--
-- Data for Name: Destinations; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."Destinations" ("destinationId", "destinationName", "destinationImage", "tripStart", "tripEnd", description, "placeId") FROM stdin;
\.


--
-- Data for Name: Flight; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."Flight" ("flightId", "flightNumber", "flightDate", "airportDeparture", "destinationId", status, "flightName") FROM stdin;
\.


--
-- Name: Destinations_destinationId_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."Destinations_destinationId_seq"', 1, false);


--
-- Name: Flight_flightId_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."Flight_flightId_seq"', 1, false);


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
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: -
--

GRANT ALL ON SCHEMA public TO PUBLIC;


--
-- PostgreSQL database dump complete
--

