CREATE TABLE IF NOT EXISTS courses (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    coursecode TEXT NOT NULL,
    coursename TEXT NOT NULL,
    syllabus TEXT NOT NULL,
    progression TEXT NOT NULL CHECK (progression IN ('A', 'B')),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO courses (coursecode, coursename, syllabus, progression) VALUES 
('DT207G', 'Backend-baserad webbutveckling', 'https://www.miun.se/utbildning/kursplaner-och-utbildningsplaner/DT207G/', 'B'),
('DT208G', 'Programmering i TypeScript', 'https://www.miun.se/utbildning/kursplaner-och-utbildningsplaner/DT208G/', 'A'),
('DT162G', 'Javascriptbaserad webbutveckling', 'https://www.miun.se/utbildning/kursplaner-och-utbildningsplaner/DT162G/', 'B');

.schema courses

SELECT * FROM courses;