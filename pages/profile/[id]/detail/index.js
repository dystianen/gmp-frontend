import {observer} from "mobx-react-lite";
import {useRouter} from "next/router";
import DesktopLayout from "../../../../components/Layout/DesktopLayout/DesktopLayout";
import {userRepository} from "../../../../repository/users";
import {Avatar, Empty, Typography} from "antd";
import React from "react";
import {CardPackage} from "../../../../components/CardPackage";
import {UserOutlined} from "@ant-design/icons";
import {Header} from "../../../../components/Reusable/Header";

const {Title} = Typography;

const ProfileDetail = observer(() => {
    const router = useRouter();
    const {id} = router.query;

    const {data: profile, isValidating} = userRepository.hooks.useGetProfileById(id);

    return <>
        <Header title={'Profile'} isBack/>

        <div className={'px-8'}>
            <Avatar size={80} className={'flex justify-center items-center border-8 border-white -mt-[35px] -ml-2 mb-2'}
                    src={profile?.data?.user?.picProfile} icon={<UserOutlined/>}/>
            <div className={'flex flex-col'}>
                <Title level={4}>{profile?.data?.user?.username}</Title>
                <span className={'text-sm text-[#7d7d82]'}>{profile?.data?.user?.phoneNumber}</span>
                <span className={'text-sm text-[#7d7d82]'}>{profile?.data?.user?.email}</span>
            </div>

            <div className={'pt-8'}>
                <Title level={4}>Paket Dimiliki</Title>

                {!profile?.data?.package?.name ? <Empty className={'pt-10'}/> :
                    <CardPackage className={'-mt-[30px]'} key={0} index={0} isValidating={isValidating}
                                 data={profile?.data?.package} type={'binary'}/>}
            </div>
        </div>
    </>
})

ProfileDetail.getLayout = function Layout(page) {
    return <DesktopLayout>{page}</DesktopLayout>
}
export default ProfileDetail;
