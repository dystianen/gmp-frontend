import React, {useState} from "react";
import _ from "lodash";
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";
import DesktopLayout from "../../components/Layout/DesktopLayout/DesktopLayout";
import dynamic from "next/dynamic";
import {observer} from "mobx-react-lite";
import {downlineRepository} from "../../repository/downline";
import {Avatar, Button, Card, Image} from "antd";
import {BiArrowBack} from "react-icons/bi";
import {useRouter} from "next/router";

const Tree = dynamic(() => import('react-organizational-chart').then((mod) => mod.Tree), {
    ssr: false,
})
const TreeNode = dynamic(() => import('react-organizational-chart').then((mod) => mod.TreeNode), {
    ssr: false,
})

const Downline = observer(() => {
    const router = useRouter();
    const {data: organization} = downlineRepository.hooks.useGetAll();

    function Organization({org, onCollapse}) {
        return (
            <Card className={'inline-block rounded-lg hover:cursor-pointer hover:bg-[#FFCF40]'} bodyStyle={{padding: '5px 15px',}} onClick={onCollapse}>
                <div className={'flex flex-row gap-2'}>
                    <Avatar src="https://joeschmoe.io/api/v1/random"/>
                    <div className={'flex flex-col'}>
                        <span className={'font-bold'}>{org?.label}</span>
                        <span className={'text-[#7d7d82]'}>{org?.label}</span>
                    </div>
                </div>
            </Card>
        );
    }

    function Node({o, parent}) {
        const [collapsed, setCollapsed] = useState(false);

        const handleCollapse = () => {
            setCollapsed(!collapsed);
        };

        const T = parent ? TreeNode : (props) => (
            <Tree
                {...props}
                lineWidth={"2px"}
                lineColor={"#bbc"}
                lineBorderRadius={"12px"}
            >
                {props.children}
            </Tree>
        );

        return collapsed ? (<T label={<Organization org={o} onCollapse={handleCollapse} collapsed={collapsed}/>}/>)
            : (<T label={<Organization org={o} onCollapse={handleCollapse} collapsed={collapsed}/>}>
                    {_.map(o?.children, (c) => (
                        <Node o={c} parent={o}/>
                    ))}
                </T>
            );
    }

    return (
        <>
            <div className={'overflow-x-auto h-screen bg-[url("/assets/background/BGDot.png")]'}>
                <div className={'relative flex justify-center items-center bg-primary bg-center h-1/6 w-full rounded-t mb-8'}>
                    <div className={'flex flex-row items-center w-5/6 z-10'}>
                        <Button className={'flex justify-center items-center rounded-lg p-0 h-10 w-12'}
                                onClick={() => router.push('/investment_package')}>
                            <BiArrowBack className={'text-lg'}/>
                        </Button>
                        <span className={'w-full text-2xl font-bold text-white text-center pr-12'}>Downline</span>
                    </div>
                    <div className="absolute">
                        <Image src={'/assets/background/Particle1.png'} preview={false}/>
                    </div>
                    <div className="absolute top-0 left-0">
                        <Image src={'/assets/background/BGYellowTop.svg'} preview={false}/>
                    </div>
                    <div className="absolute bottom-0 right-0 mt-10">
                        <Image className={'-mb-[6px]'} src={'/assets/background/BGYellowBot.svg'} preview={false}/>
                    </div>
                </div>

                <DndProvider backend={HTML5Backend}>
                    <Node o={organization?.data}/>
                </DndProvider>
            </div>
        </>
    )
});

Downline.getLayout = function Layout(page) {
    return <DesktopLayout>{page}</DesktopLayout>;
};

export default Downline;
