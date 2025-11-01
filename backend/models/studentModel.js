import db from '../config/db.js';

export const findStudentByCredentials = async (reg_number, phone_number) => {
  const [rows] = await db.query(
    'SELECT * FROM students WHERE reg_number = ? AND phone_number = ?',
    [reg_number, phone_number]
  );
  return rows[0]; // returns one student if found
};
