import React, {useState, useEffect} from "react";
import {Image, Card, Button} from "antd";
import {observer} from "mobx-react-lite";
import jwtDecode from "jwt-decode";
import DesktopLayout from "../../components/Layout/DesktopLayout/DesktopLayout";
import {useRouter} from "next/router";
import {walletRepository} from "../../repository/wallet";
import moment from "moment";
import {FormatNumber} from "../../helpers/NumberFormat";
import {Header2} from "../../components/Reusable/Header2";

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
            <Header2 isEwallet>
                {
                    <div className="w-full text-center">
                        <span className={`w-full text-2xl font-bold text-white text-center`}>Dompet</span>
                    </div>
                }
            </Header2>

            <Card
                className={"-mt-[125px] h-[170px] lg:h-48 rounded-xl border-none mx-10 w-4/5 bg-[url('/assets/background/USDT.png')] bg-transparent bg-top bg-cover opacity-90"}>
                <div className={'flex items-center gap-2 -mt-3'}>
                    <Image src={'/assets/logo/theter.png'} preview={false}/>
                    <span className={'text-white font-semibold text-sm leading-8'}>USDT</span>
                </div>
                <div className={'absolute'}>
                    <div className={'font-semibold text-sm leading-4 text-white mt-2.5'}>
                        Balance
                    </div>
                    <h2 className={'font-semibold text-3x text-white z-10'}>
                        <FormatNumber value={dataBalanceUSDT?.data}/>
                    </h2>
                </div>
                <div
                    className="absolute flex justify-between items-center px-6 w-full right-0 left-0 rounded-b-xl bottom-0"
                    style={{backgroundColor: 'rgba(0, 0, 0, 0.4)'}}>
                    <div>
                        <p className={'text-sm font-semibold text-white mb-[1px] pt-2'}>Transaksi Terakhir</p>
                        {lastTransactionsUSDT?.data === null ? (
                            <p className="pl-14 text-white font-semibold text-base">-</p>
                        ) : (
                            <p className={'text-white font-semibold text-base'}>{moment(lastTransactionsUSDT?.data?.updateAt).format('DD MMMM YYYY')}</p>
                        )}
                    </div>
                    <div>
                        <Button
                            className={'text-[#49A078] font-bold text-sm w-[99px] h-[34px] border-solid border-none rounded-2xl'}
                            onClick={() => router.push(`/wallet_detail/USDT`)}
                        >
                            Detail
                        </Button>
                    </div>
                </div>
            </Card>

            <Card
                className={"h-[170px] lg:h-48 mt-5 rounded-xl border-none mx-10 w-4/5 bg-[url('/assets/background/GMT.png')] bg-cover bg-top"}>
                <div className={'flex items-center gap-2 -mt-3'}>
                    <Image src={'/assets/logo/mini-logo.png'} preview={false}/>
                    <span className={'text-white font-semibold text-sm leading-8'}>GMP</span>
                </div>
                <div className={'absolute'}>
                    <div className={'font-semibold text-sm leading-4 text-white mt-2.5'}>
                        Balance
                    </div>
                    <h2 className={'font-semibold text-3xl text-white z-10'}>
                        <FormatNumber value={dataBalanceGMP?.data}/>
                    </h2>
                </div>
                <div
                    className="absolute flex justify-between items-center px-6 w-full right-0 left-0 rounded-b-xl bottom-0"
                    style={{backgroundColor: 'rgba(254, 155, 11, 0.4)'}}>
                    <div>
                        <p className={'text-sm font-semibold text-white mb-[1px] pt-2'}>Transaksi Terakhir</p>
                        {lastTransactionsGMP?.data === null ? (
                            <p className="pl-14 text-white font-semibold text-base">-</p>
                        ) : (
                            <p className={'text-white font-semibold text-base'}>{moment(lastTransactionsGMP?.data?.updateAt).format('DD MMMM YYYY')}</p>
                        )}
                    </div>
                    <div>
                        <Button
                            className={'text-secondary font-bold text-sm w-[99px] h-[34px] border-solid border-none rounded-2xl'}
                            onClick={() => router.push(`/wallet_detail/GMP`)}
                        >
                            Detail
                        </Button>
                    </div>
                </div>
            </Card>
        </>
    )
})

Wallet.getLayout = function Layout(page) {
    return <DesktopLayout>{page}</DesktopLayout>;
};
export default Wallet;
