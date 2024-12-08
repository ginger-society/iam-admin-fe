import router from "@/shared/router";
import { HandleLoginRedirect } from "@ginger-society/ginger-ui";

export const HandleAuth = () => {
  const navigateToHome = () => {
    router.navigate("/users");
  };
  return <HandleLoginRedirect handleNavigation={navigateToHome} />;
};

export default HandleAuth;
