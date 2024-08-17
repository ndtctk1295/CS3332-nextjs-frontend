import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import withAuth from '@/hoc/withAuth';
import Header from '@/components/Header';
import data from "@/public/data/class.json"
 const coursesPage = () => {
  const [courses, setCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter();

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    // console.log(accessToken)
    const fetchCourses = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}api/courses/all`, {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
          cors: 'no-cors',
        });
        if (response.ok) {
          const data = await response.json();
          // console.log(data.data)
          setCourses(data.data);
        } else {
          console.error('Failed to fetch courses');
        }
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };

    fetchCourses();
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredCourses = courses.filter(
    (course) =>
      course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.courseCode.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEdit = (courseCode) => {
      console.log(router);
    router.push(`courses/edit/${courseCode}`);
  };

  const handleDelete = async (courseCode) => {
    // Handle delete course logic here, possibly another API call to delete
    console.log(`Deleting course with code: ${courseCode}`);
    try {
      const accessToken = localStorage.getItem('accessToken');
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}api/courses/delete/${courseCode}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        cors: 'no-cors',
      });
      if (response.ok) {
        const data = await response.json();
        console.log(data.data)
        alert('course deleted successfully');
        router.reload();
        router.push('/admin/courses');
      } else {
        console.error('Failed to fetch course data');
      }
    } catch (error) {
      console.error('Error fetching course data:', error);
    }
  };

  const handleCreateCourse = () => {
    router.push('/admin/courses/create'); 
  };



  return (
    <>
    <Header />
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Courses</h1>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by name or code..."
          value={searchTerm}
          onChange={handleSearch}
          className="border border-gray-300 rounded px-4 py-2 w-full"
        />
      </div>
      <button
        onClick={handleCreateCourse}
        className="mb-4 bg-blue-500 text-white px-4 py-2 rounded"
      >
        Create New Course
      </button>
      <div className="grid gap-4">
      {filteredCourses.map((course) => (
    <div
      key={course.courseCode}
      className="p-4 border border-gray-300 rounded flex justify-between items-center"
    >
      <div>
        <h2 className="text-xl font-semibold">{course.name}</h2>
        <p>Course Code: {course.courseCode}</p>
        <p>Duration: {course.duration}</p>
        <p>Credits: {course.credits}</p>
        <p>Tuition Fee Credits: {course.tuitionFeeCredits}</p>
        <p>Weight: {course.weight}</p>

      </div>
      <div className="flex space-x-2">
        <button
          onClick={() => handleEdit(course.courseCode)}
          className="bg-yellow-500 text-white px-4 py-2 rounded"
        >
          Edit
        </button>
        <button
          onClick={() => handleDelete(course.courseCode)}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Delete
        </button>
      </div>
    </div>
  ))}
      </div>
    </div>
    </>
  );
}
export default withAuth(coursesPage);