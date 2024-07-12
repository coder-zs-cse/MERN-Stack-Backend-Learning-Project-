import { Navigate, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../redux/userSlice";
const backendURL = import.meta.env.VITE_BACKEND_URL;
import { useEffect } from "react";

function ProtectedRoute(props) {
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  async function getUser() {
    try {
      const responseData = await fetch(
        `${backendURL}/api/v1/user/get-user-info-by-id`,
        {
          method: "POST",
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      const data = await responseData.json();
      if (data.success) {
        // console.log(data.data);
        await dispatch(setUser(data.data));
      } else {
        localStorage.removeItem("token");
        navigate("/login");
      }
    } catch (error) {
      dispatch(setUser(null));
      localStorage.removeItem("token");
      navigate("/login");
    }
  }
  useEffect(() => {
    // if (user && !localStorage.getItem("token")) {
    // }
    if (!user) {
      getUser();
    }
  }, [user]);

  if (localStorage.getItem("token")) {
    return props.children;
  } else {
    return <Navigate to="/login" />;
  }
}

export { ProtectedRoute };

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2OGY4MTgwYmZhODI3ZTA0YjNjYjA5YSIsImlhdCI6MTcyMDc4MDUwOCwiZXhwIjoxNzIwODY2OTA4fQ.clzvya2Xf4JP5Uy3a6AomQ7pI8xxA_n8E8PBNAlAvtg

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2OGUyM2QyNTY1NzEzMDZhMjhiZGVkMyIsImlhdCI6MTcyMDc4MDU4OSwiZXhwIjoxNzIwODY2OTg5fQ.wr8igbBQAVsOvAgupYTSVIKYTbd3Evb2PVc1bQ1AgOE

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2OGUyM2QyNTY1NzEzMDZhMjhiZGVkMyIsImlhdCI6MTcyMDc4MDU4OSwiZXhwIjoxNzIwODY2OTg5fQ.wr8igbBQAVsOvAgupYTSVIKYTbd3Evb2PVc1bQ1AgOE
