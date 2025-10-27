const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Skapar expressappen
const app = express();
const port = process.env.PORT || 3000;

// Databassetup
const databas = new sqlite3.Database('./cv.db', (err) => {
    if (err) {
        console.error('Kunde inte öppna databasen:', err.message);
    } else {
        console.log('Ansluten till SQLite-databasen');
        // Skapar tabellen om den inte finns
        databas.run(`CREATE TABLE IF NOT EXISTS courses (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            coursecode TEXT NOT NULL,
            coursename TEXT NOT NULL,
            syllabus TEXT NOT NULL,
            progression TEXT NOT NULL CHECK (progression IN ('A', 'B')),
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )`);
    }
});

// Middleware
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Startsida
app.get('/', (req, res) => {
    // Hämtar alla kurser, nyaste först
    databas.all('SELECT * FROM courses ORDER BY created_at DESC', (err, kurser) => {
        if (err) {
            console.error('Fel vid hämtning av kurser:', err);
            res.render('index', { courses: [], error: 'Kunde inte ladda kurser' });
        } else {
            console.log(`Hittade ${kurser.length} kurser i databasen`); // Debug-info
            res.render('index', { courses: kurser, error: null });
        }
    });
});

app.get('/add-course', (req, res) => {
    res.render('add-course', { error: null, success: null });
});

app.post('/add-course', (req, res) => {
    const { coursecode, coursename, syllabus, progression } = req.body;

    console.log('Försöker lägga till kurs:', coursecode); // Lite debug

    // Koll så alla fält är ifyllda
    if (!coursecode || !coursename || !syllabus || !progression) {
        return res.render('add-course', {
            error: 'Alla fält måste fyllas i',
            success: null
        });
    }

    // Progression ska vara A eller B
    if (!['A', 'B'].includes(progression.toUpperCase())) {
        return res.render('add-course', {
            error: 'Progression måste vara A eller B',
            success: null
        });
    }

    // koll att URL:en ser riktig ut
    if (!syllabus.startsWith('http')) {
        return res.render('add-course', {
            error: 'Kursplanen måste vara en giltig URL (börja med http)',
            success: null
        });
    }

    // Sparar kursen i databasen
    databas.run(
        'INSERT INTO courses (coursecode, coursename, syllabus, progression) VALUES (?, ?, ?, ?)',
        [coursecode.trim(), coursename.trim(), syllabus.trim(), progression.toUpperCase()],
        function (err) {
            if (err) {
                console.error('Databasfel:', err);
                res.render('add-course', {
                    error: 'Något gick fel när kursen skulle sparas',
                    success: null
                });
            } else {
                console.log('Kurs tillagd med ID:', this.lastID);
                res.render('add-course', {
                    error: null,
                    success: 'Kursen har lagts till framgångsrikt!'
                });
            }
        }
    );
});

app.post('/delete-course/:id', (req, res) => {
    const kursId = req.params.id;

    console.log('Raderar kurs med ID:', kursId);

    databas.run('DELETE FROM courses WHERE id = ?', [kursId], function (err) {
        if (err) {
            console.error('Fel vid radering:', err);
        } else {
            console.log('Kurs raderad, antal rader påverkade:', this.changes);
        }
        res.redirect('/');
    });
});

app.get('/about', (req, res) => {
    res.render('about');
});

// Startar servern
app.listen(port, () => {
    console.log(`Servern körs på http://localhost:${port}`);
    console.log('Tryck Ctrl+C för att stoppa servern');
});

// Stänger databasen när servern stoppas
process.on('SIGINT', () => {
    console.log('\nStänger ner servern...');
    databas.close((err) => {
        if (err) {
            console.error('Fel vid stängning av databas:', err.message);
        } else {
            console.log('Databasanslutning stängd');
        }
        process.exit(0);
    });
});