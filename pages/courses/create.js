import CourseForm from "../../components/CourseForm";
import { useRouter } from "next/router";

const CreateCoursePage = () => {
  const router = useRouter();
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
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/courses/create`,
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
          router.push("/courses");
        } else {
          alert("Failed to create course");
        }
      }
    } catch (error) {
      console.error("Error creating course:", error);
    }
  };

  return (
    <div>
      <h1>Create New Course</h1>
      <CourseForm onSubmit={handleSubmit} />
    </div>
  );
};

export default CreateCoursePage;
