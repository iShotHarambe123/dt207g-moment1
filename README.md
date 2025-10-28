# CV Kurser - Webbapplikation

En webbapplikation för att hantera och visa kurser från CV:t, byggd med Node.js, Express och SQLite som en del av kursen DT207G Backend-baserad webbutveckling. [Länk](https://dt207g-moment1-ry0f.onrender.com/)

## Funktionalitet

- **Visa kurser**: Startsida som listar alla sparade kurser med kurskod, namn, kursplan och progression
- **Lägg till kurs**: Formulär för att lägga till nya kurser med serversidesvalidering
- **Ta bort kurser**: Möjlighet att radera kurser från databasen
- **Om sidan**: Information om applikationen och teknisk implementation

## Teknisk stack

- **Backend**: Node.js med Express framework
- **Databas**: SQLite
- **Frontend**: EJS template engine med responsiv CSS
- **Validering**: Serversidesvalidering av formulärdata

## Databasstruktur

Kursinformation lagras i en SQLite-databas med följande struktur:

```sql
CREATE TABLE courses (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    coursecode TEXT NOT NULL,
    coursename TEXT NOT NULL,
    syllabus TEXT NOT NULL,
    progression TEXT NOT NULL CHECK (progression IN ('A', 'B')),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```
