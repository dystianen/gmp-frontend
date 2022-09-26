import {observer} from "mobx-react-lite";
import DesktopLayout from "../../../../components/Layout/DesktopLayout/DesktopLayout";
import {Button, Image, message, Modal, notification, Spin} from "antd";
import {BiArrowBack} from "react-icons/bi";
import {useRouter} from "next/router";
import React, {useState} from "react";
import {packageRepository} from "../../../../repository/package";
import {useEffect} from "react";
import jwtDecode from "jwt-decode";
import {FormatNumber} from "../../../../helpers/NumberFormat";
import {userRepository} from "../../../../repository/users";
import {Header} from "../../../../components/Reusable/Header";

const InvestmentPackageDetail = observer(() => {
    const router = useRouter();
    const {id} = router.query;
    const {data: detail} = packageRepository.hooks.useGetDetail(id);
    const [userId, setUserId] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const {data: profile} = userRepository.hooks.useGetProfile();
    const totalPrice = detail?.data?.price + detail?.data?.service_fee;

    useEffect(() => {
        if (typeof window !== undefined) {
            const token = localStorage.getItem("access_token");

            const decodeJwt = jwtDecode(token);
            setUserId(decodeJwt.id);
        }
    }, []);

    const showConfirm = async () => {
        Modal.confirm({
            title: <span className={'font-bold'}>Are you sure want to buy {detail?.data?.name} with price ${totalPrice} USDT? </span>,
            okText: "Ok",
            cancelText: "Cancel",
            onOk() {
                handleBuyPackage()
            },
        })
    }

    const handleBuyPackage = async () => {
        try {
            const body = {
                packageId: id,
                userId: userId
            }

            setIsLoading(true);
            await packageRepository.api.buyPackage(body);
            setIsLoading(false);
            message.success('Berhasil Membeli Paket');
            await router.push('/investment_package')
        } catch (err) {
            setIsLoading(false);
            message.error('Gagal Membeli Paket!')
        }
    }

    const benefit = [
        {
            name: 'Keuntungan',
            value: detail?.data?.return_percentage + '%',
            icon: '/assets/icons/benefit/profit.svg'
        },
        {
            name: 'Token Perbulan',
            value: <FormatNumber value={detail?.data?.gmp_permonth}/>,
            icon: '/assets/icons/benefit/token.svg'
        },
        {
            name: 'Total Token',
            value: <FormatNumber value={detail?.data?.gmp_total}/>,
            icon: '/assets/icons/benefit/token.svg'
        }
    ];

    const otherInfo = [
        {
            label: 'Level Staking',
            value: detail?.data?.reward_level_max + ' Level',
            icon: '/assets/icons/reward.svg',
        },
        {
            label: 'Biaya Admin Staking',
            value: detail?.data?.reward_percentage_investor,
            icon: '/assets/icons/kontrak.svg',
        },
        {
            label: 'Biaya Mesin Staking',
            value: detail?.data?.reward_percentage_investor,
            icon: '/assets/icons/kontrak.svg',
        },
        {
            label: 'Waktu Kontrak',
            value: detail?.data?.month_contract + ' Bulan',
            icon: '/assets/icons/kontrak.svg',
        },
    ];

    return (
        <>
            <Header title={detail?.data?.name} isBack />

            <Spin spinning={isLoading}>
                <div className={'flex flex-col gap-2 bg-white overflow-auto'}>
                    <div className={'border-b-[5px] px-8 pt-3'}>
                        <h1 className={'text-lg font-bold'}>Deskripsi Paket</h1>
                        <p className={'text-justify text-sm'}>-</p>
                    </div>

                    <div className={'relative flex gap-2 flex-col border-b-[5px] px-8 py-3'}>
                        <h1 className={'text-lg font-bold'}>Keuntungan Paket</h1>
                        {benefit.map((it, index) => (
                            <div key={index} className={'relative flex gap-4 bg-[#FAFAFA] p-5 rounded-xl'}>
                                <Image src={it.icon} width={40} height={40} alt={'icon'} preview={false}/>

                                <div className={'flex flex-col'}>
                                    <span className={'font-bold text-[15px]'}>{it.name}</span>
                                    <span
                                        className={'text-base font-bold text-[#65DC41] text-[21px]'}>{it.value ? it.value : '-'}</span>
                                </div>

                                <div className={'absolute bottom-0 right-0 -mb-[5px]'}>
                                    <Image className={'rounded-br-xl'} src={'/assets/logo/logo-transparent.svg'} alt={'icon'} preview={false}/>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className={'px-8 py-3'}>
                        <h1 className={'text-lg font-bold'}>Info Lainnya</h1>
                        <div className={'grid grid-rows-3 grid-cols-2 gap-8 justify-between'}>
                            {otherInfo.map((it, index) => (
                                <div key={index} className={'flex gap-4'}>
                                    <Image src={it.icon} preview={false}/>
                                    <div className={'flex flex-col'}>
                                        <span className={'text-xs text-[#12131C]/90 font-medium'}>{it.label}</span>
                                        <span className={'text-base font-bold'}>{it.value ? it.value : '-'}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </Spin>
            <div
                className="grid grid-cols-2 items-center max-w-md mx-auto rounded-b-lg fixed bg-white drop-shadow-2xl h-20 inset-x-0 bottom-0 z-10 px-5">
                <div className={'flex flex-col justify-center'}>
                    <span className={'text-sm text-[#12131C]/55 font-semibold'}>Harga Paket</span>
                    <span className={'text-2xl font-bold text-primary'}>
                        <FormatNumber value={totalPrice} prefix={'$ '}/>
                    </span>
                </div>
                <Button
                    disabled={profile?.data?.isBought}
                    type={'primary'}
                    size={'large'}
                    className={`${profile?.data?.isBought ? '' : 'bg-secondary'} rounded-full border-none mx-2`}
                    onClick={showConfirm}
                >
                    Beli Paket
                </Button>
            </div>
        </>
    )
})

InvestmentPackageDetail.getLayout = function Layout(page) {
    return <DesktopLayout bottomNavigation={false}>{page}</DesktopLayout>;
};

export default InvestmentPackageDetail;
