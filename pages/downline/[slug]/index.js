import React, {useState} from "react";
import _ from "lodash";
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";
import DesktopLayout from "../../../components/Layout/DesktopLayout/DesktopLayout";
import dynamic from "next/dynamic";
import {observer} from "mobx-react-lite";
import {downlineRepository} from "../../../repository/downline";
import {Avatar, Button, Card, Image} from "antd";
import {BiArrowBack} from "react-icons/bi";
import {useRouter} from "next/router";
import clsx from "clsx";
import {makeStyles} from "@material-ui/core/styles";
import {TransformComponent, TransformWrapper} from "react-zoom-pan-pinch";
import {CaretUpOutlined} from "@ant-design/icons";
import {Header} from "../../../components/Reusable/Header";

const Tree = dynamic(() => import('react-organizational-chart').then((mod) => mod.Tree), {
    ssr: false,
})
const TreeNode = dynamic(() => import('react-organizational-chart').then((mod) => mod.TreeNode), {
    ssr: false,
})

const useStyles = makeStyles((theme) => ({
    expand: {
        transform: "rotate(0deg)",
        transition: theme.transitions.create("transform", {
            duration: theme.transitions.duration.short
        })
    },
    expandOpen: {
        transform: "rotate(180deg)"
    },
}));

const DownlineTree = observer(() => {
    const router = useRouter();
    const {slug} = router.query;
    const {data: organization} = downlineRepository.hooks.useGetAll(slug);

    console.log({slug})

    function Organization({org, onCollapse, collapsed}) {
        const classes = useStyles();

        return (
            <Card className={'inline-block rounded-lg hover:bg-amber-300'} bodyStyle={{padding: '5px 15px'}}>
                <div className={'flex flex-row items-center gap-2 hover:cursor-pointer'}>
                    <div className={'flex flex-row items-center gap-2'} onClick={() => router.push(`/profile/${org.id}/detail`)}>
                        <Avatar src="https://joeschmoe.io/api/v1/random"/>
                        <div className={'flex flex-col justify-start'}>
                            <span className={'font-bold text-left'}>{slug === 'binary-tree' ? org?.label : org?.username}</span>
                            <span className={'text-[#7d7d82]'}>{org?.email}</span>
                        </div>
                    </div>

                    <CaretUpOutlined
                        className={clsx(classes.expand, {[classes.expandOpen]: !collapsed}, 'text-lg')}
                        onClick={onCollapse}
                    />
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
            <div className={'relative h-screen bg-[url("/assets/background/BGDot.png")]'}>
                <Header title={'Downline'} />

                <TransformWrapper
                    initialScale={1}
                    minScale={0.5}
                    centerOnInit={true}
                    limitToBounds={false}
                >
                    <TransformComponent contentStyle={{height: '80vh', width: '100%', padding: 20}}>
                        <DndProvider backend={HTML5Backend}>
                            <Node o={organization?.data}/>
                        </DndProvider>
                    </TransformComponent>
                </TransformWrapper>
            </div>
        </>
    )
});

DownlineTree.getLayout = function Layout(page) {
    return <DesktopLayout>{page}</DesktopLayout>;
};

export default DownlineTree;
