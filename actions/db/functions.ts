const sqlite3 = require('sqlite3').verbose();

export class dbFunctions {
    static insertCommand(nome: string, resposta: string, tipo: string) {
        let query = `INSERT INTO comandos(nome, resposta, tipo, usos)
                     VALUES(${nome},${resposta},${tipo}, 0)`;
        const db = this.openAndGetDB(sqlite3.OPEN_READWRITE);
        db.run(query);
        console.log(this.getAllCommands());
        return;
    }

    static getAllCommands() {
        const db = this.openAndGetDB(sqlite3.OPEN_READONLY);
        let data: string[] = [];
        let query = `SELECT * FROM comandos ORDER BY nome`;

        db.all(query, [], (err: Error, rows: string[]) => {
            if (err) {
                throw err;
            }
            data = rows;
        });
        this.closeDB(db);
        return data;
    }

    static openAndGetDB(openingMode: any) {
        console.log('openAndGetDB')
        const db = new sqlite3.Database('./actions/db/mordomo.db', openingMode, (err: Error) => {
            if (err) {
                return console.error(err.message);
            }
            console.log('Connected to the in-memory SQlite database.');
        });
        return db;
    }

    static closeDB(db: any) {
        console.log('closeDB')
        db.close((err: Error) => {
            if (err) {
                return console.error(err.message);
            }
            console.log('Close the database connection.');
        });
        return;
    }

}