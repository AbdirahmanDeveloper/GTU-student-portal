import db from '../config/db.js';

export const getFeesByRegNumber = async (reg_number) => {
    const [rows] = await db.query(
        'SELECT * FROM fees WHERE reg_number = ? ORDER BY date DESC',
        [reg_number]
    );
    return rows;
}

