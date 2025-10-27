CREATE TABLE courses (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    coursecode TEXT NOT NULL,
    coursename TEXT NOT NULL,
    syllabus TEXT NOT NULL,
    progression TEXT NOT NULL CHECK (progression IN ('A', 'B')),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
