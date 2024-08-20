import { useState } from 'react';
import { useRouter } from 'next/router';
const RegisterStudentForm = () => {
  const [studentData, setStudentData] = useState({
    username: '',
    password: '',
    name: '',
    program: '',
    maxCredits: 0,
  });
  const router = useRouter();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setStudentData({
      ...studentData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const accessToken = localStorage.getItem('accessToken');
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}api/auth/register/student`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        cors: 'no-cors',
        body: JSON.stringify(studentData),
      });

      if (response.ok) {
        alert('Student registered successfully');
        router.push('/admin/students');
        setStudentData({
          username: '',
          password: '',
          name: '',
          program: '',
          maxCredits: 0,
        });
      } else {
        alert('Failed to register student');
      }
    } catch (error) {
      console.error('Error registering student:', error);
      alert('An error occurred while registering the student');
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 w-full max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg"
    >
      <h1 className="text-center text-2xl">Register Student</h1>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Username
        </label>
        <input
          onChange={handleChange}
          type="text"
          name="username"
          value={studentData.username}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Password
        </label>
        <input
          onChange={handleChange}
          type="password"
          name="password"
          value={studentData.password}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Name
        </label>
        <input
          onChange={handleChange}
          type="text"
          name="name"
          value={studentData.name}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Program
        </label>
        <input
          onChange={handleChange}
          type="text"
          name="program"
          value={studentData.program}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Max Credits
        </label>
        <input
          onChange={handleChange}
          type="number"
          name="maxCredits"
          value={studentData.maxCredits}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          required
        />
      </div>
      <button
        type="submit"
        className="w-full py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Register
      </button>
    </form>
  );
};

export default RegisterStudentForm;
