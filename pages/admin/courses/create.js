// import CourseForm from "../../components/CourseForm";
import CourseForm from "@/components/CourseForm";
import { useRouter } from "next/router";
import { useState } from "react";
const CreateCoursePage = () => {
  const router = useRouter();
  const [initialData, setInitialData] = useState({
    courseCode: '',
    name: '',
    duration: '',
    credits: 0,
    tuitionFeeCredits: 0.0,
    weight: 0.0,
  });
  const [msg, setMsg] = useState("");
  const handleSubmit = async (formData) => {
    try {
      if (
        formData.courseCode === "" ||
        formData.name === "" ||
        formData.duration === "" ||
        formData.credits == 0
      ) {
        setMsg("Please fill in all fields and credits are not allowed to be 0");
        return;
      } else {
        const accessToken = localStorage.getItem("accessToken");
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}api/courses/create`,
          {
            method: "POST",
            // credentials: "include",
            headers: new Headers({
              Authorization: "Bearer " + accessToken,
              "Content-Type": "application/json",
            }),
            body: JSON.stringify(formData),
          }
        );
        if (response.ok) {
          alert("Course created successfully");
          router.push("/admin/courses");
        } else {
          alert("Failed to create course");
        }
      }
    } catch (error) {
      console.error("Error creating course:", error);
    }
  };
  const handleGoBack = () => {
    router.back();
  }
  return (
    <div>
      <button onClick={handleGoBack} className='absolute top-10 hover:opacity-90 left-10 bg-blue-500 px-4 py-2 border border-neutral-500 text-white rounded-lg'>Go back</button>
      <CourseForm initialData={initialData}  onSubmit={handleSubmit} actionType={"createCourse"} resMsg={msg} />
    </div>
  );
};

export default CreateCoursePage;