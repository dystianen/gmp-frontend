import {observer} from "mobx-react-lite";
import {useRouter} from "next/router";
import DesktopLayout from "../../components/Layout/DesktopLayout/DesktopLayout";
import {Button, Image, Modal, message, Avatar, Typography, Tag, Card} from "antd";
import {ExclamationCircleOutlined, UserOutlined} from '@ant-design/icons';
import React, {useEffect, useState} from "react";
import jwtDecode from "jwt-decode";
import {userRepository} from "../../repository/users";
import {MdKeyboardArrowRight} from "react-icons/md";
import {Header} from "../../components/Reusable/Header";

const {Title} = Typography;

const {confirm} = Modal;

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

    const copyToClipboard = () => {
        navigator.clipboard.writeText(user.data.referralCode)
        message.info('Menyalin ke clipboard!')
    }

    const accountMenu = [
        {
            name: 'Ubah Profil',
            icon: '/assets/icons/userblue.svg',
            url: `/profile/${dataUser.id}/edit`,
        },
        {
            name: 'Ubah Kata Sandi',
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
            <Header title={'Profil'} />

            <div className={'px-8 bg-white'}>
                <Avatar size={80} className={'flex justify-center items-center border-8 border-gray-50 -mt-[35px] -ml-2 mb-2'}
                        src={user?.data?.picProfile} icon={<UserOutlined />}/>
                <div className={'flex flex-col'}>
                    <Title level={4}>{user?.data?.username}</Title>
                    <span className={'text-sm text-[#7d7d82]'}>{user?.data?.phoneNumber}</span>
                    <span className={'text-sm text-[#7d7d82]'}>{user?.data?.email}</span>
                </div>

                <div className={'flex flex-col pt-8 pb-28'}>
                    <div>
                        <Title level={5}>Kode Rujukan</Title>
                        <Tag
                            className={'flex justify-between items-center border-dashed p-3 border-[#4461F2] bg-[#4461F2]/[0.1] rounded-lg text-lg'}>
                            <span className={'text-primary'}>{user?.data?.referralCode}</span>
                            <span className={'text-sm hover:cursor-pointer'} onClick={copyToClipboard}>Salin</span>
                        </Tag>
                    </div>

                    <div className={'pt-5'}>
                        <Title level={5}>Akun</Title>
                        <div className={'flex flex-col gap-4'}>
                            {accountMenu.map((it, index) => {
                                return <Card key={index} className={'hover:cursor-pointer rounded-lg shadow-[0px_4px_15px_rgba(18,19,28,0.05)] border-none'} bodyStyle={{padding: 12}} onClick={() => router.push(it.url)}>
                                    <div className={'flex items-center justify-between'}>
                                        <div className={'flex flex-row items-center gap-4'}>
                                            <Image src={it.icon} width={36} height={36} alt={'icon'} preview={false}/>
                                            <span className={'text-base font-bold'}>{it.name}</span>
                                        </div>
                                        <div className={'text-right'}>
                                            <MdKeyboardArrowRight className={'text-3xl'}
                                                                  />
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
                                return <Card key={index} className={'hover:cursor-pointer rounded-lg shadow-[0px_4px_15px_rgba(18,19,28,0.05)] border-none'} bodyStyle={{padding: 12}} onClick={() => router.push(it.url)}>
                                    <div className={'flex items-center justify-between'}>
                                        <div className={'flex flex-row items-center gap-4'}>
                                            <Image src={it.icon} width={36} height={36} alt={'icon'} preview={false}/>
                                            <span className={'text-base font-bold'}>{it.name}</span>
                                        </div>
                                        <div className={'text-right'}>
                                            <MdKeyboardArrowRight className={'text-3xl'}
                                                                  />
                                        </div>
                                    </div>
                                </Card>
                            })}
                        </div>
                    </div>

                    <div className={'flex flex-col gap-4 pt-8'}>
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
