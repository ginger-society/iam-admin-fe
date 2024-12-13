import React, { useContext, useEffect, useState } from "react";
import {
  Header,
  AuthHeartBeat,
  HeaderPositionEnum,
  AuthContext, AuthContextInterface
} from "@ginger-society/ginger-ui";
import styles from "./header.module.scss";
import { IAMService } from "@/services";
import { GINGER_SOCIETY_IAM_FRONTEND_USERS } from "@/shared/references";
import version from "@/shared/version.json";

import router from "@/shared/router";
import { ValidateTokenResponse } from "@/services/IAMService_client";
import { APP_ICON, APP_ID, APP_NAME, ORG_NAME } from "@/shared/constants";

interface HeaderContainerProps {
  children?: React.ReactNode;
}

const HeaderContainer: React.FC<HeaderContainerProps> = ({ children }) => {

  const { user } = useContext<AuthContextInterface<ValidateTokenResponse>>(AuthContext);

  const logOut = async () => {
    try {
      const refreshToken = localStorage.getItem("refresh_token");
      if (refreshToken) {
        await IAMService.identityLogout({ logoutRequest: { refreshToken } });
      }
      localStorage.removeItem("refresh_token");
      localStorage.removeItem("access_token");
      location.href = `${GINGER_SOCIETY_IAM_FRONTEND_USERS}#${APP_ID}/logout`;
    } catch (err) {
      console.error(err);
    }
  };

  const navigateToHome = () => {
    router.navigate(`/`);
  };

  const refreshTokenFn = async (refreshToken: string) => {
    const tokens = await IAMService.identityRefreshToken({
      refreshTokenRequest: { refreshToken },
    });
    return tokens.accessToken;
  };


  return (
    <>
      {user && (
        <>
          <AuthHeartBeat refreshTokenFn={refreshTokenFn} />
          <Header
            position={HeaderPositionEnum.Fixed}
            version={version.version}
            brandName={
              <span onClick={navigateToHome} className={styles["home-link"]}>
                <strong>{ORG_NAME}</strong> &gt; {APP_NAME}
              </span>
            }
            user={{
              name: user?.firstName || user.sub.split("@")[0],
              email: user?.sub,
            }}
            icon={
              <img
                className={styles["icon"]}
                src={APP_ICON}
              ></img>
            }
            onLogout={logOut}
            showThemeSwitcher={true}
            arbitaryContent={children}
          />
        </>
      )}
    </>
  );
};

export default HeaderContainer;
