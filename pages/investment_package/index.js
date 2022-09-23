import {observer} from "mobx-react-lite";
import DesktopLayout from "../../components/Layout/DesktopLayout/DesktopLayout";
import {packageRepository} from "../../repository/package";
import React from "react";
import {CardPackage} from "../../components/CardPackage";
import {Header2} from "../../components/Reusable/Header2";
import {ProgressInvest} from "../../components/ProgressInvest";

const InvestmentPackage = observer(() => {
    const {data: packages, isValidating} = packageRepository.hooks.useGetAll();
    const {data: progress} = packageRepository.hooks.useGetProgress();

    return (
        <>
            <Header2>
                {
                    <div className="text-center w-full">
                        <span className={`w-full text-2xl font-bold text-white text-center`}>Paket Investasi</span>
                        <ProgressInvest data={progress?.data}/>
                    </div>
                }
            </Header2>


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
