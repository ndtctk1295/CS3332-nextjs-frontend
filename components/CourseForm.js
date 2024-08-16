import { useState, useEffect } from "react";

const CourseForm = ({ isEdit, initialData = {}, onSubmit }) => {
  const [formData, setFormData] = useState({
    courseCode: initialData?.courseCode || "",
    name: initialData?.name || "",
    duration: initialData?.duration || "",
    credits: initialData?.credits || 0,
    tuitionFeeCredits: initialData?.tuitionFeeCredits || 0,
    weight: initialData?.weight || 1.0,
  });

  useEffect(() => {
    if (initialData && isEdit) {
      setFormData({
        courseCode: initialData?.courseCode || "",
        name: initialData?.name || "",
        duration: initialData?.duration || "",
        credits: initialData?.credits || 0,
        tuitionFeeCredits: initialData?.tuitionFeeCredits || 0,
        weight: initialData?.weight || 1.0,
      });
    }
  }, [initialData, isEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg"
    >
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Course Code
        </label>
        <input
          type="text"
          name="courseCode" // Cập nhật name cho phù hợp với khóa trong formData
          value={formData.courseCode}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Course Name
        </label>
        <input
          type="text"
          name="name" // Cập nhật name cho phù hợp với khóa trong formData
          value={formData.name}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Course Duration
        </label>
        <input
          type="text"
          name="duration" // Cập nhật name cho phù hợp với khóa trong formData
          value={formData.duration}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Credits
        </label>
        <input
          type="number"
          name="credits" // Cập nhật name cho phù hợp với khóa trong formData
          value={formData.credits}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Tuition Fee Credits
        </label>
        <input
          type="number"
          name="tuitionFeeCredits" // Cập nhật name cho phù hợp với khóa trong formData
          value={formData.tuitionFeeCredits}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Weight
        </label>
        <input
          type="number"
          name="weight" // Cập nhật name cho phù hợp với khóa trong formData
          value={formData.weight}
          onChange={handleChange}
          step="0.1"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>
      <button
        type="submit"
        className="w-full py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Save
      </button>
    </form>
  );
};

export default CourseForm;
