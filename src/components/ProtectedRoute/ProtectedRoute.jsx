import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import NotPermitted from "./NotPermitted";
import { connect } from "react-redux";

const RoleBaseRoute = (props) => {
  const user = useSelector((state) => state.account.user);
  const userRole = user.role;
  if (userRole === "ADMIN") {
    return <>{props.children}</>;
  } else {
    return <NotPermitted />;
  }
};
// function mapStateToProps(state) {
//   return {
//     isAuthenticated: state.account.isAuthenticated,
//   };
// }
const ProtectedRoute = (props) => {
  const isAdminRoute = window.location.pathname.startsWith("/admin");
  const isAuthenticated = useSelector(state => state.account.isAuthenticated)
  
    return (
      <>
        {isAuthenticated === true && isAdminRoute ? (
          <RoleBaseRoute>{props.children}</RoleBaseRoute>
        ) : isAuthenticated === true ? (
          props.children
        ) : (
          <Navigate to="/login" replace />
        )}
  
      </>
    )
};

// export default connect(mapStateToProps)(ProtectedRoute);
export default ProtectedRoute;
