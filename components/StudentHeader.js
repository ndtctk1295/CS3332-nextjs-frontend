import Link from 'next/link';

const StudentHeader = () => {

  return (
    <nav className="flex items-center justify-between flex-wrap bg-blue-500 p-6">
      <div className="flex items-center flex-shrink-0 text-white mr-6">
        <span className="font-semibold text-xl tracking-tight">Student Dashboard</span>
      </div>
      <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
        <div className="text-sm lg:flex-grow">
          <Link href="/student">
            <span className="block mt-4 lg:inline-block lg:mt-0 text-blue-200 hover:text-white mr-4">
              Courses Available
            </span>
          </Link>
          <Link href="/student/enrollmentHistory">
            <span className="block mt-4 lg:inline-block lg:mt-0 text-blue-200 hover:text-white mr-4">
              Enrollment History
            </span>
          </Link>
          <Link href="/student/info">
            <span className="block mt-4 lg:inline-block lg:mt-0 text-blue-200 hover:text-white mr-4">
              Student Information
            </span>
          </Link>
        </div>
        <div>
          <a href="/student/cart" className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-blue-500 hover:bg-white mt-4 lg:mt-0">Cart</a>
        </div>
        <div>
          
        </div>
      </div>
    </nav>
  );
};

export default StudentHeader;