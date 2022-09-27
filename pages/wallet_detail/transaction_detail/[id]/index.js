import {Card, Divider, Image} from "antd"
import {observer} from "mobx-react-lite"
import {useRouter} from "next/router"
import DesktopLayout from "../../../../components/Layout/DesktopLayout/DesktopLayout"
import {transactionRepository} from "../../../../repository/transaction"
import moment from "moment";
import React from "react";
import {Header2} from "../../../../components/Reusable/Header2";
import {FormatNumber} from "../../../../helpers/NumberFormat";

const TransactionDetail = observer(() => {
    const router = useRouter()
    const {id} = router.query;
    const {data: oneTransaction} = transactionRepository.hooks.useGetTransactionDetail(id)

    const getType = (type) => {
        switch (type) {
            case 0:
                return "Buy Package";
            case 1:
                return "Distribute Pair";
            case 2:
                return "Stake Result";
            case 3:
                return "Stake Level Result";
            case 4:
                return "Move Internal GMP";
            case 5:
                return "Stake External GMP";
            default:
                return "Move External USDT";
        }
    }

    const data = [
        {
            label: 'Type',
            value: getType(oneTransaction?.data?.type),
        },
        {
            label: 'Waktu',
            value: moment(oneTransaction?.data?.createdAt).format('hh:mm'),
        },
        {
            label: 'Tanggal',
            value: moment(oneTransaction?.data?.createdAt).format('DD MMMM YYYY'),
        },
        {
            label: 'ID Transaksi',
            value: oneTransaction?.data?.id
        },
        {
            label: 'Asal Dana',
            value: oneTransaction?.data?.user_destination?.username
        }
    ]

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
                            <FormatNumber value={oneTransaction?.data?.amount} prefix={'$ '}/>
                        </p>
                    </div>

                    <Divider dashed style={{borderWidth: '3px 0 0'}}/>

                    <p className="my-4 font-semibold text-base">Rincian Transaksi</p>
                    {data.map((it, index) => {
                        return <div key={index} className="flex flex-row justify-between font-medium text-sm">
                            <p>{it.label}</p>
                            <p className={'w-36 text-right'}>{it.value}</p>
                        </div>
                    })}

                    <Divider dashed style={{borderWidth: '3px 0 0'}}/>

                    <div className="flex justify-between items-center font-medium text-sm">
                        <span>Jumlah</span>
                        <FormatNumber value={oneTransaction?.data?.amount} prefix={'$ '}/>
                    </div>
                    <Divider dashed style={{borderWidth: '3px 0 0'}}/>
                    <div className="flex justify-between font-semibold text-sm">
                        <p>Total</p>
                        <FormatNumber value={oneTransaction?.data?.amount} prefix={'$ '}/>
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
