import Link from 'next/link';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import Image from 'next/image';
import { useAuth } from '@/context/AuthContext';

const StudentHeader = () => {
//   const { logout } = useContext(AuthContext);
const {logout} = useAuth();
  return (
    <nav className="flex items-center justify-between flex-wrap bg-BK-header p-6">
      <div className="flex items-center flex-shrink-0 text-white mr-6">
        {/* <span className="font-semibold text-xl tracking-tight">Đăng Ký Học Phần</span> */}
        <Image src={"/logo/logo.png"} width={430}  height={95} alt="logo" />
      </div>
      <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
        <div className="text-sm lg:flex-grow w-full gap-x-4 flex">
          <button className='bg-BK-button-red hover:opacity-80 px-4 py-2 rounded-lg text-center'>
          <Link href="/student/courses">
            <span className="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-white">
              Courses Available
            </span>
          </Link>
          </button>
          <button className='bg-BK-button-red hover:opacity-80 px-4 py-2 rounded-lg text-center'>
          <Link href="/student/enrollmentHistory">
            <span className="block mt-4 lg:inline-block lg:mt-0 text-blue-200 hover:text-white">
              Enrollment History
            </span>
          </Link>
          </button>
          <button className='bg-BK-button-red hover:opacity-80 px-4 py-2 rounded-lg text-center'>
          <Link href="/student/cart">
          <span className='block mt-4 lg:inline-block lg:mt-0 text-blue-200 hover:text-white'>
          Cart
          </span>
          </Link>
          </button>
        </div>
        <button className='bg-BK-button-red hover:opacity-80 px-4 py-2 rounded-lg text-center text-white break-normal whitespace-nowrap' onClick={logout}>      
            Sign out
        </button>
      </div>
    </nav>
  );
};

export default StudentHeader;