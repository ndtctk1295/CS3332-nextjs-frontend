import ClassForm from '../../../components/ClassForm';
import CourseForm from '@/components/CourseForm';
import { useState } from 'react';
import { useRouter } from 'next/router';
const CreateClassPage = () => {
  const router = useRouter();
  const [initialData, setInitialData] = useState({
    classCode: '',
    maxStudents: 0,
    currentStudentCount: 0,
    startDate: '',
    endDate: '',
    classDays: '',
  });
  const [resMsg, setResMsg] = useState('');
  const [isCourseValid, setIsCourseValid] = useState(false);  const handleSubmit = async (formData) => {
    if(isCourseValid){
      try {
        // console.log(haveCheckedCourse);
        console.log(formData);
        // const dataToSend = {
        //   classCode: formData.classCode,
        //   maxStudents: formData.maxStudents,
        //   currentStudentCount: formData.currentStudentCount,
        //   startDate: formData.startDate,
        //   endDate: formData.endDate,
        //   classDays: formData.classDays,
        // }
        const accessToken = localStorage.getItem('accessToken');
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}api/classes/create?courseCode=${formData.courseCode}`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
        if (response.ok) {
          alert('Class created successfully');
          router.push('/admin/classes');
        } else {
          alert('Failed to create class');
          const data = await response.json();
          setResMsg('Failed to create class: ' + data.message);
        }
      } catch (error) {
        console.error('Error creating class:', error);
      }
      // console.log(formData);
    }
 
  };


  const checkCourseValidity = async (courseCode) => {
    try {
      const accessToken = localStorage.getItem('accessToken');
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}api/courses/id/${courseCode}`, {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        cors: 'no-cors',
      });
      if (response.ok) {
        const data = await response.json();
        console.log(data.data)
        setIsCourseValid(true);
        setInitialData(data.data);
      } else {
        console.error('Failed to fetch class data');
        setIsCourseValid(false);
      }
    } catch (error) {
      console.error('Error fetching class data:', error);
      setIsCourseValid(false);
    }
    // console.log(courseCode);
  }
  const handleGoBack = () => {
    router.back();
  }

  return (
    <>
    <section className='flex justify-center items-center min-h-screen' >
      <button onClick={handleGoBack} className='hover:opacity-90 absolute top-10 left-10 bg-blue-500 px-4 py-2 border border-neutral-500 text-white rounded-lg'>Go back</button>
      <ClassForm initialData={initialData} checkCourseValidity={checkCourseValidity} onSubmit={handleSubmit} actionType={"createClass"} resMsg={resMsg} />
      <CourseForm initialData={initialData} checkCourseValidity={checkCourseValidity} onSubmit={handleSubmit} actionType={"createClass"} resMsg/>
    </section>
    </>
  );
};

export default CreateClassPage;
