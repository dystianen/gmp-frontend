import {Card, Divider, Image} from "antd"
import {observer} from "mobx-react-lite"
import {useRouter} from "next/router"
import DesktopLayout from "../../../components/Layout/DesktopLayout/DesktopLayout"
import {transactionRepository} from "../../../repository/transaction"
import moment from "moment";
import React from "react";
import {Header2} from "../../../components/Reusable/Header2";
import {FormatNumber} from "../../../helpers/NumberFormat";

const TransactionDetail = observer(() => {
    const router = useRouter()
    const {id} = router.query;
    const {data: oneTransaction} = transactionRepository.hooks.useGetTransactionDetail(id)

    return (
        <>
            <Header2 isCancel>
                {
                    <div className="w-full text-center">
                        <span className={`w-full text-2xl font-bold text-white text-center`}>Detail Transaksi</span>
                    </div>
                }
            </Header2>
            <div className="bg-[#FAFAFA]">
                <Card className={'rounded-2xl mx-10 -mt-[130px] mb-20'}>
                    <div className="my-2 flex flex-col items-center justify-center">
                        <Image src={"/assets/logo/logo-token.svg"} alt={'logo'} preview={false}/>
                        <p className=" text-center font-semibold text-2xl text-[#4461F2] pt-2">
                            <FormatNumber value={oneTransaction?.data?.amount} prefix={'$ '} />
                        </p>
                    </div>
                    <Divider dashed style={{borderWidth: '3px 0 0'}}/>
                    <p className="my-4 font-semibold text-base">Rincian Transaksi</p>
                    <div className="grid grid-cols-2 gap-4 font-medium text-sm">
                        <div>Type</div>
                        {oneTransaction?.data?.type === 0 ? (
                            <div className={'text-right'}>Buy Package</div>
                        ) : oneTransaction?.data?.type === 1 ? (
                            <div className={'text-right'}>Distribute Pair</div>
                        ) : oneTransaction?.data?.type === 2 ? (
                            <div className={'text-right'}>Stake Result</div>
                        ) : oneTransaction?.data?.type === 3 ? (
                            <div className={'text-right'}>Stake Level Result</div>
                        ) : oneTransaction?.data?.type === 4 ? (
                            <div className={'text-right'}>Move Internal GMP</div>
                        ) : oneTransaction?.data?.type === 5 ? (
                            <div className={'text-right'}>Stake External GMP</div>
                        ) : (
                            <div className={'text-right'}>Move External USDT</div>
                        )}
                        <div>Waktu</div>
                        <div className="text-right">{moment(oneTransaction?.data?.createdAt).format('hh:mm')}</div>
                        <div>Tanggal</div>
                        <div
                            className="text-right">{moment(oneTransaction?.data?.createdAt).format('DD MMMM YYYY')}</div>
                        <div>ID Transaksi</div>
                        <div className="text-right">{oneTransaction?.data?.id}</div>
                        {oneTransaction?.data?.user_destination ? (
                            <>
                                <div>Asal Dana</div>
                                <div>{oneTransaction?.data?.user_destination}</div>
                            </>
                        ) : (<div></div>)}
                    </div>
                    <Divider dashed style={{borderWidth: '3px 0 0'}}/>
                    <div className="flex justify-between items-center font-medium text-sm">
                        <span>Jumlah</span>
                        <FormatNumber value={oneTransaction?.data?.amount} prefix={'$ '} />
                    </div>
                    <Divider dashed style={{borderWidth: '3px 0 0'}}/>
                    <div className="flex justify-between font-semibold text-sm">
                        <p>Total</p>
                        <FormatNumber value={oneTransaction?.data?.amount} prefix={'$ '} />
                    </div>
                </Card>
            </div>
        </>
    )
})
TransactionDetail.getLayout = function Layout(page) {
    return <DesktopLayout bottomNavigation={false}>{page}</DesktopLayout>
}
export default TransactionDetail;
