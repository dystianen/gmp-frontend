import {Image, Card, Button, Row, Col} from "antd";
import {observer} from "mobx-react-lite";
import Link from "next/link";
import jwtDecode from "jwt-decode";
import DesktopLayout from "../../components/Layout/DesktopLayout/DesktopLayout";
import {DesktopLayoutNavigation} from "../../components/Layout/DesktopLayout/DesktopLayoutNavigation";
import { useState, useEffect } from "react";

const Wallet = observer(() => {

    const [dataUser, setDataUser] = useState([]);

    useEffect(() => {
        if (typeof window !== undefined) {
            let token = localStorage.getItem('access_token')

            const decodeJwt = jwtDecode(token)
            setDataUser(decodeJwt)
        }
    }, [])   

    return (
        <>
            <div className={"relative min-h-screen flex flex-col max-w-lg mx-auto px-8 bg-[#FAFAFA] overflow-hidden"}>
                <div className={'absolute top-0 left-0'}>
                    <Image src={'/assets/icons/Ellipse1.svg'} alt={'icon'} preview={false}/>
                </div>
                <div className={'absolute top-11 right-0'}>
                    <Image src={'/assets/icons/Ellipse3.svg'} alt={'icon'} preview={false}/>
                </div>
                <div className={"flex w-full mt-10"}>
                    <div>
                        <button className={'flex items-center justify-center rounded-lg w-10 h-10 bg-[#FFBF00]'}>
                            <Link href={'/login'}>
                                <a><Image src={'/assets/icons/arrow-left.svg'} alt={'icon'} preview={false}/></a>
                            </Link>
                        </button>
                    </div>
                    <p className={'text-center w-full font-bold text-3xl leading-8 text-[#FFBF00]'}>
                        Dompet
                    </p>
                </div>

                <Card className={"mt-9 h-40 bg-[#4461F2] rounded-xl"}>
                    <div className={'absolute top-0 left-0'}>
                        <Image src={'/assets/icons/Ellipse2.svg'} alt={'icon'} preview={false}/>
                    </div>
                    <div className={'absolute top-[80px] right-0'}>
                        <Image src={'/assets/icons/Ellipse4.svg'} alt={'icon'} preview={false}/>
                    </div>
                    <div className={'flex justify-between'}>
                        <span className={'text-white font-semibold text-3xl leading-8'}>USDT</span>
                        <Button
                            className={'bg-transparent text-white w-[99px] h-[34px] border-solid border-2 border-white'}
                            style={{borderRadius: '50px'}}>
                            <Link href={'#'}>
                                <a>Detail</a>
                            </Link>
                        </Button>
                    </div>
                    <div className={'font-normal text-base leading-4 text-white mt-9'}>
                        Balance
                    </div>
                    <h2 className={'font-semibold text-4xl text-white'}>
                        $1000
                    </h2>
                </Card>

                <Card
                    className={"mt-10 h-40 bg-[#FFBF00] rounded-xl bg-[url('/assets/icons/Ellipse5.svg')] bg-no-repeat"}>
                    <div className={'absolute top-0 left-0'}>
                        <Image src={'/assets/icons/Ellipse2.svg'} alt={'icon'} preview={false}/>
                    </div>
                    <div className={'absolute top-[80px] right-0'}>
                        <Image src={'/assets/icons/Ellipse6.svg'} alt={'icon'} preview={false}/>
                    </div>
                    <div className={'flex justify-between'}>
                        <span className={'text-white font-semibold text-3xl leading-8'}>GMP</span>
                        <Button
                            className={'bg-transparent text-white w-[99px] h-[34px] border-solid border-2 border-white'}
                            style={{borderRadius: '50px'}}>
                            <Link href={'#'}>
                                <a>Detail</a>
                            </Link>
                        </Button>
                    </div>
                    <div className={'font-normal text-base leading-4 text-white mt-9'}>
                        Balance
                    </div>
                    <h2 className={'font-semibold text-4xl text-white'}>
                        $1000
                    </h2>
                </Card>

                <div className={'flex flex-col justify-start mt-7'}>
                    <p className={"font-medium text-lg leading-5 text-slate-400"}>Transaksi</p>
                    <Row justify={"start"}>
                        <Col span={4}>
                            <Button className={'bg-[#FFBF00] w-12 h-12 rounded-full'}>
                                <Image src={'/assets/icons/empty-wallet-tick.svg'} className={'absolute right-1'}
                                       width={25} height={25} alt={'icon'} preview={false}/>
                            </Button>
                        </Col>
                        <Col span={12} className={'flex items-center ml-3'}>
                            <div className={'font-medium text-lg'}>
                                <Link href={`wallet/${dataUser.id}`}>
                                    <a className={'text-black hover:text-[#FFBF00]'}>Riwayat Transaksi</a>
                                </Link>
                            </div>
                        </Col>
                    </Row>

                    <Row justify={"start"} className={'mt-4 mb-40'}>
                        <Col span={4}>
                            <Button className={'bg-[#FFBF00] w-12 h-12 rounded-full'}>
                                <Image src={'/assets/icons/empty-wallet-tick.svg'} className={'absolute right-1'}
                                       width={25} height={25} alt={'icon'} preview={false}/>
                            </Button>
                        </Col>
                        <Col span={12} className={'flex items-center ml-3'}>
                            <div className={'font-medium text-lg'}>
                                <Link href={'#'}>
                                    <a className={'text-black hover:text-[#FFBF00]'}>Riwayat Transfer</a>
                                </Link>
                            </div>
                        </Col>
                    </Row>
                </div>


                <DesktopLayoutNavigation/>
            </div>
        </>
    )
})

Wallet.getLayout = function Layout(page) {
    return <DesktopLayout>{page}</DesktopLayout>;
};
export default Wallet;