import React from "react";
import {observer} from "mobx-react-lite";
import {Button, Image} from "antd";
import {BiArrowBack} from "react-icons/bi";
import {useRouter} from "next/router";

export const Header = observer(({title, isBack = false}) => {
    const router = useRouter();

    return (
        <div className={'relative flex justify-center items-center bg-primary bg-center h-1/5 w-full rounded-t'}>
            <div className={'flex flex-row items-center w-5/6 z-10'}>
                {isBack && (
                    <Button className={'flex justify-center items-center rounded-lg border-none p-0 h-10 w-12'}
                            onClick={() => router.back()}>
                        <BiArrowBack className={'text-lg'}/>
                    </Button>
                )}

                <span className={`w-full text-2xl font-bold text-white text-center ${isBack && 'pr-12'}`}>{title}</span>
            </div>
            <div className="absolute">
                <Image src={'/assets/background/Particle1.png'} preview={false}/>
            </div>
            <div className="absolute top-0 left-0">
                <Image src={'/assets/background/BGYellowTop.svg'} preview={false}/>
            </div>
            <div className="absolute bottom-0 right-0 mt-10">
                <Image className={'-mb-[6px]'} src={'/assets/background/BGYellowBot.svg'} preview={false}/>
            </div>
        </div>
    )
})