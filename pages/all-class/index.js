import { useState } from 'react';
import { useRouter } from 'next/router';

const coursesData = [
  // Sample data. Replace with real data or fetch from an API
  {
    id: 1,
    ma_hoc_phan: 'CS101',
    ten_hoc_phan: 'Introduction to Computer Science',
    thoi_luong: '3 months',
    so_tin_chi: 3,
    tc_hoc_phi: '200 USD',
    trong_so: 0.4,
  },
  {
    id: 2,
    ma_hoc_phan: 'CS102',
    ten_hoc_phan: 'Data Structures',
    thoi_luong: '4 months',
    so_tin_chi: 4,
    tc_hoc_phi: '300 USD',
    trong_so: 0.5,
  },
  // Add more course data here
];

export default function CoursesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter();

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredCourses = coursesData.filter(
    (course) =>
      course.ten_hoc_phan.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.ma_hoc_phan.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEdit = (id) => {
    router.push(`/admin/courses/edit/${id}`);
  };

  const handleDelete = (id) => {
    // Handle delete course logic here
    console.log(`Deleting course with id: ${id}`);
  };

  const handleCreateCourse = () => {
    router.push('/admin/courses/create');
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Class</h1>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by name or ID..."
          value={searchTerm}
          onChange={handleSearch}
          className="border border-gray-300 rounded px-4 py-2 w-full"
        />
      </div>
      <button
        onClick={handleCreateCourse}
        className="mb-4 bg-blue-500 text-white px-4 py-2 rounded"
      >
        Create New Class
      </button>
      <div className="grid gap-4">
        {filteredCourses.map((course) => (
          <div
            key={course.id}
            className="p-4 border border-gray-300 rounded flex justify-between items-center"
          >
            <div>
              <h2 className="text-xl font-semibold">{course.ten_hoc_phan}</h2>
              <p>Class ID: {course.ma_hoc_phan}</p>
              <p>Duration: {course.thoi_luong}</p>
              <p>Credits: {course.so_tin_chi}</p>
              <p>Tuition: {course.tc_hoc_phi}</p>
              <p>Weight: {course.trong_so}</p>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => handleEdit(course.id)}
                className="bg-yellow-500 text-white px-4 py-2 rounded"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(course.id)}
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
