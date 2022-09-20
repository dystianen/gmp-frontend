import {observer} from "mobx-react-lite";
import DesktopLayout from "../../components/Layout/DesktopLayout/DesktopLayout";
import {Button, Card, Image, Tag, Skeleton, Typography, Progress} from "antd";
import {useRouter} from "next/router";
import {packageRepository} from "../../repository/package";
import React from "react";
import {CardPackage} from "../../components/CardPackage";

const {Title} = Typography;

const InvestmentPackage = observer(() => {
    const {data: packages, isValidating} = packageRepository.hooks.useGetAll();
    const {data: progress} = packageRepository.hooks.useGetProgress();

    return (
        <>
            <div className={'relative flex flex-col justify-center items-center bg-primary bg-center h-1/3 w-full rounded-b-[30px]'}>
                <span className={'w-full text-2xl font-bold text-white text-center z-10'}>Paket Investasi</span>
                <Card className={'rounded-lg w-11/12 z-10 mt-5'} bodyStyle={{padding: 20}}>
                    <Title className={'text-sm'}>Stok Investasi <span className={'text-primary'}>({progress?.data?.percentage}%)</span></Title>
                    <div className={'flex justify-between items-center'}>
                        <span className={'text-primary font-semibold'}>$ {progress?.data?.current}</span>
                        <span className={'text-primary font-semibold'}>$ {progress?.data?.target}</span>
                    </div>
                    <Progress strokeColor={'#4461F2'} percent={progress?.data?.percentage} size="large"/>
                    <span className={'text-[#7d7d82] font-semibold'}>Tersisa $ {(progress?.data?.target - progress?.data?.current)}</span>
                </Card>
                <div className="absolute h-full">
                    <Image src={'/assets/background/Particle1.png'} preview={false}/>
                </div>
                <div className="absolute top-0 left-0">
                    <Image src={'/assets/background/BGYellowTop.svg'} preview={false}/>
                </div>
                <div className="absolute bottom-0 right-0">
                    <Image className={'-mb-[6px] w-36 h-36 rounded-b-[30px]'}
                           src={'/assets/background/BGYellowBot2.png'} preview={false}/>
                </div>
            </div>

            <div className={'flex flex-col items-center gap-5 pb-28 bg-[#f8f8ff]'}>
                {packages?.data?.map((it, index) => (
                    <CardPackage key={index} index={index} isValidating={isValidating} data={it}/>
                ))}
            </div>
        </>
    )
})

InvestmentPackage.getLayout = function Layout(page) {
    return <DesktopLayout>{page}</DesktopLayout>;
};

export default InvestmentPackage;
