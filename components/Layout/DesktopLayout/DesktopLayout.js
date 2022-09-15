import React from "react";
import {Layout} from "antd";
import {DesktopLayoutNavigation} from "./DesktopLayoutNavigation";

const {Content} = Layout;

const DesktopLayout = ({children, bottomNavigation = true}) => {

    return <Layout
            theme={"light"}
            className={"bg-[#fafafa] h-screen max-w-md mx-auto"}
            hasSider={true}>
            <Content>
                {children}
                {bottomNavigation && <DesktopLayoutNavigation />}
            </Content>
        </Layout>
}

export default DesktopLayout;
