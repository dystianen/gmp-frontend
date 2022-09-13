import React from "react";
import ParticlesLayout from "../ParticlesLayout";
import {Layout, Typography} from "antd";
import DesktopLayoutHeader from "./DesktopLayoutHeader";
import DesktopLayoutMenu from "./DesktopLayoutMenu";
import {DesktopLayoutNavigation} from "./DesktopLayoutNavigation";

const {Content} = Layout;

const DesktopLayout = ({children}) => {
    return <ParticlesLayout>
        <Layout
            theme={"light"}
            className={"transparent h-screen max-w-md mx-auto"}
            hasSider={true}>
            <Content className={"pr-4"}>
                {children}
            </Content>
        </Layout>
    </ParticlesLayout>
}

export default DesktopLayout;
