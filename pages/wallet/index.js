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
            <div className={'relative flex flex-col justify-center items-center bg-primary bg-center h-1/4 w-full rounded-b-[30px]'}>
                <div className={'grid grid-cols-3 w-5/6 z-10 -mt-12'}>
                    <Button className={'flex justify-center items-center rounded-lg p-0 h-10 w-12'}
                            onClick={() => router.back()}>
                        <BiArrowBack  className={'text-lg'}/>
                    </Button>
                    <div className="flex items-center col-span-2">
                        <span className={'w-full text-2xl font-bold text-white'}>Dompet</span>
                    </div>
                </div>
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
            
            <Card className={"-mt-[60px] h-[170px] lg:h-48 rounded-xl border-none mx-10 w-4/5 bg-[url('/assets/background/USDT.png')] bg-transparent bg-top bg-cover opacity-90"}>
                <div className={'flex items-center gap-2 -mt-3'}>
                    <Image src={'/assets/logo/theter.png'} preview={false}/>
                    <span className={'text-white font-semibold text-sm leading-8'}>USDT</span>
                </div>
                <div className={'absolute'}>
                    <div className={'font-semibold text-sm leading-4 text-white mt-2.5'}>
                        Balance
                    </div>
                    <h2 className={'font-semibold text-3xl text-white z-10'}>
                        <FormatNumber value={dataBalanceUSDT?.data}/>
                    </h2>
                </div>
                <div className="absolute flex justify-between items-center px-6 w-full right-0 left-0 rounded-b-xl bottom-0" style={{ backgroundColor: 'rgba(0, 0, 0, 0.4)'}}>
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

            <Card className={"h-[170px] lg:h-48 mt-5 rounded-xl border-none mx-10 w-4/5 bg-[url('/assets/background/GMT.png')] bg-cover bg-top"}>
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
                <div className="absolute flex justify-between items-center px-6 w-full right-0 left-0 rounded-b-xl bottom-0" style={{ backgroundColor: 'rgba(254, 155, 11, 0.4)' }}>
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
