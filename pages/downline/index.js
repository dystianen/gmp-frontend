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
import {Header} from "../../components/Reusable/Header";
import {TransformComponent, TransformWrapper} from "react-zoom-pan-pinch";
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";

const Downline = observer(() => {
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
            <div className={'relative h-screen'}>
                <Header title={'Downline'}/>

                <div className={'px-8'}>
                    <Card
                        className={"relative h-36 mt-9 bg-[#4461F2] rounded-xl bg-gradient-to-tr from-primary to-blue-300"}
                        bodyStyle={{padding: 20}}
                    >
                        <div className={'absolute bottom-0 right-0 -mb-2'}>
                            <Image src={'/assets/background/hierarchy.svg'} alt={'icon'} preview={false}/>
                        </div>

                        <div className={'flex flex-col gap-4'}>
                            <h2 className={'text-2xl text-white'}>Binary Geneologi</h2>
                            <Button
                                size={'large'}
                                className={'rounded-full bg-[#FCC200] text-white border-none font-semibold w-28'}
                                onClick={() => router.push(`/downline/binary-tree`)}
                            >
                                Lihat Detail
                            </Button>
                        </div>
                    </Card>

                    <Card
                        className={"relative mt-9 h-36 bg-[#FFBF00] rounded-xl bg-gradient-to-tr from-secondary to-yellow-200"}
                        bodyStyle={{padding: 20}}
                    >
                        <div className={'absolute bottom-0 right-0 -mb-2'}>
                            <Image src={'/assets/background/hierarchy.svg'} alt={'icon'} preview={false}/>
                        </div>

                        <div className={'flex flex-col gap-4'}>
                            <h2 className={'text-2xl text-white'}>Sun Geneologi</h2>
                            <Button
                                size={'large'}
                                type={'primary'}
                                className={'rounded-full text-white border-none font-semibold w-28'}
                                onClick={() => router.push(`/downline/sun-tree`)}
                            >
                                Lihat Detail
                            </Button>
                        </div>
                    </Card>
                </div>
            </div>
        </>
    )
})

Downline.getLayout = function Layout(page) {
    return <DesktopLayout>{page}</DesktopLayout>;
};
export default Downline;
