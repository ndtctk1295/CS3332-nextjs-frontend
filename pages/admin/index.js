import Header from "@/components/Header";
import withAuth from "@/hoc/withAuth";
import { useAuth } from "@/context/AuthContext";
import Image from "next/image";
const DashboardPage = () => {
  const { user } = useAuth();
  // console.log(user)
  return (
    <div>
        <Header role={user.role}/>
        <section className="px-6 md:px-12 mt-4 flex flex-col justify-center items-center gap-y-2">
        <h1 className="text-2xl font-bold">Welcome to the Administrator Dashboard</h1>
        <Image src="/img/bachkhoa.webp" alt="admin" width={700} height={5000} />
        </section>
    </div>
  );
};
export default withAuth(DashboardPage, ['ROLE_ADMIN']);