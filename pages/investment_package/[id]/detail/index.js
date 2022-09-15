import {observer} from "mobx-react-lite";
import DesktopLayout from "../../../../components/Layout/DesktopLayout/DesktopLayout";
import {Button, Image} from "antd";
import {BiArrowBack} from "react-icons/bi";
import {useRouter} from "next/router";
import React from "react";

const InvestmentPackageDetail = observer(() => {
    const router = useRouter()

    return (
        <>
            <div className={'relative flex justify-center items-center bg-primary bg-center h-1/4 w-full rounded-t'}>
                <div className="absolute top-0 left-0">
                    <Image src={'/assets/background/Ellipse1.svg'} preview={false}/>
                </div>
                <div className="absolute bottom-0 right-0">
                    <Image src={'/assets/background/Ellipse2.svg'} preview={false}/>
                </div>
                <div className={'flex flex-row items-center w-5/6'}>
                    <Button className={'flex justify-center items-center rounded-lg p-0 h-10 w-12'}
                            onClick={() => router.push('/investment_package')}>
                        <BiArrowBack className={'text-lg'}/>
                    </Button>
                    <span className={'w-full text-2xl font-bold text-white text-center pr-12'}>Paket Basic</span>
                </div>
            </div>
            <div className={'flex flex-col gap-2 bg-white pb-20 overflow-auto'}>
                <div className={'border-b-[5px] px-8 pt-3'}>
                    <h1 className={'text-lg font-bold'}>Deskripsi Paket</h1>
                    <p className={'text-justify text-sm'}>
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been
                        the industry standard dummy text ever since the
                        1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen
                        book. It has survived not only five centuries, but also the leap into electronic typesetting,
                        remaining essentially unchanged.
                    </p>
                </div>
                <div className={'px-8 py-5'}>
                    <h1 className={'text-lg font-bold'}>Info Paket</h1>
                    <div className={'flex flex-row justify-between'}>
                        <div className={'flex flex-col gap-10'}>
                            <div className={'flex gap-4'}>
                                <Image src={'/assets/icons/users.svg'} preview={false}/>
                                <div className={'flex flex-col'}>
                                    <span className={'text-xs text-[#12131C]/90 font-medium'}>Pembeli</span>
                                    <span className={'text-base font-bold'}>120</span>
                                </div>
                            </div>
                            <div className={'flex gap-4'}>
                                <Image src={'/assets/icons/dolar.svg'} preview={false}/>
                                <div className={'flex flex-col'}>
                                    <span className={'text-xs text-[#12131C]/90 font-medium'}>Token Perbulan</span>
                                    <span className={'text-base font-bold'}>200 BUSD</span>
                                </div>
                            </div>
                            <div className={'flex gap-4'}>
                                <Image src={'/assets/icons/reward.svg'} preview={false}/>
                                <div className={'flex flex-col'}>
                                    <span className={'text-xs text-[#12131C]/90 font-medium'}>Reward Maching</span>
                                    <span className={'text-base font-bold'}>200 BUSD</span>
                                </div>
                            </div>
                            <div className={'flex gap-4'}>
                                <Image src={'/assets/icons/usdt.svg'} preview={false}/>
                                <div className={'flex flex-col'}>
                                    <span className={'text-xs text-[#12131C]/90 font-medium'}>USDT Perbulan</span>
                                    <span className={'text-base font-bold'}>6</span>
                                </div>
                            </div>
                        </div>
                        <div className={'flex flex-col gap-10'}>
                            <div className={'flex gap-4'}>
                                <Image src={'/assets/icons/profit.svg'} preview={false}/>
                                <div className={'flex flex-col'}>
                                    <span className={'text-xs text-[#12131C]/90 font-medium'}>Profit</span>
                                    <span className={'text-base font-bold text-[#65DC41]'}>120%</span>
                                </div>
                            </div>
                            <div className={'flex gap-4'}>
                                <Image src={'/assets/icons/dolar.svg'} preview={false}/>
                                <div className={'flex flex-col'}>
                                    <span className={'text-xs text-[#12131C]/90 font-medium'}>Token Awal</span>
                                    <span className={'text-base font-bold'}>200</span>
                                </div>
                            </div>
                            <div className={'flex gap-4'}>
                                <Image src={'/assets/icons/kontrak.svg'} preview={false}/>
                                <div className={'flex flex-col'}>
                                    <span className={'text-xs text-[#12131C]/90 font-medium'}>Selesai Kontrak</span>
                                    <span className={'text-base font-bold'}>20 Bulan</span>
                                </div>
                            </div>
                            <div className={'flex gap-4'}>
                                <Image src={'/assets/icons/kontrak.svg'} preview={false}/>
                                <div className={'flex flex-col'}>
                                    <span className={'text-xs text-[#12131C]/90 font-medium'}>Kontrak Staking</span>
                                    <span className={'text-base font-bold'}>90%</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div
                className="grid grid-cols-2 items-center max-w-md mx-auto rounded-b-lg fixed bg-white drop-shadow-2xl h-20 inset-x-0 bottom-0 z-10 px-5">
                <div className={'flex flex-col justify-center'}>
                    <span className={'text-sm text-[#12131C]/55 font-semibold'}>Pembeli</span>
                    <span className={'text-2xl font-bold text-primary'}>$ 120</span>
                </div>
                <Button type={'primary'} size={'large'} className={'rounded-full'}
                        onClick={() => router.push('/investment_package/0909209/detail/payment')}>Beli Paket</Button>
            </div>
        </>
    )
})

InvestmentPackageDetail.getLayout = function Layout(page) {
    return <DesktopLayout bottomNavigation={false}>{page}</DesktopLayout>;
};

export default InvestmentPackageDetail;