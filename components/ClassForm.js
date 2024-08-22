import { useState } from 'react';
const ClassForm = ({ initialData = {}, onSubmit, checkCourseValidity, actionType, resMsg }) => {
  const [classData, setClassData] = useState({
    classCode: initialData.classCode || '',
    maxStudents: initialData.maxStudents || 0,
    currentStudentCount: initialData.currentStudentCount || 0,
    startDate: initialData.startDate || '',
    endDate: initialData.endDate || '',
    registrationDeadline: initialData.registrationDeadline || '',
    dayOfWeek: initialData.dayOfWeek || '',
  });
  
  // console.log(typeof checkCourseValidity)
  const handleChange = (e) => {
    const { name, value } = e.target;
    setClassData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(classData);
  };
  const setConditionReadonly = () => {
    if (actionType === "editClass" || actionType === "createClass") {
      return false;
    }
    return true;
  };
  const setConditionReadonlyCode = () => {
    if (actionType === "editCourse" || actionType === "editClass") {
      return true;
    }
    return false;
  }
  const setConditionButton = () => {
    if(actionType === "editClass"){
      return "hidden";
    }
    else return "";
  }
  
  const conditionRenderCourseCodeInput = () => {
    if (actionType === "createClass") {
        return (
            <div className=''>
                <label className="block text-sm font-medium text-gray-700">Course Code</label>
                <input
                    type="text"
                    name="courseCode"
                    value={classData.courseCode}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
                <button type="button" className='text-sm bg-blue-500 px-4 py-2 mt-2 text-white rounded-lg' onClick={() => {
                    checkCourseValidity(classData.courseCode);
                }}>Find Course</button>
            </div>
        );
    }
}


  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-6 w-full max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg">
        <h1 className="text-center text-2xl">Class Details</h1>
        <div>
          <label className="block text-sm font-medium text-gray-700">Class Code</label>
          <input
            readOnly={setConditionReadonlyCode()}
            type="text"
            name="classCode"
            value={classData.classCode}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>
        {conditionRenderCourseCodeInput()}
        <div>
          <label className="block text-sm font-medium text-gray-700">Max Students</label>
          <input
          readOnly={setConditionReadonly()}
            type="number"
            name="maxStudents"
            value={classData.maxStudents}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Current Student Count</label>
          <input
          readOnly
            type="number"
            name="currentStudentCount"
            value={classData.currentStudentCount}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Start Date</label>
          <input
          readOnly={setConditionReadonly()}
            type="date"
            name="startDate"
            value={classData.startDate}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">End Date</label>
          <input
          readOnly={setConditionReadonly()}
            type="date"
            name="endDate"
            value={classData.endDate}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Registration Deadline</label>
          <input readOnly={setConditionReadonly()} type="date" name="registrationDeadline" value={classData.registrationDeadline} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Class Days</label>
          {/* <input
          readOnly={setConditionReadonly()}
            type="text"
            name="dayOfWeek"
            value={classData.dayOfWeek}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          /> */}
          <select class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" name="dayOfWeek" value={classData.dayOfWeek} onChange={handleChange}>
          <option>MONDAY</option>
          <option>TUESDAY</option>
          <option>WEDNESDAY</option>
          <option>THURSDAY</option>
          <option>FRIDAY</option>
        </select>
        </div>
        {resMsg && <p className="text-red-500 text-sm">{resMsg}</p>}
        <button
        type="submit"
        className={
          "w-full py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" +
          (setConditionButton())
        }
      >
        Save
      </button>
      </form>
    </>
  );
};

export default ClassForm;
