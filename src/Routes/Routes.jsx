import {
    createBrowserRouter,
  } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import Dashboard from "../Layout/Dashboard";
import CreateNote from "../pages/Dashboard/Student/CreateNote/CreateNote";
import CreateStudy from "../pages/Dashboard/Tutor/CreateStudy/CreateStudy";
import ViewSession from "../pages/Dashboard/Tutor/ViewSession/ViewSession";
import UploadMaterials from "../pages/Dashboard/Tutor/UploadMaterial/UploadMaterial";
import ViewMaterials from "../pages/Dashboard/Tutor/ViewMaterials/ViewMaterials";
import ViewAllSession from "../pages/Dashboard/Admin/ViewAllSession/ViewAllSession";
import UpdateSession from "../pages/Dashboard/Admin/UpdateSession/UpdateSession";
import PrivateRoute from "./PrivateRoute";
import AdminHome from "../pages/Dashboard/Admin/AdminHome/AdminHome";
import ViewAllUsers from "../pages/Dashboard/Admin/ViewAllUsers/ViewAllUsers";
import TutorRoute from "./TutorRoute";
import AdminRoute from "../AdminRoute";
import ViewAllMaterials from "../pages/Dashboard/Admin/ViewAllMaterials/ViewAllMaterials";
import StudentRoute from "./StudentRoute";
import SessionDetails from "../pages/SessionDetails/SessionDetails";
import ViewNotes from "../pages/Dashboard/Student/ViewNotes/ViewNotes";
import ViewBookedSession from "../pages/Dashboard/Student/ViewBookedSession/ViewBookedSession";
import ViewBookedMaterials from "../pages/Dashboard/Student/ViewBookedMaterials/ViewBookedMaterials";
import MaterialDetails from "../pages/Dashboard/Student/ViewBookedMaterials/MaterialDetails";
import ViewAllNotes from "../pages/Dashboard/Tutor/ViewAllNotes/ViewAllNotes";
import Payment from "../pages/Payment/Payment";

  
export const router = createBrowserRouter([
    {
      path: "/",
      element: <Main></Main>,
      children: [
        {
            path: '/',
            element: <Home></Home>
        },
        {
            path: "/login",
            element: <Login></Login>
        },
        {
            path: "/register",
            element: <Register></Register>
        },
        {
          path: 'sessionDetails/:id',
          element: <PrivateRoute><SessionDetails></SessionDetails></PrivateRoute>,
          loader: ({params}) => fetch(`https://12-study-platform-server.vercel.app/session/${params.id}`)
        },

      //   {
      //     path: "/dashboard/student",
      //     element: <StudentHome></StudentHome>
      // }
      ]
    },
    {
      path: "dashboard",
      element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
      children: [
        // student
        {
          path: 'createNote',
          element: <StudentRoute><CreateNote></CreateNote></StudentRoute>
        },
        {
          path: 'viewNotes',
          element: <StudentRoute><ViewNotes></ViewNotes></StudentRoute>
        },
        {
          path: 'viewBookedSession',
          element: <StudentRoute><ViewBookedSession></ViewBookedSession></StudentRoute>
        },
        {
          path: 'viewBookedMaterials',
          element: <StudentRoute><ViewBookedMaterials></ViewBookedMaterials></StudentRoute>
        },
        {
          path: 'payment',
          element: <StudentRoute><Payment></Payment></StudentRoute>
        },
        {
          path: 'showMaterials/:id',
          element: <StudentRoute><MaterialDetails></MaterialDetails></StudentRoute>,
          loader: ({params}) => fetch(`https://12-study-platform-server.vercel.app/session/${params.id}`)
        },
        // tutor
        {
          path: 'createSession',
          element: <TutorRoute><CreateStudy></CreateStudy></TutorRoute>
        },
        {
          path: 'viewSession',
          element: <TutorRoute><ViewSession></ViewSession></TutorRoute>
        },
        {
          path: 'uploadMaterials',
          element: <TutorRoute><UploadMaterials></UploadMaterials></TutorRoute>
        },
        {
          path: 'viewMaterials',
          element: <TutorRoute><ViewMaterials></ViewMaterials></TutorRoute>
        },
        {
          path: 'viewAllNotes',
          element: <TutorRoute><ViewAllNotes></ViewAllNotes></TutorRoute>
        },
        // admin
        {
          path: 'adminHome',
          element: <AdminHome></AdminHome>
        },
        {
          path: 'viewAllUsers',
          element: <AdminRoute><ViewAllUsers></ViewAllUsers></AdminRoute>
        },
        {
          path: 'viewAllSessions',
          element: <AdminRoute><ViewAllSession></ViewAllSession></AdminRoute>
        },
        {
          path: 'viewAllMaterials',
          element: <AdminRoute><ViewAllMaterials></ViewAllMaterials></AdminRoute>
        },
        {
          path: 'updateSession/:id',
          element: <AdminRoute><UpdateSession></UpdateSession></AdminRoute>,
          loader: ({params}) => fetch(`https://12-study-platform-server.vercel.app/session/${params.id}`)
        },
      ]
    }
  ]);