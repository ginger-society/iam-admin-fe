import router from "@/shared/router";
import { HandleLoginRedirect } from "@ginger-society/ginger-ui";

export const HandleAuth = () => {

  const navigateToHome = () => {
    const path = router.state.location.search.split('?returnUrl=')[1]
    if (path) {
      router.navigate(path);
    } else {
      router.navigate("/users");
    }
  };
  return <HandleLoginRedirect handleNavigation={navigateToHome} />;
};

export default HandleAuth;
