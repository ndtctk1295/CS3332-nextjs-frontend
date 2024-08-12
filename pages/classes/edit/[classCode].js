import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import ClassForm from '../../../components/ClassForm';
import data from "@/public/data/class.json"
const EditClassPage = () => {
  const router = useRouter();
  const { classCode } = router.query;
  const [initialData, setInitialData] = useState(null);
  console.log(classCode);
  // useEffect(() => {
  //   if (classCode) {
  //     const fetchClassData = async () => {
  //       try {
  //         const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/classes/${classCode}`);
  //         if (response.ok) {
  //           const data = await response.json();
  //           setInitialData(data);
  //         } else {
  //           console.error('Failed to fetch class data');
  //         }
  //       } catch (error) {
  //         console.error('Error fetching class data:', error);
  //       }
  //     };

  //     fetchClassData();
  //   }
  // }, [classCode]);

  const handleSubmit = async (formData) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/classes/${classCode}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert('Class updated successfully');
        router.push('/all-class');
      } else {
        alert('Failed to update class');
      }
    } catch (error) {
      console.error('Error updating class:', error);
    }
  };

  // if (!initialData) return <div>Loading...</div>;
if (!initialData) {
  setInitialData(data[0]);}
  

  return (
    <div>
      <h1>Edit Class</h1>
      <ClassForm initialData={initialData} onSubmit={handleSubmit} />
    </div>
  );
};

export default EditClassPage;
