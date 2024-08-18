import Header from "@/components/Header";
import withAuth from "@/hoc/withAuth";
import { useAuth } from "@/context/AuthContext";
const dashboardPage = () => {
  const { user } = useAuth();
  // console.log(user)
  return (
    <div>
        <Header role={user.role}/>
      <h1>Dashboard</h1>
    </div>
  );
};
export default withAuth(dashboardPage, ['ROLE_ADMIN']);