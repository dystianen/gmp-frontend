import React from "react";
import ParticlesLayout from "../ParticlesLayout";
import {Layout, Typography} from "antd";
import DesktopLayoutHeader from "./DesktopLayoutHeader";
import DesktopLayoutMenu from "./DesktopLayoutMenu";

const {Sider, Header, Content, Footer} = Layout;
const {Paragraph, Text} = Typography;

const DesktopLayout = ({children}) => {
    return <ParticlesLayout>
        <Layout
            theme={"light"}
            className={"transparent"}
            hasSider={true}>
            <Sider
                className={"transparent"}
                width={240}
                style={{
                }}
            >
                <div
                    className={"mt-6 mr-0 mb-12 ml-12 font-semibold p-0 text-xl"}
                >
                    Boilerplate
                </div>
                <DesktopLayoutMenu/>
            </Sider>
            <Layout>
                <DesktopLayoutHeader/>
                <Content className={"pr-4"}>
                    {children}
                </Content>
            </Layout>
        </Layout>
    </ParticlesLayout>
}

export default DesktopLayout;
