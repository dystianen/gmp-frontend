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

const Wallet = observer(() => {
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
            <div className={"relative min-h-screen flex flex-col max-w-lg mx-auto px-8 pb-24 bg-[#FAFAFA] overflow-hidden"}>
                <div className={'absolute top-0 left-0'}>
                    <Image src={'/assets/icons/Ellipse1.svg'} alt={'icon'} preview={false}/>
                </div>
                <div className={'absolute top-11 right-0'}>
                    <Image src={'/assets/icons/Ellipse3.svg'} alt={'icon'} preview={false}/>
                </div>
                <div className={'z-10 pt-20 text-center'}>
                    <span className={'w-full text-2xl font-bold text-secondary text-center'}>Dompet</span>
                </div>

                <Card className={"relative mt-9 bg-[#4461F2] rounded-xl"}  bodyStyle={{padding: 20}}>
                    <div className={'absolute top-0 right-0'}>
                        <Image src={'/assets/background/Ellipse 403.svg'} alt={'icon'} preview={false}/>
                    </div>
                    <div className={'absolute -bottom-[10px] -right-[12px]'}>
                        <Image src={'/assets/background/Ellipse 402.svg'} alt={'icon'} preview={false}/>
                    </div>

                    <div className={'flex flex-col gap-3'}>
                        <div className={'flex justify-between'}>
                            <span className={'text-white font-semibold text-3xl leading-8'}>USDT</span>
                            <Button
                                className={'text-primary font-bold text-sm w-[99px] h-[34px] border-solid border-none rounded-2xl'}
                                onClick={() => router.push(`/wallet_detail/USDT`)}>
                                Detail
                            </Button>
                        </div>

                        <div>
                            <div className={'font-medium text-base leading-4 text-[#FFFFFF]/[0.8]'}>
                                Balance
                            </div>
                            <span className={'font-semibold text-4xl text-white'}>
                                <FormatNumber value={dataBalanceUSDT?.data}/>
                            </span>
                        </div>

                        <div>
                            <div className={'font-medium text-base leading-4 text-[#FFFFFF]/[0.8]'}>
                                Transaksi Terakhir
                            </div>
                            <span className={'font-semibold text-base text-white'}>
                                {lastTransactionsUSDT?.data ? moment(lastTransactionsUSDT?.data?.updateAt).format('DD MMMM YYYY') : '-'}
                            </span>
                        </div>
                    </div>
                </Card>

                <Card className={"relative mt-9 h-48 bg-[#FFBF00] rounded-xl"} bodyStyle={{padding: 20}}>
                    <div className={'absolute top-0 right-0 z-0'}>
                        <Image src={'/assets/background/chip.svg'} alt={'background'} preview={false}/>
                    </div>

                    <div className={'flex flex-col gap-3'}>
                        <div className={'flex justify-between'}>
                            <span className={'text-white font-semibold text-3xl leading-8'}>GMP</span>
                            <Button
                                className={'text-secondary font-bold text-sm w-[99px] h-[34px] border-solid border-none rounded-2xl'}
                                onClick={() => router.push(`/wallet_detail/GMP`)}
                            >
                                Detail
                            </Button>
                        </div>

                        <div className={'z-10'}>
                            <div className={'font-medium text-base leading-4 text-[#FFFFFF]/[0.8]'}>
                                Balance
                            </div>
                            <span className={'font-semibold text-4xl text-white'}>
                                <FormatNumber value={dataBalanceGMP?.data}/>
                            </span>
                        </div>

                        <div className={'z-10'}>
                            <div className={'font-medium text-base leading-4 text-[#FFFFFF]/[0.8]'}>
                                Transaksi Terakhir
                            </div>
                            <span className={'font-semibold text-base text-white'}>
                                {lastTransactionsGMP?.data ? moment(lastTransactionsGMP?.data?.updateAt).format('DD MMMM YYYY') : '-'}
                            </span>
                        </div>
                    </div>
                </Card>
            </div>
        </>
    )
})

Wallet.getLayout = function Layout(page) {
    return <DesktopLayout>{page}</DesktopLayout>;
};
export default Wallet;
