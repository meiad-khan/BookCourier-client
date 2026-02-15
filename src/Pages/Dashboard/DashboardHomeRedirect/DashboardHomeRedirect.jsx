import { useEffect } from "react";
import { useNavigate } from "react-router";
import useRole from "../../../hooks/useRole";
import Loading from "../../../Components/Loading/Loading";

const DashboardHomeRedirect = () => {
  const { role, roleLoading } = useRole();
  const navigate = useNavigate();

  useEffect(() => {
    if (roleLoading) return;

    if (role === "admin") {
      navigate("/dashboard/all-users");
    } else if (role === "librarian") {
      navigate("/dashboard/add-book");
    } else {
      navigate("/dashboard/my-orders");
    }
  }, [role, roleLoading, navigate]);

  return <Loading></Loading>;
};

export default DashboardHomeRedirect;
