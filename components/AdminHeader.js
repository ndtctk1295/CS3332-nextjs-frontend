import Link from 'next/link';
import Image from 'next/image';
import { useAuth } from '@/context/AuthContext';
// import logoBK from "@/public/logo/logoBK.png";
const AdminHeader = () => {
    const {logout} = useAuth();
  return (
    <nav className="flex items-center justify-between flex-wrap bg-BK-header p-6">
      <div className="flex items-center flex-shrink-0 text-white mr-6">
        {/* <span className="font-semibold text-xl tracking-tight">Đăng Ký Học Phần</span> */}
        <Image src={"/logo/logo.png"} width={430}  height={95} alt="logo" />
      </div>
      <div className="block lg:hidden">
        <button className="flex items-center px-3 py-2 border rounded text-white border-blue-400 hover:text-white hover:border-white">
          <svg className="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <title>Menu</title>
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
          </svg>
        </button>
      </div>
      <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
        <div className="text-sm lg:flex-grow w-full gap-x-4 flex">
          <button className='bg-BK-button-red hover:opacity-80 px-4 py-2 rounded-lg text-center'>
          <Link href="/admin/classes">
            <span className="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-white">
              Class
            </span>
          </Link>
          </button>
          <button className='bg-BK-button-red hover:opacity-80 px-4 py-2 rounded-lg text-center'>
          <Link href="/admin/courses">
            <span className="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-white">
              Course
            </span>
          </Link>
          </button>
          <button className='bg-BK-button-red hover:opacity-80 px-4 py-2 rounded-lg text-center'>
          <Link href="/admin/students">
            <span className="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-white">
              Students
            </span>
          </Link>
          </button>
        </div>
        <button className='bg-BK-button-red hover:opacity-80 px-4 py-2 rounded-lg text-center' onClick={logout}>
          <span  className='block mt-4 lg:mt-0 text-white hover:text-white'>
            Sign out
          </span>
        </button>
      </div>
    </nav>
  );
};

export default AdminHeader;