import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import NotPermitted from "./NotPermitted";

const RoleBaseRoute = (props) => {
  const user = useSelector((state) => state.account.user);
  const userRole = user.role;
  if (userRole === "ADMIN") {
    return <>{props.children}</>;
  } else {
    return <NotPermitted />;
  }
};
const ProtecedRoute = (props) => {
  const isAuthenticated = useSelector((state) => state.account.isAuthenticated);
  const isAdminRoute = window.location.pathname.startsWith("/admin");
  console.log('authen protect ', isAuthenticated)
  return (
    <>
      {
        isAuthenticated === true && isAdminRoute ?
        <RoleBaseRoute>
          {props.children}
        </RoleBaseRoute> 
        :
          isAuthenticated === true ?
          props.children
          :
          <Navigate to='/' replace />       
      }
    </>
  );
};

export default ProtecedRoute;
