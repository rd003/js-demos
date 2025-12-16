import Database from 'better-sqlite3';
import path from 'path';

const dbPath = path.join(process.cwd(), 'person.db');
const db = new Database(dbPath);

// Create table if it doesn't exist
db.exec(`
  CREATE TABLE IF NOT EXISTS Person (
    Id INTEGER PRIMARY KEY AUTOINCREMENT,
    FirstName TEXT NOT NULL,
    LastName TEXT NOT NULL
  )
`);

export default db;