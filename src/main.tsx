import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import "../node_modules/@ginger-society/ginger-ui/dist/esm/index.css";
import "./index.css";

import router from "./shared/router";
import { SnackbarProvider, SystemThemePreferred, AuthProvider } from "@ginger-society/ginger-ui";
import { ValidateTokenResponse } from "./services/IAMService_client";
import { IAMService } from "./services";
import { GINGER_SOCIETY_IAM_FRONTEND_USERS } from "./shared/references";
import { APP_ID } from "./shared/constants";

const rootElement = document.querySelector('[data-js="root"]') as HTMLElement;

if (!rootElement) {
  throw new Error("Failed to find the root element");
}

const validateToken = async (): Promise<ValidateTokenResponse> => {
  return IAMService.identityValidateToken();
};


const root = createRoot(rootElement);
root.render(
  <AuthProvider<ValidateTokenResponse>
    validateToken={validateToken}
    navigateToLogin={() =>
      window.location.href = `${GINGER_SOCIETY_IAM_FRONTEND_USERS}#${APP_ID}/login?returnUrl=${router.state.location.search}`
    }
    postLoginNavigate={() =>
      router.navigate("/")
    }
  >
    <SnackbarProvider>
      <SystemThemePreferred>
        <RouterProvider router={router} />
      </SystemThemePreferred>
    </SnackbarProvider>
  </AuthProvider>
);
