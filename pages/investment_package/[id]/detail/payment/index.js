import {observer} from "mobx-react-lite";
import DesktopLayout from "../../../../../components/Layout/DesktopLayout/DesktopLayout";
import {Button, Card, Image, List, Radio, Space} from "antd";
import {BiArrowBack} from "react-icons/bi";
import {useRouter} from "next/router";
import React from "react";

const DetailPayment = observer(() => {
    const router = useRouter()

    const data = [
        {
            title: 'Nama Paket',
            description: 'Paket Basic',
        },
        {
            title: 'Tanggal',
            description: '12/09/2022, 12:45',
        },
        {
            title: 'Harga',
            description: '$ 100'
        },
    ];

    return (
        <>
            <div
                className={'relative flex justify-center items-center bg-primary bg-center h-1/4 w-full rounded-t'}>
                <div className="absolute top-0 left-0">
                    <Image src={'/assets/background/Ellipse1.svg'} preview={false}/>
                </div>
                <div className="absolute bottom-0 right-0">
                    <Image src={'/assets/background/Ellipse2.svg'} preview={false}/>
                </div>
                <div className={'flex flex-row items-center w-5/6'}>
                    <Button className={'flex justify-center items-center rounded-lg p-0 h-10 w-12'}
                            onClick={() => router.push('/investment_package/029029029/detail')}>
                        <BiArrowBack className={'text-lg'}/>
                    </Button>
                    <span className={'w-full text-2xl font-bold text-white text-center pr-12'}>Pembayaran</span>
                </div>
            </div>
            <div className={'flex flex-col gap-2 overflow-auto m-5 pb-5'}>
                <Card className={'rounded-lg border-none'}>
                    <List
                        itemLayout="horizontal"
                        dataSource={data}
                        renderItem={item => (
                            <List.Item>
                                <List.Item.Meta
                                    title={<span className={'font-bold text-[13px] text-[#7d7d82]'}>{item.title}</span>}
                                    description={<span
                                        className={`font-semibold ${item.title === 'Harga' ? 'text-primary text-2xl' : 'text-[#12131c] text-[15px]'}`}>{item.description}</span>}
                                />
                            </List.Item>
                        )}
                    />
                </Card>

                <h1 className={'text-lg font-bold pt-3'}>Payment Method</h1>
                <Radio.Group>
                    <Space direction="vertical" className={'w-full'}>
                        <Card className={'rounded-lg border-none'}>
                            <Radio value={1} className={'flex text-[15px] text-[#7d7d82] font-semibold gap-2'}>USDT</Radio>
                        </Card>
                        <Card className={'rounded-lg border-none'}>
                            <Radio value={2} className={'flex text-[15px] text-[#7d7d82] font-semibold gap-2'}>GMP</Radio>
                        </Card>
                    </Space>
                </Radio.Group>

                <h1 className={'text-lg font-bold pt-3'}>Ringkasan Pembayaran</h1>
                <div className={'flex flex-col'}>
                    <div className={'flex flex-row justify-between'}>
                        <h1 className={'font-bold text-base text-[#7d7d82]'}>Harga Paket</h1>
                        <p className={'font-bold text-base'}>$ 12000</p>
                    </div>

                    <div className={'flex flex-row justify-between'}>
                        <h1 className={'font-bold text-base text-[#7d7d82]'}>Harga Paket</h1>
                        <p className={'font-bold text-base'}>$ 12000</p>
                    </div>

                    <div className={'flex flex-row items-center justify-between bg-[#4461f2]/[.09] p-3 rounded-[9px]'}>
                        <span className={'font-bold text-base text-primary'}>Total Tagihan</span>
                        <span className={'font-bold text-base text-primary'}>$ 120</span>
                    </div>
                </div>

                <Button block type={'primary'} size={'large'} className={'rounded-full h-12 mt-5'}
                        onClick={() => router.push('/investment_package/0909209/detail/payment')}>Konfirmasi</Button>
            </div>
        </>
    )
})

DetailPayment.getLayout = function Layout(page) {
    return <DesktopLayout bottomNavigation={false}>{page}</DesktopLayout>;
};

export default DetailPayment;