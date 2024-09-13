--
-- PostgreSQL database dump
--

-- Dumped from database version 16.2
-- Dumped by pg_dump version 16.2

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

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: account; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.account (
    "userId" text NOT NULL,
    type text NOT NULL,
    provider text NOT NULL,
    "providerAccountId" text NOT NULL,
    refresh_token text,
    access_token text,
    expires_at integer,
    token_type text,
    scope text,
    id_token text,
    session_state text
);


ALTER TABLE public.account OWNER TO postgres;

--
-- Name: box; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.box (
    id text DEFAULT gen_random_uuid() NOT NULL,
    name text NOT NULL,
    description text,
    slug text NOT NULL
);


ALTER TABLE public.box OWNER TO postgres;

--
-- Name: question; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.question (
    id text DEFAULT gen_random_uuid() NOT NULL,
    "boxId" text NOT NULL,
    question text NOT NULL,
    answer text NOT NULL,
    "questionNumber" integer NOT NULL
);


ALTER TABLE public.question OWNER TO postgres;

--
-- Name: question_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.question_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.question_id_seq OWNER TO postgres;

--
-- Name: question_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.question_id_seq OWNED BY public.question.id;


--
-- Name: session; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.session (
    "sessionToken" text NOT NULL,
    "userId" text NOT NULL,
    expires timestamp without time zone NOT NULL
);


ALTER TABLE public.session OWNER TO postgres;

--
-- Name: user; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."user" (
    id text NOT NULL,
    name text,
    email text NOT NULL,
    "emailVerified" timestamp without time zone,
    image text
);


ALTER TABLE public."user" OWNER TO postgres;

--
-- Name: user_question; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.user_question (
    "userId" text NOT NULL,
    "questionId" text NOT NULL
);


ALTER TABLE public.user_question OWNER TO postgres;

--
-- Name: user_question_questionId_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."user_question_questionId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."user_question_questionId_seq" OWNER TO postgres;

--
-- Name: user_question_questionId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."user_question_questionId_seq" OWNED BY public.user_question."questionId";


--
-- Name: verificationToken; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."verificationToken" (
    identifier text NOT NULL,
    token text NOT NULL,
    expires timestamp without time zone NOT NULL
);


ALTER TABLE public."verificationToken" OWNER TO postgres;

--
-- Name: user_question questionId; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_question ALTER COLUMN "questionId" SET DEFAULT nextval('public."user_question_questionId_seq"'::regclass);


--
-- Data for Name: account; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.account ("userId", type, provider, "providerAccountId", refresh_token, access_token, expires_at, token_type, scope, id_token, session_state) FROM stdin;
0d1145bf-9762-4e18-94ba-03d8e14a69f2	oauth	google	113038177289289515589	1//09rK9E77J0o66CgYIARAAGAkSNwF-L9IrgAYgyvJju-QP0Hj-qi3e-YYVv-DEFEdgSxHTHCOUqZTh4ESTP_LhiumGWsSPp2xjUpY	ya29.a0Ad52N38n59CZ_J7ZGmn-FUzHc8jo8Q5anj9R_Qv7OMqAoUS2gmNam4ltMpT7OlzPl5AMnhPPdad2Z1qgCuC1DZBTS5Fy6D4V6v3UNNccqegJGYF28f9doHts0C9wG5pwMVYoBR5AUca_TdHnIfL2JsKWu1POMOnjTNJJaCgYKAXgSARASFQHGX2Mi22lxiGAiJ_0M3_VBy-tw5Q0171	1709737355	Bearer	https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile openid	eyJhbGciOiJSUzI1NiIsImtpZCI6IjZmOTc3N2E2ODU5MDc3OThlZjc5NDA2MmMwMGI2NWQ2NmMyNDBiMWIiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJhenAiOiI3NzExNTk3MzA1OTctbnEwbnY1bW92cWNocjI0aGdpb2o3bjUzZDlmYXZuajguYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJhdWQiOiI3NzExNTk3MzA1OTctbnEwbnY1bW92cWNocjI0aGdpb2o3bjUzZDlmYXZuajguYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJzdWIiOiIxMTMwMzgxNzcyODkyODk1MTU1ODkiLCJoZCI6Imh0bHdpZW53ZXN0LmF0IiwiZW1haWwiOiJzY2hhZWZlci5qMTlAaHRsd2llbndlc3QuYXQiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiYXRfaGFzaCI6IjBqSmRxUzFNWUptdnZXX1Y3d0dOX1EiLCJuYW1lIjoiSmFuIFNjaMOkZmVyIiwicGljdHVyZSI6Imh0dHBzOi8vbGgzLmdvb2dsZXVzZXJjb250ZW50LmNvbS9hL0FDZzhvY0xaTUhfZksxNXpFOEdiNUZOeHQ2LVJPMVhTandvcExUenJ0Z2Z5VENNRERnPXM5Ni1jIiwiZ2l2ZW5fbmFtZSI6IkphbiIsImZhbWlseV9uYW1lIjoiU2Now6RmZXIiLCJsb2NhbGUiOiJkZSIsImlhdCI6MTcwOTczMzc1NiwiZXhwIjoxNzA5NzM3MzU2fQ.LGHhQDwFW96gtcVXEfynzs3AJu7vGUfb7-8oIuavDoLCJ-43b_Nm5BXZqV5nydshfDYwhXReTau19-E2ICOi8Y5tjG6Z99AmCeqT0CiBO6_IZdOPql3eiuHqbiBFzoqLV9Z8otIvN9cgcJlpzAqecG4_ecosveIrX-xylyO6fnaY06GZfIMrNV3PFOVkxULGc0NOT9KN0fR8JQgeQSYaJylB3pDWL6ZRjI5mGhvCUGxO26L6SCMH_6TPUAvv19NNB4OgADxx5o_BWiBFvOBPAa_NYG80F4_cx3ULMI8TTkcNYYP5DGMzJE57cgpaJ5nUOKFYtESSnB5V2kO9ybTaSw	\N
\.


