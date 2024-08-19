import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Header from "@/components/Header";
import StudentHeader from "@/components/StudentHeader";

export default function StudentClassesPage() {
    const [classes, setClasses] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const router = useRouter();
    const { courseCode } = router.query;

    useEffect(() => {
        if (courseCode) {
            const fetchClasses = async () => {
                try {
                    const urlToFetch = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/classes/by-course/${courseCode}`;
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
                    setClasses(data.data);
                } catch (error) {
                    console.error("Error fetching classes:", error);
                }
            };
            fetchClasses();
        }
    }, [courseCode]);

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleAddToCart = async (classCode) => {
        try {
            const urlToFetch = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/class-enrollment/cart/add?classCode=${classCode}`;
            const accessToken = localStorage.getItem("accessToken");
            const response = await fetch(urlToFetch, {
                method: "POST",
                headers: new Headers({
                    Authorization: "Bearer " + accessToken,
                    "Content-Type": "application/json",
                }),
            });
            const data = await response.json();
            if (response.ok) {
                alert("Add to cart successfully");
                router.push("/student");
            } else {
                alert(`Failed to add class to cart: ${data.message}`);
            }
        } catch (error) {
            console.error("Error adding class to cart:", error);
            alert("Error adding class to cart");
        }
    };

    const filteredClasses = classes.filter(
        (course) =>
            course["classCode"]?.toLowerCase().includes(searchTerm?.toLowerCase())
    );

    return (
        <div>
            <StudentHeader title="Classes Available" />
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center my-4">
                    <h1 className="text-3xl font-semibold">Classes Available for {courseCode}</h1>
                    <input
                        type="text"
                        placeholder="Search by course name or code"
                        value={searchTerm}
                        onChange={handleSearch}
                        className="border border-gray-300 rounded p-2 w-1/3"
                    />
                </div>
                <div className="grid gap-4">
                    {filteredClasses.map((course) => (
                        <div
                            key={course["classCode"]}
                            className="p-4 border border-gray-300 rounded flex justify-between items-center"
                        >
                            <div>
                                <h2 className="text-xl font-semibold">{course.course["name"]}</h2>
                                <p>Class Code: {course["classCode"]}</p>
                                <p>Course Code: {course.course["courseCode"]}</p>
                                <p>Max Students: {course["maxStudents"]}</p>
                                <p>Start Date: {course["startDate"]}</p>
                                <p>End Date: {course["endDate"]}</p>
                            </div>
                            <div className="flex space-x-2">
                                <button
                                    onClick={() => handleAddToCart(course["classCode"])}
                                    className="bg-blue-500 text-white px-4 py-2 rounded"
                                >
                                    Add to Cart
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}