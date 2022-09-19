import {observer} from "mobx-react-lite";
import {useRouter} from "next/router";
import DesktopLayout from "../../components/Layout/DesktopLayout/DesktopLayout";
import {Button, Col, Image, Row, Modal, message} from "antd";
import Link from "next/link";
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { useEffect, useState } from "react";
import jwtDecode from "jwt-decode";

const Profile = observer(() => {
    const router = useRouter();
    const { id } = router.query;
    
    const [dataUser, setDataUser] = useState([]);

    try {
        let token;
        
        if (typeof window !== undefined) {
            token = localStorage.getItem("access_token")
        }
        console.log(token);
    
        useEffect(() => {
            const decodeJwt = jwtDecode(token)
            setDataUser(decodeJwt)
        }, [])
    } catch (e) {
        
    }

    const { confirm } = Modal;

    const showConfirm = () => {
        confirm({
          title: 'Apakah Anda Yakin Untuk Keluar?',
          icon: <ExclamationCircleOutlined />,
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

    const akunMenu = [
        {
            name: 'Ubah Profile',
            icon: '/assets/icons/change_profile_user.svg',
            url: `/profile/${dataUser.id}/edit_profile`,
        },
        {
            name: 'Ubah Password',
            icon: '/assets/icons/lock.svg',
            url: `/forgot_password`,
        },
        {
            name: 'Dompet',
            icon: '/assets/icons/wallet-add.svg',
            url: `/wallet`,
        },
    ];

    const tentangMenu = [
        {
            name: 'Syarat & Ketentuan',
            icon: '/assets/icons/task-square.svg',
            url: '#',
        },
        {
            name: 'Privasi',
            icon: '/assets/icons/shield-tick.svg',
            url: '#',
        },
    ];

    return (
        <>
        <div className="relative bg-yellow-400 bg-center h-1/3 w-full mx-auto px-6 rounded-t">
            <div className="absolute top-0 left-0">
                <Image src={'/assets/icons/Ellipse8.svg'} alt={'icons'} preview={false}/>
            </div>
            <div className="absolute bottom-0 right-0">
                <Image src={'/assets/icons/Ellipse7.svg'} alt={'icons'} preview={false}/>
            </div>
            <div className={'absolute z-10 top-12'}>
                <button className={' rounded-lg w-10 h-10 bg-white'}>
                    <Link href={'/investment_package'}>
                        <a><Image src={'/assets/icons/arrow-left-black.svg'} preview={false} alt={'icons'}/></a>
                    </Link>
                </button>
            </div>
            <p className={'text-center text-2xl font-bold text-white pt-[54px]'}>Profile</p>
            <div className={'absolute grid grid-flow-col-dense-dense grid-cols-3 h-4 pt-9 gap-3'}>
                    <Image src={'/assets/user.jpg'} alt={'avatar'} className={'rounded-full w-[90px] h-[90px]'} preview={false}/>
                <div className={'col-span-2 left-20'}>
                    <p className={'font-medium text-lg text-white mb-1 leading-5'}>Welcome</p>
                    <p className={'font-medium text-3xl text-white leading-8 mb-1'}>{dataUser.username}</p>
                    {dataUser.email == null ? (
                        ''
                    ) : (
                        <p className={'font-normal text-xs text-white leading-4'}>{dataUser.email}</p>
                    )}
                </div>
            </div>
        </div>

        <div className={'flex flex-col gap-5 bg-[#f8f8ff] pb-20 mx-auto px-6'}>
            <p className={"font-medium text-lg leading-5 text-slate-400 pt-7"}>Akun</p>
                {akunMenu.map((value, index) => {
                    return (
                        <>
                        <Row justify={"start"}>
                            <Col key={index}>
                                <Button className={'bg-[#FFBF00] w-12 h-12 rounded-full'}>
                                    <Image src={value.icon} className={'absolute right-1'}
                                           width={25} height={25} alt={'icon'} preview={false}/>
                                </Button>
                            </Col>
                            <Col span={12} className={'flex items-center ml-3'}>
                                <div className={'font-medium text-lg'}>
                                    <Link href={value.url}>
                                        <a className={'text-black hover:text-[#FFBF00]'}>{value.name}</a>
                                    </Link>
                                </div>
                            </Col>
                        </Row>
                        </>
                    )
                })}
            <p className={"font-medium text-lg leading-5 text-slate-400 pt-7"}>Tentang</p>
            {tentangMenu.map((value, index) => {
                return (
                    <>
                        <Row justify={"start"}>
                            <Col key={index}>
                                <Button className={'bg-[#FFBF00] w-12 h-12 rounded-full'}>
                                    <Image src={value.icon} className={'absolute right-1'}
                                           width={25} height={25} alt={'icon'} preview={false}/>
                                </Button>
                            </Col>
                            <Col span={12} className={'flex items-center ml-3'}>
                                <div className={'font-medium text-lg'}>
                                    <Link href={value.url}>
                                        <a className={'text-black hover:text-[#FFBF00]'}>{value.name}</a>
                                    </Link>
                                </div>
                            </Col>
                        </Row>
                    </>
                )
            })}
            <Button className={'h-14 rounded-3xl bg-yellow-50 text-yellow-500 text-lg font-medium'}>
                Ganti ke akun lain
            </Button>
            <Button 
                className={'h-14 rounded-3xl bg-red-100 text-red-500 text-lg font-medium'}
                onClick={showConfirm}>
                Keluar
            </Button>
        </div>
        </>
    )
})

Profile.getLayout = function Layout(page) {
    return <DesktopLayout>{page}</DesktopLayout>
}
export default  Profile;
