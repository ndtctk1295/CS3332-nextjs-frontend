import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Header from '@/components/Header';

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const urlToFetch = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/class-enrollment/cart`;
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
        setCartItems(data.data);
      } catch (error) {
        console.error("Error fetching cart items:", error);
      }
    };
    fetchCartItems();
  }, []);

    const handleRemoveFromCart = async (classCode) => {

        const accessToken = localStorage.getItem("accessToken");
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/class-enrollment/cart/remove?classCode=${classCode}`,
            {
                method: "DELETE",
                headers: new Headers({
                    Authorization: "Bearer " + accessToken,
                    "Content-Type": "application/json",
                }),
            }
        );
        if (response.ok) {
            alert("Class removed from cart successfully");
            router.reload();
            router.push("/student/cart");
        } else {
            alert("Failed to remove class from cart");
        }
    };

    const handleRegisterOne = async (classCode) => {

        const accessToken = localStorage.getItem("accessToken");
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/class-enrollment/register?classCode=${classCode}`,
            {
                method: "POST",
                headers: new Headers({
                    Authorization: "Bearer " + accessToken,
                    "Content-Type": "application/json",
                }),
            }
        );
        if (response.ok) {
            alert("Class registered successfully");
            router.reload();
            router.push("/student/cart");
        } else {
            alert("Failed to register class");
        }
    };

    const handleRegisterAllCourses = async () => {
      try {  
          const accessToken = localStorage.getItem("accessToken");
          const response = await fetch(
              `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/class-enrollment/cart/register-all`,
              {
                  method: "POST",
                  headers: new Headers({
                      Authorization: "Bearer " + accessToken,
                      "Content-Type": "application/json",
                  }),
                  cor : "no-cors",
              }
          );
          const data = await response.json();
          if (response.ok) {
              alert("All classes registered successfully");
              router.reload();
              router.push("/student/cart");
          } else {
              alert('Failed to register all classes: ' + data.message);
          }
      } catch (error) {
          console.error("Error registering all classes:", error);
          alert("Error registering all classes");
      }
    };

  return (
    <div className="container mx-auto p-4">
      <Header title="Cart" />
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
      <div className="grid gap-4">
        {cartItems.map((item) => (
          <div
            key={item.id}
            className="p-4 border border-gray-300 rounded flex justify-between items-center"
          >
            <div>
              <h2 className="text-xl font-semibold">{item.enrolledClass.course.name}</h2>
              <p>Class Code: {item.enrolledClass.classCode}</p>
              <p>Course Code: {item.enrolledClass.course.courseCode}</p>
              <p>Max Students: {item.enrolledClass.maxStudents}</p>
              <p>Current Student Count: {item.enrolledClass.currentStudentCount}</p>
              <p>Status: {item.status}</p>
            </div>
            <div>
                <button
                    onClick={() => handleRemoveFromCart(item.enrolledClass.classCode)}
                    className="bg-red-500 text-white px-4 py-2 rounded mr-2"
                >
                    Remove from Cart
                </button>

                <button
                    onClick={() => handleRegisterOne(item.enrolledClass.classCode)}
                    className="bg-red-500 text-white px-4 py-2 rounded"
                >
                    Register One
                </button>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center mt-4">
                <button
                    onClick={handleRegisterAllCourses}
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                    Register All Courses
                </button>
      </div>
    </div>
  );
};

export default CartPage;