--
-- Data for Name: box; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.box (id, name, description, slug) FROM stdin;
9a5373ac-e151-480a-83df-cb555e95a2df	SQL Injection	WTF is SQL-Injection?	squeel-injection
2133d676-0d9a-4687-b4c0-4c128ce8bc2e	Deserialization	Amongus imposter	deserialization
\.


--
-- Data for Name: question; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.question (id, "boxId", question, answer, "questionNumber") FROM stdin;
5dff5ae5-bc41-4cc3-9547-f38d5c875622	9a5373ac-e151-480a-83df-cb555e95a2df	Are you the Lisan Al Gaib?	yes	1
36c285c6-324f-4299-ad32-adc799c8a405	2133d676-0d9a-4687-b4c0-4c128ce8bc2e	Yallah	no	1
d97aebaf-eafd-43a5-95e5-18d8999a860e	9a5373ac-e151-480a-83df-cb555e95a2df	bing?	bong!	2
\.


--
-- Data for Name: session; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.session ("sessionToken", "userId", expires) FROM stdin;
\.


--
-- Data for Name: user; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."user" (id, name, email, "emailVerified", image) FROM stdin;
0d1145bf-9762-4e18-94ba-03d8e14a69f2	Jan Schäfer	schaefer.j19@htlwienwest.at	\N	https://lh3.googleusercontent.com/a/ACg8ocLZMH_fK15zE8Gb5FNxt6-RO1XSjwopLTzrtgfyTCMDDg=s96-c
\.


--
-- Data for Name: user_question; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.user_question ("userId", "questionId") FROM stdin;
0d1145bf-9762-4e18-94ba-03d8e14a69f2	d97aebaf-eafd-43a5-95e5-18d8999a860e
\.


--
-- Data for Name: verificationToken; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."verificationToken" (identifier, token, expires) FROM stdin;
\.


--
-- Name: question_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.question_id_seq', 1, false);


--
-- Name: user_question_questionId_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."user_question_questionId_seq"', 1, false);


--
-- Name: account account_provider_providerAccountId_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.account
    ADD CONSTRAINT "account_provider_providerAccountId_pk" PRIMARY KEY (provider, "providerAccountId");


--
-- Name: box box_name_unique; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.box
    ADD CONSTRAINT box_name_unique UNIQUE (name);


--
-- Name: box box_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.box
    ADD CONSTRAINT box_pkey PRIMARY KEY (id);


--
-- Name: box box_slug_unique; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.box
    ADD CONSTRAINT box_slug_unique UNIQUE (slug);


--
-- Name: question question_boxId_questionNumber_unique; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.question
    ADD CONSTRAINT "question_boxId_questionNumber_unique" UNIQUE ("questionNumber", "boxId");


--
-- Name: question question_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.question
    ADD CONSTRAINT question_pkey PRIMARY KEY (id);


--
-- Name: session session_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.session
    ADD CONSTRAINT session_pkey PRIMARY KEY ("sessionToken");


--
-- Name: user user_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT user_pkey PRIMARY KEY (id);


--
-- Name: user_question user_question_userId_questionId_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_question
    ADD CONSTRAINT "user_question_userId_questionId_pk" PRIMARY KEY ("userId", "questionId");


--
-- Name: verificationToken verificationToken_identifier_token_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."verificationToken"
    ADD CONSTRAINT "verificationToken_identifier_token_pk" PRIMARY KEY (identifier, token);


--
-- Name: account_userId_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "account_userId_idx" ON public.account USING btree ("userId");


--
-- Name: session_userId_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "session_userId_idx" ON public.session USING btree ("userId");


--
-- Name: account account_userId_user_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.account
    ADD CONSTRAINT "account_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES public."user"(id) ON DELETE CASCADE;


--
-- Name: question question_boxId_box_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.question
    ADD CONSTRAINT "question_boxId_box_id_fk" FOREIGN KEY ("boxId") REFERENCES public.box(id) ON DELETE CASCADE;


--
-- Name: session session_userId_user_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.session
    ADD CONSTRAINT "session_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES public."user"(id) ON DELETE CASCADE;


--
-- Name: user_question user_question_questionId_question_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_question
    ADD CONSTRAINT "user_question_questionId_question_id_fk" FOREIGN KEY ("questionId") REFERENCES public.question(id) ON DELETE CASCADE;


--
-- Name: user_question user_question_userId_user_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_question
    ADD CONSTRAINT "user_question_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES public."user"(id) ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

