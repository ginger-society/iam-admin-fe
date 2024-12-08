import { createHashRouter } from "react-router-dom";
import { withAuthHOC } from "@ginger-society/ginger-ui";
import HandleAuth from "@/pages/HandleAuth";
import UserForm from "@/pages/users/form";
import UsersList from "@/pages/users/list";
import ManageGroup from "@/pages/manage-group";
import AppForm from "@/pages/apps/form";
import AppsList from "@/pages/apps/list";

const AuthenticatedUserForm = withAuthHOC(UserForm);
const AuthenticatedUsersList = withAuthHOC(UsersList);
const AuthenticatedAppForm = withAuthHOC(AppForm);
const AuthenticatedAppsList = withAuthHOC(AppsList);
const AuthenticatedManageGroup = withAuthHOC(ManageGroup);

const router = createHashRouter([
  {
    path: "/users/edit/:id",
    element: <AuthenticatedUserForm />,
  },
  {
    path: "/users",
    element: <AuthenticatedUsersList />,
  },
  {
    path: "/apps/edit/:id",
    element: <AuthenticatedAppForm />,
  },
  {
    path: "/apps",
    element: <AuthenticatedAppsList />,
  },
  {
    path: "/manage-group/:id?",
    element: <AuthenticatedManageGroup />,
  },
  {
    path: "/handle-auth/:access_token/:refresh_token",
    element: <HandleAuth />,
  },
]);

export default router;
