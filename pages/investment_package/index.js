import {observer} from "mobx-react-lite";
import DesktopLayout from "../../components/Layout/DesktopLayout/DesktopLayout";
import {Button, Card, Image, Tag, Skeleton} from "antd";
import {useRouter} from "next/router";
import {packageRepository} from "../../repository/package";

const InvestmentPackage = observer(() => {
    const router = useRouter();
    const {data: packages, isValidating} = packageRepository.hooks.useGetAll();

    return (
        <>
            <div className={'relative flex justify-center items-center bg-primary bg-center h-1/3 w-full rounded-t'}>
                <div className="absolute top-0 left-0">
                    <Image src={'/assets/background/Ellipse1.svg'} preview={false}/>
                </div>
                <div className="absolute bottom-0 right-0">
                    <Image src={'/assets/background/Ellipse3.svg'} preview={false}/>
                </div>
                <p className={'text-2xl font-bold text-white text-center'}>Paket Investasi</p>
            </div>
            <div className={'flex flex-col items-center gap-5 pb-28 bg-[#f8f8ff]'}>
                {packages?.data?.map((it, index) => (
                    <Card
                        key={index}
                        className={`w-11/12 rounded-2xl ${index === 0 && '-mt-20'}`}
                        title={<span className={'font-bold text-xl'}>{it.name}</span>}
                        extra={
                            <Tag className={'flex items-center py-3 px-4 rounded-full border-none bg-[#4461f2]/[.09]'}>
                                <Image src={'/assets/icons/clock.svg'} preview={false}/>
                                <span className={'text-primary font-semibold text-sm pl-1'}>{it.reward_percentage_monthly} Bulan</span>
                            </Tag>
                        }
                    >
                        <Skeleton loading={isValidating} active={true}>
                            <div className={'grid grid-cols-2 gap-4'}>
                                <div className={'flex gap-4'}>
                                    <Image src={'/assets/icons/profit.svg'} preview={false}/>
                                    <div className={'flex flex-col'}>
                                        <span className={'text-xs'}>Profit</span>
                                        <span className={'text-sm font-bold'}>{it.return_percentage} %</span>
                                    </div>
                                </div>
                                <div className={'flex gap-4'}>
                                    <Image src={'/assets/icons/admin.svg'} preview={false}/>
                                    <div className={'flex flex-col'}>
                                        <span className={'text-xs'}>Admin</span>
                                        <span className={'text-sm font-bold'}>{it.service_fee} USDT</span>
                                    </div>
                                </div>
                            </div>
                            <div className={'grid grid-cols-2 items-center mt-4'}>
                                <div className={'flex flex-col'}>
                                    <span className={'text-sm font-medium'}>Harga</span>
                                    <span className={'text-[#4461F2] text-2xl font-semibold'}>$ {it.price}</span>
                                </div>
                                <Button type={'primary'} size={'large'} className={'rounded-full'}
                                        onClick={() => router.push(`/investment_package/${it.id}/detail`)}>Detail</Button>
                            </div>
                        </Skeleton>
                    </Card>
                ))}
            </div>
        </>
    )
})

InvestmentPackage.getLayout = function Layout(page) {
    return <DesktopLayout>{page}</DesktopLayout>;
};

export default InvestmentPackage;
