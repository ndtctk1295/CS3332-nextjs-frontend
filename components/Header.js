import Link from 'next/link';
import Image from 'next/image';
import AdminHeader from './AdminHeader';
import StudentHeader from './StudentHeader';
// import logoBK from "@/public/logo/logoBK.png";
const Header = ({role}) => {
  return (
    <>
      {role === 'ROLE_ADMIN' ? <AdminHeader/> : <StudentHeader/>}
    </>
  );
};

export default Header;