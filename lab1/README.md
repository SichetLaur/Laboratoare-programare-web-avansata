# Laborator 1 - Programare Web Avansata

Acest proiect reprezinta rezolvarea pentru primul laborator la disciplina Programare Web Avansata. In cadrul laboratorului am creat un server HTTP folosind Bun si TypeScript, atat prin implementare manuala cu Bun.serve, cat si folosind framework-ul Hono.

## Rularea proiectului

Instalarea dependentelor:
bun install

Pornirea serverului cu Hono:
bun run hono.ts

Pornirea serverului scris manual:
bun run server.ts

## Endpoints si functionalitati

- GET / - Returneaza un mesaj de intampinare si antetul custom X-Course.
- GET /echo?name=... - Returneaza numele primit in query params.
- POST /echo - Citeste corpul cererii si returneaza continutul si antetul Content-Type.
- GET /time - Afiseaza timpul curent in format ISO si seteaza Cache-Control pe no-store.
- GET /headers - Intoarce toate antetele cererii primite sub forma de obiect JSON.
- GET /status/:code - Valideaza si returneaza codul de status specificat (intre 200 si 599). Daca valoarea este invalida, returneaza 400 Bad Request.

## Tratarea erorilor

- 405 Method Not Allowed: Daca ruta exista dar metoda HTTP nu este suportata (ex. DELETE /), serverul raspunde cu status 405 si antetul Allow cu metodele permise.
- 404 Not Found: Pentru rutele care nu exista pe server.
