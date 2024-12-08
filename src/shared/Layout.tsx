import HeaderContainer from "@/components/atoms/HeaderContainer";
import { idPathMap, pathIdMap, sideMenuOptions } from "@/shared/constants";
import { Breadcrumb, BreadcrumbItem, SideMenu } from "@ginger-society/ginger-ui";
import { ReactNode, useEffect, useState } from "react";
import router from "./router";

const Layout = ({ children, breadcrumbConfig }: { children: ReactNode, breadcrumbConfig: BreadcrumbItem[] }) => {
  const [activeItem, setActiveItem] = useState('home')

  useEffect(() => {
    const matchedKey = Object.keys(pathIdMap).find(key =>
      router.state.location.pathname.startsWith(key)
    );

    if (matchedKey) {
      setActiveItem(pathIdMap[matchedKey]);
    }
  }, [])

  const handleMenuChange = (newId: string) => {
    router.navigate(idPathMap[newId])
    setActiveItem(newId)
  }

  const handleBreadcrumbClick = (path: string) => {
    router.navigate(path);
  }

  return (
    <div style={{ minHeight: "100vh" }}>
      <HeaderContainer />
      <div style={{ display: 'flex', height: 'calc(100vh)', paddingTop: '50px' }}>
        <SideMenu
          options={sideMenuOptions}
          active={activeItem}
          onChange={handleMenuChange}
        />
        <div style={{ padding: '20px', flexGrow: 1 }}>
          <Breadcrumb value={breadcrumbConfig} onClick={handleBreadcrumbClick} />

          {children}


        </div>

      </div>
    </div>
  );
};

export default Layout;
