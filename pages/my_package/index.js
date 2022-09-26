import {Header} from "../../components/Reusable/Header";
import { observer } from "mobx-react-lite";
import DesktopLayout from "../../components/Layout/DesktopLayout/DesktopLayout";
import { Button, Card, Image } from "antd";
import { FormatNumber } from "../../helpers/NumberFormat";
import { useState } from "react";

const MyPackage = observer(() => {

    const [status, setStatus] = useState(false)   
    
    return (
        <>
            <Header title={"Paket Saya"}/>
            <div className={'px-8 pt-8'}>
                <Card className={'rounded-xl'}>
                    <div className={"flex justify-between"}>
                        <p className={'font-semibold text-xl'}>Paket Basic</p>
                        {status ? (
                            <div className={'flex justify-center bg-[#65dc411a] rounded-2xl w-[70px] h-[29px]'}>
                                <p className={'py-1 px-2 font-semibold text-sm text-[#65DC41]'}>Aktif</p>
                            </div>
                        ) : (
                            <div className={'flex justify-center bg-[#f036361a] rounded-2xl w-[70px] h-[29px]'}>
                                <p className={'py-1 px-2 font-semibold text-sm text-red-500'}>Nonaktif</p>
                            </div>
                        )}
                    </div>
                    <hr style={{ border: '1px solid rgba(18, 19, 28, 0.1)' }}/>
                    <div className={'grid grid-cols-2 gap-4 py-4'}>
                        <div className={'flex gap-4'}>
                            <Image src={'/assets/icons/users.svg'} preview={false}/>
                            <div className={'flex flex-col'}>
                                <span className={'text-xs font-medium'}>Pembeli</span>
                                <span className={'text-sm font-bold'}>
                                    <FormatNumber value={120}/>
                                </span>
                            </div>
                        </div>
                        <div className={'flex gap-4'}>
                            <Image src={'/assets/icons/profit.svg'} preview={false}/>
                            <div className={'flex flex-col'}>
                                <span className={'text-xs font-medium'}>Profit</span>
                                <span className={'text-sm font-bold'}>
                                    <FormatNumber value={20} suffix={' %'}/>
                                </span>
                            </div>
                        </div>
                        <div className={'flex gap-4'}>
                            <Image src={'/assets/icons/admin.svg'} preview={false}/>
                            <div className={'flex flex-col'}>
                                <span className={'text-xs font-medium'}>Admin</span>
                                <span className={'text-sm font-bold'}>
                                    <FormatNumber value={10} suffix={' BUSD'}/>
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className={'bg-[#4461f21a] rounded-xl flex items-center justify-between'}>
                        <div className={'py-4 px-4'}>
                            <p className={'text-[#4461F2] text-xs font-medium mb-1'}>Tagihan Biaya Admin</p>
                            <p className={'text-[#4461F2] text-sm font-semibold'}>14 Agustus 2023</p>
                        </div>
                        <div className={'py-4 px-4 font-semibold text-[#4461F2] text-lg'}>
                            $ 10
                        </div>
                    </div>
                    <Button
                            block
                            className={` ${status && 'hidden'} relative h-11 mt-4 rounded-full bg-[#FFBF00] text-white text-base font-semibold border-none`}
                        >
                            Bayar Tagihan
                        </Button>
                </Card>
            </div>
        </>
    )
})

MyPackage.getLayout = function Layout(page) {
    return <DesktopLayout>{page}</DesktopLayout>
}
 
export default MyPackage;