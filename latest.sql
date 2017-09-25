--
-- PostgreSQL database dump
--

-- Dumped from database version 9.6.4
-- Dumped by pg_dump version 9.6.0

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: SCHEMA "public"; Type: COMMENT; Schema: -; Owner: vnuqgbkltqthwu
--

COMMENT ON SCHEMA "public" IS 'standard public schema';


--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS "plpgsql" WITH SCHEMA "pg_catalog";


--
-- Name: EXTENSION "plpgsql"; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION "plpgsql" IS 'PL/pgSQL procedural language';


SET search_path = public, pg_catalog;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: mesa; Type: TABLE; Schema: public; Owner: vnuqgbkltqthwu
--

CREATE TABLE "mesa" (
    "id_mesa" bigint NOT NULL,
    "nombre" "text",
    "precio" integer,
    "caracteristica" "text",
    "fecha_ingreso" "date",
    "id_tipo_mesa" bigint,
    "id_fabricante" bigint
);


ALTER TABLE mesa OWNER TO vnuqgbkltqthwu;

--
-- Name: test_table; Type: TABLE; Schema: public; Owner: vnuqgbkltqthwu
--

CREATE TABLE "test_table" (
    "id" integer,
    "name" "text"
);


ALTER TABLE test_table OWNER TO vnuqgbkltqthwu;

--
-- Data for Name: mesa; Type: TABLE DATA; Schema: public; Owner: vnuqgbkltqthwu
--

COPY "mesa" ("id_mesa", "nombre", "precio", "caracteristica", "fecha_ingreso", "id_tipo_mesa", "id_fabricante") FROM stdin;
\.


--
-- Data for Name: test_table; Type: TABLE DATA; Schema: public; Owner: vnuqgbkltqthwu
--

COPY "test_table" ("id", "name") FROM stdin;
1	hello database
\.


--
-- Name: mesa mesa_pkey; Type: CONSTRAINT; Schema: public; Owner: vnuqgbkltqthwu
--

ALTER TABLE ONLY "mesa"
    ADD CONSTRAINT "mesa_pkey" PRIMARY KEY ("id_mesa");


--
-- PostgreSQL database dump complete
--

