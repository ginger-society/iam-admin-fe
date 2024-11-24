import { createHashRouter } from "react-router-dom";
import { withAuthHOC } from "@ginger-society/ginger-ui";
import Home from "@/pages/Home";
import IndexPage from "@/pages/Index";
import HandleAuth from "@/pages/HandleAuth";

const AuthenticatedHome = withAuthHOC(Home);

const router = createHashRouter([
  {
    path: "/",
    element: <IndexPage />,
  },
  {
    path: "/home",
    element: <AuthenticatedHome />,
  },
  {
    path: "/handle-auth/:access_token/:refresh_token",
    element: <HandleAuth />,
  },
]);

export default router;
