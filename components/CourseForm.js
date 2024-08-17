import { act, useEffect, useState } from "react";
const CourseForm = ({ initialData = {}, onSubmit, actionType }) => {
  const [courseData, setCourseData] = useState({
    courseCode: initialData.courseCode || "",
    name: initialData.name || "",
    duration: initialData.duration || "",
    credits: initialData.credits || 0,
    tuitionFeeCredits: initialData.tuitionFeeCredits || 0,
    weight: initialData.weight || 1.0,
  });
  useEffect(() => {
    setCourseData({
      courseCode: initialData.courseCode || "",
      name: initialData.name || "",
      duration: initialData.duration || "",
      credits: initialData.credits || 0,
      tuitionFeeCredits: initialData.tuitionFeeCredits || 0,
      weight: initialData.weight || 1.0,
    });
  }, [initialData]);
  // console.log(courseData)
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(courseData);
  };
  // console.log(courseData);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCourseData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const setConditionReadonlyCode = () => {
    if (actionType === "editCourse" || actionType === "editClass" || actionType === "createClass") {
      return true;
    }
    return false;
  }
  const setConditionReadonly = () => {
    if (actionType === "editCourse" || actionType === "createCourse") {
      return false;
    }
    return true;
  };
  const setConditionButton = () => {
    if(actionType === "editCourse" || actionType === "editClass" || actionType === "createClass"){
      // console.log("hidden");
      return "hidden";
    }
    else return "";
  }
  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 w-full max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg"
    >
      <h1 className="text-center text-2xl">Course Details</h1>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Course Code
        </label>
        <input
          readOnly={setConditionReadonlyCode()}
          onChange={handleChange}
          type="text"
          name="courseCode"
          value={courseData.courseCode}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Course Name
        </label>
        <input
          readOnly={setConditionReadonly()}
          onChange={handleChange}
          type="text"
          name="name"
          value={courseData.name}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Course Duration
        </label>
        <input
          readOnly={setConditionReadonly()}
          onChange={handleChange}
          type="text"
          name="duration"
          value={courseData.duration}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Credits
        </label>
        <input
          readOnly={setConditionReadonly()}
          onChange={handleChange}
          type="number"
          name="credits"
          value={courseData.credits}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Tuition Fee Credits
        </label>
        <input
          readOnly={setConditionReadonly()}
          onChange={handleChange}
          type="number"
          name="tuitionFeeCredits"
          value={courseData.tuitionFeeCredits}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Weight
        </label>
        <input
          readOnly={setConditionReadonly()}
          onChange={handleChange}
          type="number"
          name="weight"
          value={courseData.weight}
          step="0.1"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>
      <button
        type="submit"
        className={
          "w-full py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 " +
          (setConditionButton())
        }
      >
        Save
      </button>
    </form>
  );
};
export default CourseForm;
