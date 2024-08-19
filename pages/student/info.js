import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import StudentHeader from "@/components/StudentHeader";

export default function StudentInfoPage() {
    const [studentInfo, setStudentInfo] = useState({});
    const router = useRouter();

    useEffect(() => {
        const fetchStudentInfo = async () => {
            try {
                const urlToFetch = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/student/me`;
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
                setStudentInfo(data.data);
            } catch (error) {
                console.error("Error fetching student info:", error);
            }
        };
        fetchStudentInfo();
    }, []);

    return (
        <div>
            <StudentHeader title="Student Information" />
            <div className="flex justify-center items-center min-h-screen bg-gray-100">
                <div className="bg-white max-w-2xl shadow overflow-hidden sm:rounded-lg">
                    <div className="px-4 py-5 sm:px-6">
                        <h3 className="text-lg leading-6 font-medium text-gray-900">
                            Student Information
                        </h3>
                        <p className="mt-1 max-w-2xl text-sm text-gray-500">
                            Details and informations about student
                        </p>
                    </div>
                    <div className="border-t border-gray-200">
                        <dl>
                            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt className="text-sm font-medium text-gray-500">
                                    Full name
                                </dt>
                                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                    {studentInfo?.name}
                                </dd>
                            </div>
                            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt className="text-sm font-medium text-gray-500">
                                    Student ID
                                </dt>
                                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                    {studentInfo?.studentId}
                                </dd>
                            </div>
                            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt className="text-sm font-medium text-gray-500">
                                    Program
                                </dt>
                                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                    {studentInfo?.program}
                                </dd>
                            </div>
                            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt className="text-sm font-medium text-gray-500">
                                    Max Credits
                                </dt>
                                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                    {studentInfo?.maxCredits}
                                </dd>
                            </div>
                            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt className="text-sm font-medium text-gray-500">
                                    About
                                </dt>
                                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                    ...
                                </dd>
                            </div>
                        </dl>
                    </div>
                </div>
            </div>
        </div>
    );
}