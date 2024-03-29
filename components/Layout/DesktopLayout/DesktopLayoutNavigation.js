import React, {useEffect, useState} from 'react';
import {useRouter} from "next/router";
import {Menu} from "antd";
import {MdDashboard, MdPeopleAlt, MdAccountBalanceWallet, MdPerson} from "react-icons/md";

export const DesktopLayoutNavigation = () => {
    const router = useRouter();
    const [setKeys, setSetKeys] = useState(['1']);

    useEffect(() => {
        switch (router.pathname) {
            case '/investment_package':
                return setSetKeys(['1']);
            case '/geneologi':
                return setSetKeys(['2']);
            case '/wallet':
                return setSetKeys(['3']);
            case '/wallet_detail/[type]':
                return setSetKeys(['3']);
            case '/profile':
                return setSetKeys(['4']);
            case '/my_package':
                return setSetKeys(['4']);
        }
    } , [router])

    const menu = [
        {
            id: 1,
            name: "Menu",
            url: "/investment_package",
            icon: <MdDashboard style={styles.icon}/>
        },
        {
            id: 2,
            name: "Geneologi",
            url: "/geneologi",
            icon: <MdPeopleAlt style={styles.icon}/>
        },
        {
            id: 3,
            name: "Dompet",
            url: "/wallet",
            icon: <MdAccountBalanceWallet style={styles.icon}/>
        },
        {
            id: 4,
            name: "Profil",
            url: "/profile",
            icon: <MdPerson style={styles.icon}/>
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
