import React, {useState, useEffect} from "react";
import {Image, Card, Button} from "antd";
import {observer} from "mobx-react-lite";
import jwtDecode from "jwt-decode";
import DesktopLayout from "../../components/Layout/DesktopLayout/DesktopLayout";
import {BiArrowBack} from "react-icons/bi";
import {useRouter} from "next/router";
import {walletRepository} from "../../repository/wallet";
import moment from "moment";
import {FormatNumber} from "../../helpers/NumberFormat";

const Downline = observer(() => {
    const router = useRouter();
    const [dataUser, setDataUser] = useState([]);

    useEffect(() => {
        if (typeof window !== undefined) {
            let token = localStorage.getItem('access_token')

            const decodeJwt = jwtDecode(token)
            setDataUser(decodeJwt)
        }
    }, [])

    const {data: dataBalanceUSDT} = walletRepository.hooks.useGetBalanceUSDT();
    const {data: dataBalanceGMP} = walletRepository.hooks.useGetBalanceGMP();
    const {data: lastTransactionsUSDT} = walletRepository.hooks.useGetLastTransactions('USDT')
    const {data: lastTransactionsGMP} = walletRepository.hooks.useGetLastTransactions('GMP')

    return (
        <>
            <div
                className={"relative min-h-screen flex flex-col max-w-lg mx-auto px-8 pb-24 bg-[#FAFAFA] overflow-hidden"}>
                <div className={'absolute top-0 left-0'}>
                    <Image src={'/assets/icons/Ellipse1.svg'} alt={'icon'} preview={false}/>
                </div>
                <div className={'absolute top-11 right-0'}>
                    <Image src={'/assets/icons/Ellipse3.svg'} alt={'icon'} preview={false}/>
                </div>
                <div className={'z-10 pt-20 text-center'}>
                    <span className={'w-full text-2xl font-bold text-secondary text-center'}>Downline</span>
                </div>

                <Card
                    className={"relative h-36 mt-9 bg-[#4461F2] rounded-xl hover:cursor-pointer hover:shadow-lg"}
                    bodyStyle={{padding: 20}}
                    onClick={() => router.push('/downline/binary-tree')}
                >
                    <div className={'absolute top-0 right-0'}>
                        <Image src={'/assets/background/Ellipse 403.svg'} alt={'icon'} preview={false}/>
                    </div>
                    <div className={'absolute -bottom-[10px] -right-[12px]'}>
                        <Image src={'/assets/background/Ellipse 402.svg'} alt={'icon'} preview={false}/>
                    </div>

                    <h2 className={'text-2xl text-white'}>Binary Tree</h2>
                </Card>

                <Card
                    className={"relative mt-9 h-36 bg-[#FFBF00] rounded-xl hover:cursor-pointer hover:shadow-lg"}
                    bodyStyle={{padding: 20}}
                    onClick={() => router.push('/downline/sun-tree')}
                >
                    <div className={'absolute top-0 right-0 z-0'}>
                        <Image src={'/assets/background/chip.svg'} alt={'background'} height={140} preview={false}/>
                    </div>

                    <div>
                        <div className={'z-10'}>
                            <h2 className={'text-2xl text-white'}>Sun Tree</h2>
                        </div>
                    </div>
                </Card>
            </div>
        </>
    )
})

Downline.getLayout = function Layout(page) {
    return <DesktopLayout>{page}</DesktopLayout>;
};
export default Downline;
