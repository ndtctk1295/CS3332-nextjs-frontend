import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import StudentHeader from "@/components/StudentHeader";

export default function EnrollmentHistoryPage() {
    const [enrollments, setEnrollments] = useState([]);
    const router = useRouter();

    useEffect(() => {
        const fetchEnrollments = async () => {
            try {
                const urlToFetch = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/class-enrollment/history`;
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
                setEnrollments(data.data);
            } catch (error) {
                console.error("Error fetching enrollments:", error);
            }
        };
        fetchEnrollments();
    }, []);

    const handleDropClass = async (classCode) => {
        const accessToken = localStorage.getItem("accessToken");
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/class-enrollment/drop?classCode=${classCode}`,
            {
                method: "DELETE",
                headers: new Headers({
                    Authorization: "Bearer " + accessToken,
                    "Content-Type": "application/json",
                }),
            }
        );
        if (response.ok) {
            alert("Class dropped successfully");
            router.reload();
            router.push("/student/enrollmentHistory");
        } else {
            alert("Failed to drop class");
        }
    }

    return (
        <div>
        <StudentHeader title="Enrollment History" />
        <div className="container mx-auto p-4">
            
            <h1 className="text-2xl font-bold mb-4">Enrollment History</h1>
            <div className="grid gap-4">
                {enrollments.map((enrollment) => (
                    <div
                        key={enrollment.id}
                        className="p-4 border border-gray-300 rounded flex justify-between items-center"
                    >
                        <div>
                            <h2 className="text-xl font-semibold">{enrollment.enrolledClass.course.name}</h2>
                            <p>Class Code: {enrollment.enrolledClass.classCode}</p>
                            <p>Course Code: {enrollment.enrolledClass.course.courseCode}</p>
                            <p>Max Students: {enrollment.enrolledClass.maxStudents}</p>
                            <p>Current Student Count: {enrollment.enrolledClass.currentStudentCount}</p>
                            <p>Status: {enrollment.status}</p>
                        </div>
                        <div>
                            <button
                                onClick={() => handleDropClass(enrollment.enrolledClass.classCode)}
                                className="bg-red-500 text-white px-4 py-2 rounded mr-2"
                            >
                                Drop Class
                            </button>

                        </div>
                    </div>
                ))}
            </div>
        </div>
        </div>
    );
};
