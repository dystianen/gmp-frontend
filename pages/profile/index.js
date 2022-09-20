import {observer} from "mobx-react-lite";
import {useRouter} from "next/router";
import DesktopLayout from "../../components/Layout/DesktopLayout/DesktopLayout";
import {Button, Image, Modal, message, Avatar, Typography, Tag, Card} from "antd";
import {ExclamationCircleOutlined} from '@ant-design/icons';
import React, {useEffect, useState} from "react";
import jwtDecode from "jwt-decode";
import {userRepository} from "../../repository/users";
import {BiArrowBack} from "react-icons/bi";
import {MdKeyboardArrowRight} from "react-icons/md";

const {Title} = Typography;

const Profile = observer(() => {
    const router = useRouter();
    const [dataUser, setDataUser] = useState([]);
    const {data: user} = userRepository.hooks.useGetProfile();

    useEffect(() => {
        if (typeof window !== undefined) {
            const token = localStorage.getItem("access_token")

            const decodeJwt = jwtDecode(token)
            setDataUser(decodeJwt)
        }
    }, [])

    const {confirm} = Modal;

    const showConfirm = () => {
        confirm({
            title: 'Apakah Anda Yakin Untuk Keluar?',
            icon: <ExclamationCircleOutlined/>,
            content: 'Klik Ok untuk keluar & klik Cancel untuk membatalkan',
            onOk() {
                logoutHandler();
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    };

    const logoutHandler = () => {
        localStorage.removeItem("access_token");
        router.push("/login")
        message.success("Anda Berhasil Logout");
    }

    const accountMenu = [
        {
            name: 'Edit Profile',
            icon: '/assets/icons/userblue.svg',
            url: `/profile/${dataUser.id}/edit_profile`,
        },
        {
            name: 'Ubah Password',
            icon: '/assets/icons/lockblue.svg',
            url: `/forgot_password`,
        },
    ];

    const aboutMenu = [
        {
            name: 'Syarat & Ketentuan',
            icon: '/assets/icons/syaratblue.svg',
            url: '#',
        },
        {
            name: 'Privasi',
            icon: '/assets/icons/privasiblue.svg',
            url: '#',
        },
    ];

    return (
        <>
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

            <div className={'px-8 bg-white'}>
                <Avatar size={70} className={'border-8 border-gray-50 bg-white -mt-[30px]'}
                        src="https://joeschmoe.io/api/v1/random"/>
                <div className={'flex flex-col'}>
                    <Title level={4}>{user?.data?.username}</Title>
                    <span className={'text-sm text-[#7d7d82]'}>{user?.data?.phoneNumber}</span>
                    <span className={'text-sm text-[#7d7d82]'}>{user?.data?.email}</span>
                </div>

                <div className={'flex flex-col pt-8 pb-28'}>
                    <div>
                        <Title level={5}>Kode Referral</Title>
                        <Tag
                            className={'flex justify-between items-center border-dashed p-3 border-[#4461F2] bg-[#4461F2]/[0.1] rounded-lg text-lg'}>
                            <span className={'text-primary'}>{user?.data?.referralCode}</span>
                            <span className={'text-sm hover:cursor-pointer'}>Salin</span>
                        </Tag>
                    </div>

                    <div className={'pt-5'}>
                        <Title level={5}>Akun</Title>
                        <div className={'flex flex-col gap-4'}>
                            {accountMenu.map((it, index) => {
                                return <Card key={index} className={'rounded-lg shadow-[0px_4px_15px_rgba(18,19,28,0.05)] border-none'} bodyStyle={{padding: 12}}>
                                    <div className={'flex items-center justify-between'}>
                                        <div className={'flex flex-row items-center gap-4'}>
                                            <Image src={it.icon} width={36} height={36} alt={'icon'} preview={false}/>
                                            <span className={'text-base font-bold'}>{it.name}</span>
                                        </div>
                                        <div className={'text-right'}>
                                            <MdKeyboardArrowRight className={'text-3xl hover:cursor-pointer'}
                                                                  onClick={() => router.push(it.url)}/>
                                        </div>
                                    </div>
                                </Card>
                            })}
                        </div>
                    </div>

                    <div className={'pt-5'}>
                        <Title level={5}>Tentang</Title>
                        <div className={'flex flex-col gap-4'}>
                            {aboutMenu.map((it, index) => {
                                return <Card key={index} className={'rounded-lg shadow-[0px_4px_15px_rgba(18,19,28,0.05)] border-none'} bodyStyle={{padding: 12}}>
                                    <div className={'flex items-center justify-between'}>
                                        <div className={'flex flex-row items-center gap-4'}>
                                            <Image src={it.icon} width={36} height={36} alt={'icon'} preview={false}/>
                                            <span className={'text-base font-bold'}>{it.name}</span>
                                        </div>
                                        <div className={'text-right'}>
                                            <MdKeyboardArrowRight className={'text-3xl hover:cursor-pointer'}
                                                                  onClick={() => router.push(it.url)}/>
                                        </div>
                                    </div>
                                </Card>
                            })}
                        </div>
                    </div>

                    <div className={'flex flex-col gap-4 pt-8'}>
                        <Button className={'h-14 rounded-full bg-[#FFBF00]/[0.1] text-[#FFBF00] text-lg font-semibold border-none'}>
                            Ganti ke akun lain
                        </Button>
                        <Button
                            className={'h-14 rounded-full bg-[#F03636]/[0.1] text-[#F03636] text-lg font-semibold border-none'}
                            onClick={showConfirm}>
                            Keluar
                        </Button>
                    </div>
                </div>
            </div>
        </>
    )
})

Profile.getLayout = function Layout(page) {
    return <DesktopLayout>{page}</DesktopLayout>
}
export default Profile;
