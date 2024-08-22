import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import ClassForm from '../../../../components/ClassForm';
import CourseForm from '@/components/CourseForm';
// import data from "@/public/data/class.json"
const EditClassPage = () => {
  // console.log("working")
  const router = useRouter();
  const { classCode } = router.query;
  const [initialData, setInitialData] = useState(null);
  // console.log(classCode);
  useEffect(() => {
    if (classCode) {
      const fetchClassData = async () => {
        try {
          const accessToken = localStorage.getItem('accessToken');
          const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}api/classes/search/${classCode}`, {
            headers: {
              'Authorization': `Bearer ${accessToken}`,
              'Content-Type': 'application/json',
            },
            cors: 'no-cors',
          });
          if (response.ok) {
            const data = await response.json();
            // console.log(data)
            setInitialData(data.data);
          } else {
            console.error('Failed to fetch class data');
          }
        } catch (error) {
          console.error('Error fetching class data:', error);
        }
      };

      fetchClassData();
    }
  }, [classCode]);

  const handleSubmit = async (formData) => {
    try {
      const dataToSend = {
        maxStudents: formData.maxStudents,
        currentStudentCount: formData.currentStudentCount,
        startDate: formData.startDate,
        endDate: formData.endDate,
        dayOfWeek: formData.dayOfWeek,
        registrationDeadline: formData.registrationDeadline,
      };
      const accessToken = localStorage.getItem('accessToken');
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}api/classes/update/${classCode}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        },
        body: JSON.stringify(dataToSend),
      });

      if (response.ok) {
        alert('Class updated successfully');
        router.push('/admin/classes');
      } else {
        alert('Failed to update class');
      }
    } catch (error) {
      console.error('Error updating class:', error);
    }
  };
  const handleGoBack = () => {
    router.back();
  }
  if (!initialData) return <div>Loading...</div>;
// if (!initialData) {
//   setInitialData(data[0]);}
  
  // console.log(initialData.course);
  return (
    <section className='flex justify-center items-center min-h-screen'>
      <button onClick={handleGoBack} className='absolute top-10 left-10 bg-blue-500 px-4 py-2 hover:opacity-90 border border-neutral-500 text-white rounded-lg'>Go back</button>
      <ClassForm initialData={initialData} onSubmit={handleSubmit} actionType={"editClass"}/>
      <CourseForm initialData={initialData.course} onSubmit={handleSubmit} actionType={"editClass"}/>
    </section>
  );
};

export default EditClassPage;
