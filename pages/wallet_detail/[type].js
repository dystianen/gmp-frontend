import {observer} from "mobx-react-lite";
import {Card, Image, DatePicker, Button, Empty} from "antd";
import jwtDecode from "jwt-decode";
import {useEffect, useState} from "react";
import React from 'react';
import moment from "moment";
import {useRouter} from "next/router";
import DesktopLayout from "../../components/Layout/DesktopLayout/DesktopLayout";
import {transactionRepository} from "../../repository/transaction";
import {FormatNumber} from "../../helpers/NumberFormat";
import {walletRepository} from "../../repository/wallet";
import {Header2} from "../../components/Reusable/Header2";

const {RangePicker} = DatePicker;

const WalletDetails = observer(() => {
    const [dataUser, setDataUser] = useState([]);
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    const router = useRouter();
    const {type} = router.query

    useEffect(() => {
        if (typeof window !== undefined) {
            let token = localStorage.getItem('access_token')

            const decodeJwt = jwtDecode(token)
            setDataUser(decodeJwt)
            console.log(type, "ini type");
        }
    }, [])

    const {data: dataBalanceUSDT} = walletRepository.hooks.useGetBalanceUSDT();
    const {data: dataBalanceGMP} = walletRepository.hooks.useGetBalanceGMP();
    const {data: lastTransactionsUSDT} = walletRepository.hooks.useGetLastTransactions('USDT')
    const {data: lastTransactionsGMP} = walletRepository.hooks.useGetLastTransactions('GMP')
    const {data: dataTransaction} = transactionRepository.hooks.useGetAllTransaction(
        {
            startDate: startDate,
            endDate: endDate,
            type: type,
        },
    );

    const filterDate = (date1, date2) => {
        if (!date1 && !date2) {
            setStartDate('')
            setEndDate('')
            return
        }
        const result = moment(date1).format("YYYY-MM")
        const result2 = moment(date2).format("YYYY-MM")
        setEndDate(result2);
        setStartDate(result);
    }

    return (
        <>
            <Header2 isBack isEwallet>
                {<div className="flex justify-center items-center text-center">
                    {type === "GMP" ? (
                        <Image src={'/assets/logo/mini-logo2.png'} className={'px-2'} preview={false}/>
                    ) : (
                        <Image src={'/assets/logo/theter2.png'} className={'px-2'} preview={false}/>
                    )}
                    <span className={`w-full text-2xl font-bold text-white text-center`}>{type}</span>
                </div>}
            </Header2>

            {type === "GMP" ? (
                <Card
                    className={"-mt-[110px] h-[170px] lg:h-48 rounded-xl border-none mx-10 w-4/5 bg-[url('/assets/background/GMT.png')] bg-transparent bg-top bg-cover"}>
                    <div className={'flex items-center gap-2 -mt-3'}>
                        <Image src={'/assets/logo/mini-logo.png'} preview={false}/>
                        <span className={'text-white font-semibold text-sm leading-8'}>{type}</span>
                    </div>
                    <div className={'absolute'}>
                        <div className={'font-semibold text-sm leading-4 text-white mt-2.5'}>
                            Balance
                        </div>
                        <h2 className={'font-semibold text-3xl text-white z-10'}>
                            <FormatNumber value={dataBalanceGMP?.data}/>
                        </h2>
                    </div>
                    <div className="absolute px-6 w-full right-0 left-0 rounded-b-xl bottom-0"
                         style={{backgroundColor: 'rgba(254, 155, 11, 0.4)'}}>
                        <p className={'text-sm font-semibold text-white mb-[1px] pt-2'}>Transaksi Terakhir</p>
                        {lastTransactionsGMP?.data === null ? (
                            <p className="pl-14 text-white">-</p>
                        ) : (
                            <p className={'text-white font-semibold text-base'}>{moment(lastTransactionsGMP?.data?.updateAt).format('DD MMMM YYYY')}</p>
                        )}
                    </div>
                </Card>
            ) : (
                <Card
                    className={"-mt-[110px] h-[170px] lg:h-48 bg-transparent rounded-xl border-none mx-10 w-4/5 bg-[url('/assets/background/USDT.png')] bg-cover bg-top opacity-90"}>
                    <div className={'flex items-center gap-2 -mt-3'}>
                        <Image src={'/assets/logo/theter.png'} preview={false}/>
                        <span className={'text-white font-semibold text-sm leading-8'}>{type}</span>
                    </div>
                    <div className={'absolute'}>
                        <div className={'font-semibold text-sm leading-4 text-white mt-2.5'}>
                            Balance
                        </div>
                        <h2 className={'font-semibold text-3xl text-white z-10'}>
                            <FormatNumber value={dataBalanceUSDT?.data}/>
                        </h2>
                    </div>
                    <div className="absolute px-6 w-full right-0 left-0 rounded-b-xl bottom-0"
                         style={{backgroundColor: 'rgba(0, 0, 0, 0.4)'}}>
                        <p className={'text-sm font-semibold text-white mb-[1px] pt-2'}>Transaksi Terakhir</p>
                        {lastTransactionsUSDT?.data === null ? (
                            <p className="pl-14 text-white">-</p>
                        ) : (
                            <p className={'text-white font-semibold text-base'}>{moment(lastTransactionsUSDT?.data?.updateAt).format('DD MMMM YYYY')}</p>
                        )}
                    </div>
                </Card>
            )}

            <div className={'mt-8 pb-28 px-10'}>
                <p className={'font-semibold text-lg'}>Riwayat Transaksi</p>
                <div className="relative">
                    <RangePicker
                        className="mr-2 rounded-md"
                        picker="month"
                        onChange={(e) => filterDate(e?.[0], e?.[1])}
                    />
                </div>

                {dataTransaction?.data.length === 0 ?
                    (<Empty className={'mt-8'}/>) :
                    (<div>
                        {dataTransaction?.data.map((value, index) => (
                            <div key={index}
                                 onClick={() => router.push(`/wallet_detail/transaction_detail/${value.id}`)}
                                 className={'grid grid-rows-2 grid-flow-col mb-2 mt-4 cursor-pointer'}>
                                {value?.type === 0 ? (
                                    <div className={'font-semibold text-base mb-1'}>BUY PACKAGE</div>
                                ) : value?.type === 1 ? (
                                    <div className={'font-semibold text-base mb-1'}>DISTRIBUTE PAIR</div>
                                ) : value?.type === 2 ? (
                                    <div className={'font-semibold text-base mb-1'}>STAKE RESULT</div>
                                ) : value?.type === 3 ? (
                                    <div className={'font-semibold text-base mb-1'}>STAKE LEVEL RESULT</div>
                                ) : value?.type === 4 ? (
                                    <div className={'font-semibold text-base mb-1'}>MOVE INTERNAL GMP</div>
                                ) : value?.type === 5 ? (
                                    <div className={'font-semibold text-base mb-1'}>MOVE EXTERNAL GMP</div>
                                ) : value?.type === 6 ? (
                                    <div className={'font-semibold text-base mb-1'}>MOVE EXTERNAL USDT</div>
                                ) : (
                                    <div className={'font-semibold text-base mb-1'}>SPONSORSIP</div>
                                    )}
                                <div
                                    className={'text-sm font-normal text-slate-600'}>{moment(value?.createdAt).format('DD MMMM YYYY')}</div>
                                <div className={'row-span-3 col-span-2 text-lg font-semibold pb-8'}>
                                    {
                                        value?.type === 0 || 5  || 6? (<p className={'text-right text-red-400 mb-1'}>{value.amount} <span>{value?.currency}</span> </p>) : (<p className={'text-right text-green-500 mb-1'}>{value.amount} {value?.currency}</p>)
                                    }

                                </div>
                            </div>
                        ))}
                    </div>)
                }
            </div>
        </>
    )
})
WalletDetails.getLayout = function Layout(page) {
    return <DesktopLayout>{page}</DesktopLayout>
}
export default WalletDetails;
