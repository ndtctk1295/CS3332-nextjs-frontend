import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Header from "@/components/Header";

export default function AllCoursesPage() {
  const [courses, setCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();

  useEffect(() => {
    // let accessToken = localStorage.getItem("accessToken")
    const fetchCourses = async () => {
      try {
        const urlToFetch = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/courses/all`;
        const accessToken = localStorage.getItem("accessToken");
        const response = await fetch(urlToFetch, {
          method: "GET",
          headers: new Headers({
            Authorization: "Bearer " + accessToken,
            "Content-Type": "application/json",
          }),
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setCourses(data.data);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };
    fetchCourses();
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredCourses = courses.filter(
    (course) =>
      course["name"]?.toLowerCase().includes(searchTerm?.toLowerCase()) ||
      course["courseCode"]?.toLowerCase().includes(searchTerm?.toLowerCase())
  );

  const handleEdit = (courseID) => {
    router.push(`/courses/edit/${courseID}`);
  };

  const handleDelete = async (courseID) => {
    const accessToken = localStorage.getItem("accessToken");
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/courses/delete/${courseID}`,
      {
        method: "DELETE",
        credentials: "include",
        headers: new Headers({
          Authorization: "Bearer " + accessToken,
          "Content-Type": "application/json",
        }),
      }
    );
    if (response.ok) {
      alert("Course created successfully");
      router.push("/courses");
    } else {
      alert("Failed to create course");
    }
  };

  const handleCreateCourse = () => {
    router.push("/courses/create");
  };

  return (
    <div>
      <Header />
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">All Courses</h1>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search by name or ID..."
            value={searchTerm}
            onChange={handleSearch}
            className="border border-gray-300 rounded px-4 py-2 w-full"
          />
        </div>
        <button
          onClick={handleCreateCourse}
          className="mb-4 bg-blue-500 text-white px-4 py-2 rounded"
        >
          Create New Course
        </button>
        <div className="grid gap-4">
          {filteredCourses.map((course) => (
            <div
              key={course["courseCode"]}
              className="p-4 border border-gray-300 rounded flex justify-between items-center"
            >
              <div>
                <h2 className="text-xl font-semibold">{course["name"]}</h2>
                <p>Course ID: {course["courseCode"]}</p>
                <p>Duration: {course["duration"]}</p>
                <p>Credits: {course["credits"]}</p>
                <p>Tuition Fee Credits: {course["tuitionFeeCredits"]}</p>
                <p>Weight: {course["weight"]}</p>
              </div>
              <div>
                <button
                  onClick={() => handleEdit(course["courseCode"])}
                  className="bg-yellow-500 text-white px-4 py-2 rounded mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(course["courseCode"])}
                  className="bg-red-500 text-white px-4 py-2 rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
