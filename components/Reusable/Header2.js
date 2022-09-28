import React from "react";
import {Button} from "antd";
import {BiArrowBack} from "react-icons/bi";
import {useRouter} from "next/router";
import {MdClose} from "react-icons/md";

export const Header2 = ({isBack = false, isCancel= false, isEwallet = false, children}) => {
    const router = useRouter();
    return <div
        className={'relative flex flex-col justify-center items-center bg-[url("/assets/background/new-background-1.png")] bg-cover h-1/3 bg-center w-full'}>
        <div className={`flex flex-row items-center ${isEwallet && 'gap-16'} w-5/6 z-10 ${(isEwallet || isCancel) && '-mt-32'}`}>
            {isBack && (
                <Button className={'flex justify-center items-center rounded-lg border-none p-0 h-10 w-12'}
                        onClick={() => router.back()}>
                    <BiArrowBack className={'text-lg'}/>
                </Button>
            )}

            {isCancel && (
                <Button className={'flex justify-center items-center rounded-lg border-none p-0 h-10 w-14'}
                        onClick={() => router.back()}>
                    <MdClose className={'text-xl'}/>
                </Button>
            )}

            {children}
        </div>
    </div>
}
