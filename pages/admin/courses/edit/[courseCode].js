import { useRouter } from "next/router";
import { useEffect, useState } from "react";
// import data from "@/public/data/english_courses.json";
import CourseForm from "@/components/CourseForm";

const EditCoursePage = () => {
  const router = useRouter();
  const { courseCode } = router.query;
  const [initialData, setInitialData] = useState(null);

  useEffect(() => {
    if (courseCode) {
      const fetchCourseData = async () => {
        try {
          const urlToFetch = `${process.env.NEXT_PUBLIC_API_URL}api/courses/id/${courseCode}`;
          const accessToken = localStorage.getItem("accessToken");
          const response = await fetch(urlToFetch, {
            method: "GET",
            // credentials: "include",
            headers: new Headers({
              Authorization: "Bearer " + accessToken,
              "Content-Type": "application/json",
            }),
            cors: 'no-cors',
          });
          if (response.ok) {
            const data = await response.json();
            console.log(data.data);
            setInitialData(data.data);
          } else {
            console.error("Failed to fetch course data");
          }
        } catch (error) {
          console.error("Error fetching course data:", error);
        }
      };

      fetchCourseData();
    }
  }, [courseCode]);

  if (!initialData) {
    // setInitialData(data[0]);
    return <div>Loading...</div>;
  }

  const handleSubmit = async (formData) => {
    try {
      if (
        formData.courseCode === "" ||
        formData.name === "" ||
        formData.duration === ""
      ) {
        return;
      } else {
        const accessToken = localStorage.getItem("accessToken");
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}api/courses/update/${courseCode}`,
          {
            method: "PUT",
            // credentials: "include",
            headers: new Headers({
              Authorization: "Bearer " + accessToken,
              "Content-Type": "application/json",
            }),
            body: JSON.stringify(formData),
          }
        );
        if (response.ok) {
          alert("Course updated successfully");
          router.push("/admin/courses");
        } else {
          alert("Failed to update course");
        }
      }
    } catch (error) {
      console.error("Error updating course:", error);
    }
  };
  const handleGoBack = () => {
    router.back();
  }

  return (
    <div>
      <h1>Edit Course</h1>
      <button onClick={handleGoBack} className='absolute top-10 left-10 bg-blue-500 px-4 py-2 hover:opacity-90 border border-neutral-500 text-white rounded-lg'>Go back</button>

      <CourseForm actionType={"editCourse"} initialData={initialData} onSubmit={handleSubmit} />
    </div>
  );
};

export default EditCoursePage;