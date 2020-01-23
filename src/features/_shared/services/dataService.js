import { apiGet } from './apiService';

export async function getCurrentStudentData() {
  const response = await apiGet('/student/current-student', 'current student');
  return response;
}
