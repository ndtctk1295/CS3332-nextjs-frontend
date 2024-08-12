import { useState } from 'react';
import data from "@/public/data/class.json"
const ClassForm = ({ initialData = {}, onSubmit }) => {
  const [formData, setFormData] = useState({
    classCode: initialData.classCode || '',
    course: {
      courseCode: initialData.course?.courseCode || '',
      name: initialData.course?.name || '',
      duration: initialData.course?.duration || '',
      credits: initialData.course?.credits || 0,
      tuitionFeeCredits: initialData.course?.tuitionFeeCredits || 0,
      weight: initialData.course?.weight || 1.0,
    },
    maxStudents: initialData.maxStudents || 0,
    currentStudentCount: initialData.currentStudentCount || 0,
    startDate: initialData.startDate || '',
    endDate: initialData.endDate || '',
    classDays: initialData.classDays || [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('course.')) {
      const courseField = name.split('.')[1];
      setFormData((prevState) => ({
        ...prevState,
        course: { ...prevState.course, [courseField]: value },
      }));
    } else if (name === 'classDays') {
      const days = value.split(',').map((day) => day.trim());
      setFormData((prevState) => ({ ...prevState, classDays: days }));
    } else {
      setFormData((prevState) => ({ ...prevState, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg">
      <div>
        <label className="block text-sm font-medium text-gray-700">Class Code</label>
        <input
          type="text"
          name="classCode"
          value={formData.classCode}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Course Code</label>
        <input
          type="text"
          name="course.courseCode"
          value={formData.course.courseCode}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Course Name</label>
        <input
          type="text"
          name="course.name"
          value={formData.course.name}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Course Duration</label>
        <input
          type="text"
          name="course.duration"
          value={formData.course.duration}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Credits</label>
        <input
          type="number"
          name="course.credits"
          value={formData.course.credits}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Tuition Fee Credits</label>
        <input
          type="number"
          name="course.tuitionFeeCredits"
          value={formData.course.tuitionFeeCredits}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Weight</label>
        <input
          type="number"
          name="course.weight"
          value={formData.course.weight}
          onChange={handleChange}
          step="0.1"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Max Students</label>
        <input
          type="number"
          name="maxStudents"
          value={formData.maxStudents}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Current Student Count</label>
        <input
          type="number"
          name="currentStudentCount"
          value={formData.currentStudentCount}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Start Date</label>
        <input
          type="date"
          name="startDate"
          value={formData.startDate}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">End Date</label>
        <input
          type="date"
          name="endDate"
          value={formData.endDate}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Class Days (comma separated)</label>
        <input
          type="text"
          name="classDays"
          value={formData.classDays.join(', ')}
          onChange={handleChange}
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

export default ClassForm;
