import React, {useEffect, useState} from "react";
import {Header} from "../../components/Reusable/Header";
import {observer} from "mobx-react-lite";
import DesktopLayout from "../../components/Layout/DesktopLayout/DesktopLayout";
import {Button, Card, Image, Modal, Spin, message, Empty} from "antd";
import {FormatNumber} from "../../helpers/NumberFormat";
import {userRepository} from "../../repository/users";
import moment from "moment";
import {packageRepository} from "../../repository/package";

const MyPackage = observer(() => {
    const [status, setStatus] = useState();
    const [isLoading, setIsLoading] = useState(false);

    const {data: profile} = userRepository.hooks.useGetProfile();
    const {data: myPackage} = userRepository.hooks.useGetMyPackage();

    useEffect(() => {
        setStatus(profile?.data?.package?.status)
    }, [profile])

    const handlePayBills = async () => {
        try {
            setIsLoading(true);
            const body = {
                buyPackageId: myPackage.data.package.id
            }

            await packageRepository.api.payBills(body);
            setIsLoading(false);
            message.success('Berhasil membayar tagihan paket')
        } catch (err) {
            setIsLoading(false);
            message.error('Gagal membayar tagihan paket!')
        }
    }

    const showConfirm = async () => {
        Modal.confirm({
            title: <span>Anda yakin ingin membayar tagihan paket {myPackage?.data?.package?.name} dengan harga ${myPackage?.data?.fee} USDT? </span>,
            okText: "Ok",
            cancelText: "Batal",
            onOk() {
                handlePayBills()
            },
        })
    }

    return (
        <>
            <Header title={"Paket Saya"}/>
            <Spin className={'h-full'} spinning={isLoading}>
                <div className={'px-8 pt-8'}>
                    {myPackage?.data ? (
                        <Card className={'rounded-xl'}>
                            <div className={"flex justify-between"}>
                                <p className={'font-semibold text-xl'}>Paket Basic</p>
                                {status ? (
                                    <div className={'flex justify-center bg-[#65dc411a] rounded-2xl w-[70px] h-[29px]'}>
                                        <span className={'py-1 px-2 tracking-wide font-semibold text-sm text-[#65DC41]'}>Aktif</span>
                                    </div>
                                ) : (
                                    <div className={'flex justify-center bg-[#f036361a] rounded-2xl w-[90px] h-[29px]'}>
                                        <span className={'py-1 px-2 tracking-wide font-semibold text-sm text-red-500'}>Nonaktif</span>
                                    </div>
                                )}
                            </div>
                            <hr style={{border: '1px solid rgba(18, 19, 28, 0.1)'}}/>
                            <div className={'grid grid-cols-2 gap-4 py-4'}>
                                <div className={'flex gap-4'}>
                                    <Image src={'/assets/icons/users.svg'} preview={false}/>
                                    <div className={'flex flex-col'}>
                                        <span className={'text-xs font-medium'}>Keuntungan</span>
                                        <span className={'text-sm font-bold'}>
                                    <FormatNumber value={myPackage?.data?.package?.return_percentage}/>
                                </span>
                                    </div>
                                </div>
                                <div className={'flex gap-4'}>
                                    <Image src={'/assets/icons/profit.svg'} preview={false}/>
                                    <div className={'flex flex-col'}>
                                        <span className={'text-xs font-medium'}>Stake Level</span>
                                        <span className={'text-sm font-bold'}>
                                    <FormatNumber value={myPackage?.data?.package?.reward_level_max} suffix={' Level'}/>
                                </span>
                                    </div>
                                </div>
                            </div>
                            <div className={'bg-[#4461f21a] rounded-xl flex items-center justify-between'}>
                                <div className={'py-4 px-4'}>
                                    <p className={'text-[#4461F2] text-xs font-medium mb-1'}>Tagihan Biaya Admin</p>
                                    <span
                                        className={'text-[#4461F2] text-sm font-semibold'}>{moment(myPackage?.data?.createdAt).format('DD MMMM YYYY')}</span>
                                </div>
                                <div className={'py-4 px-4 font-semibold text-[#4461F2] text-lg'}>
                                    <FormatNumber value={myPackage?.data?.fee} prefix={'$ '}/>
                                </div>
                            </div>
                            <Button
                                block
                                onClick={showConfirm}
                                disabled={status}
                                className={`relative h-11 mt-4 rounded-full ${status ? 'bg-gray-300 text-[#12131C]/[0.5]' : 'bg-[#FFBF00] text-white'} text-base font-semibold border-none`}
                            >
                                Bayar Tagihan
                            </Button>
                        </Card>
                    ) : (
                        <Empty className={'mt-20'}/>
                    )}
                </div>
            </Spin>
        </>
    )
})

MyPackage.getLayout = function Layout(page) {
    return <DesktopLayout>{page}</DesktopLayout>
}

export default MyPackage;