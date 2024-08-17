import Header from "@/components/Header";
import withAuth from "@/hoc/withAuth";
const dashboardPage = () => {
  return (
    <div>
        <Header />
      <h1>Dashboard</h1>
    </div>
  );
};
export default withAuth(dashboardPage, ['ROLE_ADMIN']);