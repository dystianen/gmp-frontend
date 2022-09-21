import { Button, Card, Image } from "antd"
import { observer } from "mobx-react-lite"
import { useRouter } from "next/router"
import { BiArrowBack } from "react-icons/bi"
import DesktopLayout from "../../../components/Layout/DesktopLayout/DesktopLayout"
import { transactionRepository } from "../../../repository/transaction"
import formatDate from "../../../helper/formatDate"

const TransactionDetail = observer(() => {
    const router = useRouter()
    const {id} = router.query;

    const {data: oneTransaction} = transactionRepository.hooks.useGetTransactionDetail(id)
    console.log(oneTransaction);
    return (
        <>
            <div className={'relative flex flex-col justify-center items-center bg-primary bg-center h-1/3 w-full rounded-b-[30px]'}>
                <div className={'flex flex-row items-center w-5/6 z-10 -mt-14'}>
                    <Button className={'flex justify-center items-center rounded-lg p-0 h-10 w-12'}
                            onClick={() => router.back()}>
                        <BiArrowBack  className={'text-lg'}/>
                    </Button>
                    <span className={'w-full text-2xl font-bold text-white text-center pr-12'}>Detail Transaksi</span>
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
            <div className="bg-[#FAFAFA] h-screen">
                <Card className={'h-screen rounded-2xl mx-10 -mt-[80px] mb-20'}>
                    <div className="my-2 flex flex-col items-center justify-center">
                        <Image src={"/assets/logo/logo-token.svg"} alt={'logo'} preview={false}/>
                        <p className=" text-center font-semibold text-2xl text-[#4461F2] mt-1">${oneTransaction?.data?.amount}</p>
                    </div>
                    <hr className="w-full"/>
                    <p className="my-4 font-semibold text-base">Rincian Transaksi</p>
                    <div className="grid grid-cols-2 gap-4 font-medium text-sm">
                        <div>Status</div>
                        <div className="text-right">Selesai</div>
                        <div>Waktu</div>
                        <div className="text-right">12:45</div>
                        <div>Tanggal</div>
                        <div className="text-right">{formatDate(new Date(oneTransaction?.data?.createdAt))}</div>
                        <div>ID Transaksi</div>
                        <div className="text-right">{oneTransaction?.data?.id}</div>
                        <div>Order ID</div>
                        <div className="text-right">31473478485985985</div>
                    </div>
                    <hr className="w-full my-4"/>
                    <div className="flex justify-between items-center font-medium text-sm">
                        <p>Jumlah</p>
                        <p>${oneTransaction?.data?.amount}</p>
                    </div>
                    <hr className="w-full my-3"/>
                    <div className="flex justify-between font-semibold text-sm">
                        <p>Total</p>
                        <p>${oneTransaction?.data?.amount}</p>
                    </div>
                    <div className="pb-14">
                        <Button className={'h-14 rounded-full bg-[#FFBF00]/[0.1] w-full text-[#FFBF00] text-lg font-semibold border-none'}>
                            Bagikan Transaksi
                        </Button>
                    </div>
                </Card>
            </div>
        </>
    )
})
TransactionDetail.getLayout = function Layout(page) {
    return <DesktopLayout>{page}</DesktopLayout>
}
export default TransactionDetail;