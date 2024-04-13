const { Client } = require('pg');

async function main() {
    const client = new Client({
        host: 'surus.db.elephantsql.com',
        port: 5432,
        database: 'iiypgvhw',
        user: 'iiypgvhw',
        password: 'Ehi-avgvbH-GU06aFXtOZPMEvMwZbH_S',
    });

    try {
        await client.connect();

        const res = await client.query('SELECT NOW() as current_time');
        console.log(res.rows[0]); // Вивід результату запиту на екран

        await createTable(); // Створення таблиці, якщо її не існує

        await insertData(client); // Вставка даних у таблицю

    } catch (error) {
        console.error('Помилка при виконанні запиту:', error);
    } finally {
        await client.end();
    }
}

async function createTable() {
    const client = new Client({
        host: 'surus.db.elephantsql.com',
        port: 5432,
        database: 'iiypgvhw',
        user: 'iiypgvhw',
        password: 'Ehi-avgvbH-GU06aFXtOZPMEvMwZbH_S',
    });

    try {
        await client.connect();
        await client.query(`
            CREATE TABLE IF NOT EXISTS djurnal (
                id SERIAL PRIMARY KEY,
                student_id INTEGER,
                subject VARCHAR(255),
                grade VARCHAR(10)
            )
        `);
        console.log('Таблиця "djurnal" успішно створена.');
    } catch (error) {
        console.error('Помилка при створенні таблиці:', error);
    } finally {
        await client.end();
    }
}

async function insertData(client) {
    try {
        const data = [
            { student_id: 4, subject: 'English', grade: 'A' },
            { student_id: 5, subject: 'History', grade: 'B' },
            { student_id: 6, subject: 'Science', grade: 'C' }
        ];

        for (const item of data) {
            await client.query(`
                INSERT INTO djurnal (student_id, subject, grade)
                VALUES ($1, $2, $3)
            `, [item.student_id, item.subject, item.grade]);
        }

        console.log('Прикладні дані успішно вставлені в таблицю "djurnal".');
    } catch (error) {
        console.error('Помилка при вставці даних:', error);
    }
}

main().catch(console.error);

