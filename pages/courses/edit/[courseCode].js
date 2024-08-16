import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import CourseForm from "../../../components/CourseForm";
import data from "@/public/data/english_courses.json";

const EditCoursePage = () => {
  const router = useRouter();
  const { courseCode } = router.query;
  const [initialData, setInitialData] = useState(null);

  useEffect(() => {
    if (courseCode) {
      const fetchCourseData = async () => {
        try {
          const urlToFetch = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/courses/id/${courseCode}`;
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
    setInitialData(data[0]);
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
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/courses/update/${courseCode}`,
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
          router.push("/courses");
        } else {
          alert("Failed to update course");
        }
      }
    } catch (error) {
      console.error("Error updating course:", error);
    }
  };

  return (
    <div>
      <h1>Edit Course</h1>
      <CourseForm isEdit={true} initialData={initialData} onSubmit={handleSubmit} />
    </div>
  );
};

export default EditCoursePage;
