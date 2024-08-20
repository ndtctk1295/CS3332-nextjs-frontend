import Header from "@/components/Header";
import { useAuth } from "@/context/AuthContext";
import withAuth from "@/hoc/withAuth"
import Link from "next/link";
import React, { useEffect, useState } from 'react';
const getAllStudentsPage = () => {
    const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const {user} = useAuth();
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const accessToken = localStorage.getItem('accessToken');
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}api/admin/students`, {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
          cors: 'no-cors',
        });
        if (response.ok) {
          const data = await response.json();
          // console.log(data.data)
          setStudents(data.data);
        } else {
          console.error('Failed to fetch students data');
        }
      } catch (error) {
        console.error('Error fetching students data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  if (loading) {
    return <div className="flex justify-center items-center h-screen text-xl">Loading...</div>;
  }

  if (error) {
    return <div className="flex justify-center items-center h-screen text-red-500 text-xl">Error: {error}</div>;
  }

  return (
    <>
    <Header role={user.role}/>
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">All Students</h1>
      <button class="bg-blue-500 px-4 py-2 border border-neutral-500 hover:opacity-90 text-white rounded-lg">
        <Link href="/admin/students/register">Register new student</Link>
      </button>
      <div className="overflow-x-auto mt-4">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr className="bg-gray-100 text-gray-700">
              <th className="py-2 px-4 border-b text-center">ID</th>
              <th className="py-2 px-4 border-b text-center">Name</th>
              <th className="py-2 px-4 border-b text-center">Email</th>
              <th className="py-2 px-4 border-b text-center">Course</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student.id} className="hover:bg-gray-50">
                <td className="py-2 px-4 border-b text-center">{student.id}</td>
                <td className="py-2 px-4 border-b text-center">{student.name}</td>
                <td className="py-2 px-4 border-b text-center">{student.email}</td>
                <td className="py-2 px-4 border-b text-center">{student.course}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    </>
  );
};

export default withAuth(getAllStudentsPage, "ROLE_ADMIN")