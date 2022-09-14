import React from "react";
import ParticlesLayout from "../ParticlesLayout";
import {Layout, Typography} from "antd";
import {DesktopLayoutNavigation} from "./DesktopLayoutNavigation";

const {Content} = Layout;

const DesktopLayout = ({children, bottomNavigation = true}) => {
    console.log({bottomNavigation})
    return <Layout
            theme={"light"}
            className={"h-screen max-w-md mx-auto"}
            hasSider={true}>
            <Content>
                {children}
                {bottomNavigation && <DesktopLayoutNavigation />}
            </Content>
        </Layout>
}

export default DesktopLayout;
