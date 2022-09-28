import React from "react";
import {observer} from "mobx-react-lite";
import {Button, Image} from "antd";
import {BiArrowBack} from "react-icons/bi";
import {useRouter} from "next/router";

export const Header = observer(({title, isBack = true}) => {
    const router = useRouter();

    return (
        <div className={'relative flex justify-center items-center bg-[url("/assets/background/BG-Header.png")] bg-cover h-1/5 w-full rounded-t'}>
            <div className={'flex flex-row items-center w-5/6 z-10'}>
                {isBack && (
                    <Button className={'flex justify-center items-center rounded-lg border-none p-0 h-10 w-14'}
                            onClick={() => router.back()}>
                        <BiArrowBack className={'text-lg'}/>
                    </Button>
                )}

                <span className={`w-full text-2xl font-bold text-white text-center ${isBack && 'pr-12'}`}>{title}</span>
            </div>
        </div>
    )
})