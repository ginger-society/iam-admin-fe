import HeaderContainer from "@/components/atoms/HeaderContainer";
import { IAMService } from "@/services";
import { ValidateTokenResponse } from "@/services/IAMService_client";
import { GINGER_SOCIETY_IAM_FRONTEND_USERS } from "@/shared/references";
import router from "@/shared/router";
import { AuthContext, AuthContextInterface, AuthHeartBeat, Header } from "@ginger-society/ginger-ui";
import { useContext } from "react";

const Home = () => {
  
  
  return (
    <div style={{ minHeight: "100vh" }}>
      <HeaderContainer />
    </div>
  );
};

export default Home;
