import {observer} from "mobx-react-lite";
import {useRouter} from "next/router";
import DesktopLayout from "../../../../components/Layout/DesktopLayout/DesktopLayout";
import {userRepository} from "../../../../repository/users";
import {Avatar, Button, Card, Image, Skeleton, Tag, Typography} from "antd";
import {BiArrowBack} from "react-icons/bi";
import React from "react";
import {CardPackage} from "../../../../components/CardPackage";

const {Title} = Typography;

const ProfileDetail = observer(() => {
    const router = useRouter();
    const {id} = router.query;

    const {data: profile, isValidating} = userRepository.hooks.useGetProfileById(id);

    return <>
        <div
            className={'relative flex justify-center items-center bg-primary bg-center h-1/6 w-full rounded-t'}>
            <div className={'flex flex-row items-center w-5/6 z-10'}>
                <Button className={'flex justify-center items-center rounded-lg p-0 h-10 w-12'}
                        onClick={() => router.push('/investment_package')}>
                    <BiArrowBack className={'text-lg'}/>
                </Button>
                <span className={'w-full text-2xl font-bold text-white text-center pr-12'}>Profil</span>
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
        <div className={'px-8'}>
            <Avatar size={70} className={'border-8 border-gray-50 bg-white -mt-[30px]'} src="https://joeschmoe.io/api/v1/random"/>
            <div className={'flex flex-col'}>
                <Title level={4}>{profile?.data?.user?.username}</Title>
                <span className={'text-sm text-[#7d7d82]'}>{profile?.data?.user?.phoneNumber}</span>
                <span className={'text-sm text-[#7d7d82]'}>{profile?.data?.user?.email}</span>
            </div>

            <div className={'pt-8'}>
                <Title level={4}>Paket Dimiliki</Title>

                {profile?.data?.package?.map((it, index) => (
                    <CardPackage key={index} index={index} isValidating={isValidating} data={it}/>
                ))}
            </div>
        </div>
    </>
})

ProfileDetail.getLayout = function Layout(page) {
    return <DesktopLayout>{page}</DesktopLayout>
}
export default ProfileDetail;
