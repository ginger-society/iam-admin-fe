import { createHashRouter } from "react-router-dom";
import { withAuthHOC } from "@ginger-society/ginger-ui";
import HandleAuth from "@/pages/HandleAuth";
import UserForm from "@/pages/users/form";
import UsersList from "@/pages/users/list";
import ManageGroup, { SearchGroup } from "@/pages/manage-group";
import AppsList from "@/pages/apps/list";
import Home from "@/pages/Home";

const AuthenticatedUserForm = withAuthHOC(UserForm);
const AuthenticatedUsersList = withAuthHOC(UsersList);
const AuthenticatedAppsList = withAuthHOC(AppsList);
const AuthenticatedManageGroup = withAuthHOC(ManageGroup);
const AuthenticatedSearchGroup = withAuthHOC(SearchGroup);
const AuthenticatedHome = withAuthHOC(Home);

const router = createHashRouter([
  {
    path: "/users/edit/:id",
    element: <AuthenticatedUserForm />,
  },
  {
    path: "/users/new",
    element: <AuthenticatedUserForm />,
  },
  {
    path: "/users",
    element: <AuthenticatedUsersList />,
  },
  {
    path: "/",
    element: <AuthenticatedHome />,
  },
  {
    path: "/apps",
    element: <AuthenticatedAppsList />,
  },
  {
    path: "/manage-group",
    element: <AuthenticatedSearchGroup />,
  },
  {
    path: "/manage-group/:id",
    element: <AuthenticatedManageGroup />,
  },
  {
    path: "/handle-auth/:access_token/:refresh_token",
    element: <HandleAuth />,
  },
]);

export default router;
