import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Header from "@/components/Header";
import StudentHeader from "@/components/StudentHeader";
import { useAuth } from "@/context/AuthContext";
export default function StudentClassesPage() {
    const [classes, setClasses] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const router = useRouter();
    const { courseCode } = router.query;
    const { user } = useAuth();
    useEffect(() => {
        if (courseCode) {
            const fetchClasses = async () => {
                try {
                    const urlToFetch = `${process.env.NEXT_PUBLIC_API_URL}api/classes/by-course/${courseCode}`;
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
                    // console.log(data)
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
            const urlToFetch = `${process.env.NEXT_PUBLIC_API_URL}api/class-enrollment/cart/add?classCode=${classCode}`;
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
        <>
        <Header role={user.role}/>
        <section className="px-6 md:px-12 mt-4">
            <h1 className="text-2xl font-bold mb-4">Classes Available for {courseCode}</h1>
            <div className="mb-4">
                <input
                    type="text"
                    placeholder="Search by name or code..."
                    value={searchTerm}
                    onChange={handleSearch}
                    className="border border-gray-300 rounded px-4 py-2 w-full"
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
        </section>
        </>
    );
}