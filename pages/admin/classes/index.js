import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import withAuth from '@/hoc/withAuth';
import data from "@/public/data/class.json"
import Header from '@/components/Header';
import { useAuth } from '@/context/AuthContext';
 const ClassesPage = () => {
  const [classes, setClasses] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter();
  const { user } = useAuth();
  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    console.log(accessToken)
    const fetchClasses = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}api/classes/all`, {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
          cors: 'no-cors',
        });
        if (response.ok) {
          const data = await response.json();
          console.log(data.data)
          setClasses(data.data);
        } else {
          console.error('Failed to fetch classes');
        }
      } catch (error) {
        console.error('Error fetching classes:', error);
      }
    };

    fetchClasses();
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredClasses = classes.filter(
    (course) =>
      course.course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.course.courseCode.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEdit = (classCode) => {
      console.log(router);
    router.push(`classes/edit/${classCode}`);
  };

  const handleDelete = async (classCode) => {
    // Handle delete course logic here, possibly another API call to delete
    console.log(`Deleting class with code: ${classCode}`);
    try {
      const accessToken = localStorage.getItem('accessToken');
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}api/classes/delete/${classCode}`, {
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
        alert('Class deleted successfully');
        router.push('/classes');
      } else {
        console.error('Failed to fetch class data');
      }
    } catch (error) {
      console.error('Error fetching class data:', error);
    }
  };

  const handleCreateCourse = () => {
    router.push('/admin/classes/create'); 
  };



  return (
    <>
    <Header role={user.role}/>
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Classes</h1>
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
        Create New Class
      </button>
      <div className="grid gap-4">
      {filteredClasses.map((course) => (
    <div
      key={course.classCode}
      className="p-4 border border-gray-300 rounded flex justify-between items-center"
    >
      <div>
        <h2 className="text-xl font-semibold">{course.course.name}</h2>
        <p>Class Code: {course.classCode}</p>
        <p>Course Code: {course.course.courseCode}</p>
        <p>Max Students: {course.maxStudents}</p>
        <p>Start Date: {course.startDate}</p>
        <p>End Date: {course.endDate}</p>
      </div>
      <div className="flex space-x-2">
        <button
          onClick={() => handleEdit(course.classCode)}
          className="bg-yellow-500 text-white px-4 py-2 rounded"
        >
          Edit
        </button>
        <button
          onClick={() => handleDelete(course.classCode)}
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
export default withAuth(ClassesPage);