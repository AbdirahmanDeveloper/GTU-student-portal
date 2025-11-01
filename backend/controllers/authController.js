import { findStudentByCredentials } from '../models/studentModel.js';

export const loginStudent = async (req, res) => {
    console.log('Login request body:', req.body);
  const { reg_number, phone_number } = req.body;

  try {
    const student = await findStudentByCredentials(reg_number, phone_number);

    if (!student) {
      return res.status(401).json({ message: 'Invalid registration / password' });
    }

    res.json({
      message: 'Login successful',
      student: {
        reg_number: student.reg_number,
        name: student.first_name + ' ' + student.second_name + ' ' + student.last_name,
        email: student.email,
        course: student.course,
        phone_number: student.phone_number,
        alt_phone_number: student.alt_phone_number,
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
