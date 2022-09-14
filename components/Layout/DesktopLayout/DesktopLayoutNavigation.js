import React, {useState} from 'react';
import {BiHomeAlt, BiUser} from "react-icons/bi";
import {BsCreditCard2Back} from "react-icons/bs";
import {HiOutlineUsers} from "react-icons/hi";
import {useRouter} from "next/router";
import {Menu} from "antd";

export const DesktopLayoutNavigation = () => {
    const router = useRouter();
    const [setKeys, setSetKeys] = useState(['1']);

    const menu = [
        {
            id: 1,
            name: "Menu",
            url: "/paket_investasi",
            icon: <BiHomeAlt style={styles.icon}/>
        },
        {
            id: 2,
            name: "Downline",
            url: "/downline",
            icon: <HiOutlineUsers style={styles.icon}/>
        },
        {
            id: 3,
            name: "Dompet",
            url: "/wallet",
            icon: <BsCreditCard2Back style={styles.icon}/>
        },
        {
            id: 4,
            name: "Profile",
            url: "/profile",
            icon: <BiUser style={styles.icon}/>
        }
    ];

    return <div className="max-w-md mx-auto rounded-b-lg fixed bg-white drop-shadow-2xl h-20 inset-x-0 bottom-0 z-10">
        <Menu
            mode="horizontal"
            inlineIndent={0}
            className="flex justify-around items-center h-20 pt-3 border-none"
            defaultSelectedKeys={['1']}
            selectedKeys={setKeys}
            onSelect={({selectedKeys}) => setSetKeys(selectedKeys)}>
            {menu.map(it => (
                <Menu.Item key={it.id} onClick={() => router.push(it.url)}>
                    <div className={'-mb-2'}>{it.icon}</div>
                    <span className={'font-bold text-sm'}>{it.name}</span>
                </Menu.Item>
            ))}
        </Menu>
    </div>
}

const styles = {
    icon: {
        fontSize: 24,
        margin: 'auto',
    }
}