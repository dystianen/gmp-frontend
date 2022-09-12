import React from 'react';
import {Menu} from "antd";
import {CalendarOutlined, HomeOutlined, SettingOutlined} from "@ant-design/icons";
import Link from 'next/link';

const DesktopLayoutMenu = (props) => (
    <Menu
        defaultOpenKeys={["sub4"]}
        theme="light"
        className={"bg-transparent border-r-0 ml-6"}
        onClick={({keyPath, item}) => {
            // props.closeLeftDrawer();
        }}
        mode="inline"
        selectedKeys={[]}
        onSelect={({setKeys, item, selectedKeys}) => {
        }}
        overflowedIndicator={0}
        forceSubMenuRender={true}
    >
        <Menu.Item key="home">
            <Link href={"/home"}>
                <a>
                    <HomeOutlined/>
                    <span>Home</span>
                </a>
            </Link>
        </Menu.Item>
        <Menu.Item key="about">
            <Link href={"/about"}>
                <a>
                    <CalendarOutlined/>
                    <span>About</span>
                </a>
            </Link>
        </Menu.Item>
        <Menu.Item key="setting">
            <Link href={"/setting"}>
                <a>
                    <SettingOutlined/>
                    <span>Setting</span>
                </a>
            </Link>
        </Menu.Item>
    </Menu>
);

export default DesktopLayoutMenu;
