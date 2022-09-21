import {observer} from "mobx-react-lite";
import {Card, Image, DatePicker, Form, Col, Button, Button} from "antd";
import Link from "next/link";
import jwtDecode from "jwt-decode";
import { useEffect, useState } from "react";
const { RangePicker } = DatePicker;
import React from 'react';
import moment from "moment";
import { useRouter } from "next/router";
import DesktopLayout from "../../components/Layout/DesktopLayout/DesktopLayout";
import { transactionRepository } from "../../repository/transaction";
import formatDate from "../../helper/formatDate";
import { BiArrowBack } from "react-icons/bi";
import { walletRepository } from "../../repository/wallet";

const WalletDetails = observer(() => {

    const [dataUser, setDataUser] = useState([]);
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    const router = useRouter();

    useEffect(() => {
        if (typeof window !== undefined) {
            let token = localStorage.getItem('access_token')

            const decodeJwt = jwtDecode(token)
            setDataUser(decodeJwt)
        }
    }, [])

    const {data: dataBalanceGMP} = walletRepository.hooks.useGetBalanceGMP();
    const {data: dataTransaction} = transactionRepository.hooks.useGetAllTransaction(
        {
            startDate: startDate,
            endDate: endDate,
        },
    );
    console.log(dataTransaction, "uhuhfruh");
    console.log(dataBalanceGMP, "ckckck");

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

    console.log(startDate, "start");
    console.log(endDate, "end");
    console.log(dataTransaction);

    
    return (
        <>
            {/* <div className="relative bg-[#FAFAFA] min-h-screen max-w-lg bg-center w-full mx-auto px-6 rounded-t"> */}
                <div className={'relative flex flex-col justify-center items-center bg-primary bg-center h-1/3 w-full rounded-b-[30px]'}>
                    <div className={'grid grid-cols-3 w-5/6 z-10 -mt-14'}>
                        <Button className={'flex justify-center items-center rounded-lg p-0 h-10 w-12'}
                                onClick={() => router.back()}>
                            <BiArrowBack  className={'text-lg'}/>
                        </Button>
                        <div className="flex items-center col-span-2">
                        <Image src={'/assets/logo/mini-logo2.png'} className={'px-2'}  preview={false}/>
                        <span className={'w-full text-2xl font-bold text-white'}>GMP</span>
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

                <Card className={"-mt-24 h-48 bg-[#b88727] rounded-xl border-none mx-10 w-4/5 bg-[url('/assets/background/bg-chip.png')]"}>
                    <div className={'flex items-center gap-2 -mt-3'}>
                        <Image src={'/assets/logo/mini-logo.png'} preview={false}/>
                        <span className={'text-white font-semibold text-sm leading-8'}>GMP</span>
                    </div>
                    <div className={'absolute'}>
                        <div className={'font-semibold text-sm leading-4 text-white mt-2.5'}>
                            Balance
                        </div>
                        <h2 className={'font-semibold text-3xl text-white z-10'}>
                           ${dataBalanceGMP?.data}
                        </h2>
                    </div>
                    <div className="absolute px-6 py-2 w-full right-0 left-0 rounded-b-xl bottom-0" style={{ backgroundColor: 'rgba(254, 155, 11, 0.4)', backdropFilter: 'blur(2px)' }}>
                        <p className={'text-sm font-semibold text-white mb-[1px] pt-2'}>Transaksi Terakhir</p>
                        {dataTransaction?.data.length === 0 ? (
                            ''
                        ) : (
                            <p className={'text-white font-semibold text-base'}>{formatDate(new Date(dataTransaction?.data[0].createdAt))}</p>
                        )}
                    </div>
                </Card>

                {dataTransaction?.data.length === 0 ? (
                    <div className={'mt-8 pb-28 px-10'}>
                        <p className={'font-semibold text-lg'}>Riwayat Transaksi</p>
                        <div className="relative">
                            <Form>
                                <Form.Item>
                                    <DatePicker.RangePicker 
                                        className="mr-2 rounded-md" 
                                        picker="month" 
                                        onChange={(e) => filterDate(e?.[0], e?.[1])}
                                    />
                                </Form.Item>
                            </Form>
                        </div>
                        <div className={'flex justify-center'}>
                            Anda Belum Memiliki Riwayat Transaksi
                        </div>
                    </div>
                ) : (
                    <div className={'mt-8 pb-28 px-10'}>
                        <p className={'font-semibold text-lg'}>Riwayat Transaksi</p>
                        <div className="relative">
                            <Form>
                                <Form.Item>
                                    <DatePicker.RangePicker 
                                        className="mr-2 rounded-md" 
                                        picker="month" 
                                        onChange={(e) => filterDate(e?.[0], e?.[1])}
                                    />
                                </Form.Item>
                            </Form>
                        </div>
                        {dataTransaction?.data.map((value, index) => (
                            <div key={index} onClick={() => router.push(`/wallet_detail/transaction_detail/${value.id}`)} className={'grid grid-rows-2 grid-flow-col mb-2 mt-4'}>
                                {value?.type === 0 ? (
                                    <div className={'font-semibold text-base mb-1'}>Buy Package</div>
                                ) : value?.type === 1 ? (
                                    <div className={'font-semibold text-base mb-1'}>Distribute Pair</div>
                                ) : value?.type === 2 ? (       
                                    <div className={'font-semibold text-base mb-1'}>Stake Result</div>
                                ) : value?.type === 3 ? (        
                                    <div className={'font-semibold text-base mb-1'}>Stake Level Result</div>
                                ) : value?.type === 4 ? (
                                    <div className={'font-semibold text-base mb-1'}>Move Internal GMP</div>
                                ) : value?.type === 5 ? (
                                    <div className={'font-semibold text-base mb-1'}>Stake External GMP</div>
                                ) : (
                                    <div className={'font-semibold text-base mb-1'}>Move External USDT</div>
                                )}
                                <div className={'text-sm font-normal text-slate-600'}>{formatDate(new Date(value.createdAt))}</div>
                                <div className={'row-span-3 col-span-2 text-lg font-semibold pb-8'}>
                                    <p className={'text-right text-green-500 mb-1'}>{value.amount} {value?.currency}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            {/* </div> */}
        </>
    )
})
WalletDetails.getLayout = function Layout(page) {
    return <DesktopLayout>{page}</DesktopLayout>
}
export default  WalletDetails;