import React, {useState} from 'react';
import {Button, Layout, Menu, Popover, Typography} from "antd";
import {UserOutlined} from "@ant-design/icons";

const {Sider, Header, Content, Footer} = Layout;
const {Paragraph, Text} = Typography;

const DesktopLayoutHeader = (props) => {
    const [clicked, setClicked] = useState(false);

    return (
        <Header className={"flex items-center justify-end"}>
            <Popover
                autoAdjustOverflow={true}
                placement="bottomRight"
                content={
                    <Menu
                        type={"line"}
                        inlineIndent={0}
                        theme="light"
                        className={"bg-transparent border-r-0"}
                        mode="inline"
                    >
                        <Menu.Item>
                            <span>Profile</span>
                        </Menu.Item>
                        <Menu.Item
                            onClick={() => {
                                // store.authentication.logout();
                                // return history.push("/login");
                            }}
                        >
                            <span>Sign out</span>
                        </Menu.Item>
                    </Menu>
                }
                title={
                    <Text>
                        <span className={"font-semibold"}>info@bangun-kreatif.com</span>
                        <Paragraph type={"secondary-dark"}>
                            Administrator
                        </Paragraph>
                    </Text>
                }
                trigger="click"
                visible={clicked}
                onVisibleChange={() => setClicked(!clicked)}
            >
                <Button
                    size={"default"}
                    style={{}}
                    icon={
                        <UserOutlined className={"text-sm"}/>
                    }
                />
            </Popover>
        </Header>
    );
};

export default DesktopLayoutHeader;
