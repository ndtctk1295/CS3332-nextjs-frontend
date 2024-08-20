import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Header from "@/components/Header";
import StudentHeader from '@/components/StudentHeader';
import { useAuth } from "@/context/AuthContext";

export default function StudentCoursesPage() {
    const [courses, setCourses] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const router = useRouter();
    const { user } = useAuth();

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const urlToFetch = `${process.env.NEXT_PUBLIC_API_URL}api/courses/all`;
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

    const handleCourseClick = (courseCode) => {
        router.push(`/student/studentClasses?courseCode=${courseCode}`);
    };

    return (
        <div>
            {user ? (
                <Header role={user.role || "ROLE_STUDENT"} />
            ) : (
                <Header role="ROLE_STUDENT" />
            )}
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center my-4">
                    <h1 className="text-3xl font-semibold">All Courses</h1>
                    <input
                        type="text"
                        placeholder="Search by course name or code"
                        className="border border-gray-300 rounded p-2 w-1/3"
                        value={searchTerm}
                        onChange={handleSearch}
                    />
                </div>
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
                                    onClick={() => handleCourseClick(course["courseCode"])}
                                    className="bg-yellow-500 hover:opacity-90 text-white px-4 py-2 rounded mr-2"
                                >
                                    Enroll
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
