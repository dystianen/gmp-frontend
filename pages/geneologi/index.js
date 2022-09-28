import React from "react";
import {Image, Card, Button} from "antd";
import {observer} from "mobx-react-lite";
import DesktopLayout from "../../components/Layout/DesktopLayout/DesktopLayout";
import {useRouter} from "next/router";
import {Header} from "../../components/Reusable/Header";

const Downline = observer(() => {
    const router = useRouter();

    return (
        <>
            <div className={'relative h-screen'}>
                <Header title={'Geneologi'}/>

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
                                onClick={() => router.push(`/geneologi/binary-tree`)}
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
                                onClick={() => router.push(`/geneologi/sun-tree`)}
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
