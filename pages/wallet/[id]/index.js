import {observer} from "mobx-react-lite";
import DesktopLayout from "../../../components/Layout/DesktopLayout/DesktopLayout";
import {Card, Image} from "antd";
import Link from "next/link";

const WalletDetails = observer(() => {

    const history = [
        {
            name: 'Withdraw',
            date: '09 September 2022, 12:45',
            amount: 50,
        },
        {
            name: 'Paket Medium',
            date: '02 Agustus 2022, 06:20',
            amount: 100,
        },
        {
            name: 'Withdraw',
            date: '20 Oktober 2022, 10:45',
            amount: 150,
        },
        {
            name: 'Paket Medium',
            date: '25 Oktober 2022, 16:00',
            amount: 50,
        },
        {
            name: 'Paket Medium',
            date: '25 Oktober 2022, 16:00',
            amount: 50,
        },
    ]
    console.log(history)
    return (
        <>
            <div className="relative bg-[#FAFAFA] min-h-screen max-w-lg bg-center w-full mx-auto px-6 rounded-t">
                <div className="absolute top-0 left-0">
                    <Image src={'/assets/icons/Ellipse8.svg'} alt={'icons'} preview={false}/>
                </div>
                <div className="absolute top-11 right-0">
                    <Image src={'/assets/icons/Ellipse7.svg'} alt={'icons'} preview={false}/>
                </div>
                <div className={'absolute z-10 top-12'}>
                    <button className={'rounded-lg w-10 h-10 bg-[#FFBF00]'}>
                        <Link href={'/investment_package'}>
                            <a><Image src={'/assets/icons/arrow-left.svg'} preview={false} alt={'icons'}/></a>
                        </Link>
                    </button>
                </div>
                <p className={'text-center text-2xl font-bold text-[#FFBF00] pt-[54px]'}>GMP</p>

                <Card className={"mt-9 h-48 bg-[#FFBF00] rounded-xl"}>
                    <div className={'absolute top-0 right-0 z-0'}>
                        <Image src={'/assets/background/chip.svg'} alt={'background'} preview={false}/>
                    </div>
                    <div className={'flex justify-between'}>
                        <span className={'text-white font-semibold text-2xl leading-8'}>GMP</span>
                    </div>
                    <div className={'absolute'}>
                        <div className={'font-medium text-sm leading-4 text-white mt-2.5'}>
                            Balance
                        </div>
                        <h2 className={'font-semibold text-3xl text-white z-10'}>
                            $10000000000
                        </h2>
                        <p className={'text-sm font-medium text-white mb-[1px]'}>Transaksi Terakhir</p>
                        {history.length === 0 ? (
                            ''
                        ) : (
                            <p className={'text-white font-semibold text-base'}>{history[0].date}</p>
                        )}
                    </div>
                </Card>

                {history.length === 0 ? (
                    <div className={'mt-8 pb-28'}>
                        <p className={'font-semibold text-lg'}>Riwayat Transaksi</p>
                        <div className={'flex justify-center'}>
                            Anda Belum Memiliki Riwayat Transaksi
                        </div>
                    </div>
                ) : (
                    <div className={'mt-8 pb-28'}>
                        <p className={'font-semibold text-lg'}>Riwayat Transaksi</p>
                        {history.map((value, index) => (
                            <div key={index} className={'grid grid-rows-2 grid-flow-col mb-2'}>
                                <div className={'font-semibold text-base mb-1'}>{value.name}</div>
                                <div className={'text-sm font-normal text-slate-600'}>{value.date}</div>
                                <div className={'row-span-3 col-span-2 text-lg font-semibold pb-8'}>
                                    {value.name === "Withdraw" ? (
                                        <p className={'text-right text-red-500 mb-1'}>-${value.amount}</p>
                                    ) : (
                                        <p className={'text-right text-green-500 mb-1'}>+${value.amount}</p>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </>
    )
})
WalletDetails.getLayout = function Layout(page) {
    return <DesktopLayout>{page}</DesktopLayout>
}
export default  WalletDetails;