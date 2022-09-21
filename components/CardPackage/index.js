import * as React from 'react';
import {Button, Card, Image, Skeleton, Tag} from "antd";
import {useRouter} from "next/router";
import {FormatNumber} from "../../helpers/NumberFormat";

export const CardPackage = (props) => {
    const {isValidating, data} = props;
    const router = useRouter();

    {console.log(data, "ini dia")}
    return <Card
        className={`rounded-2xl`}
        title={<span className={'font-bold text-xl'}>{data?.name}</span>}
        extra={
            <Tag className={'flex items-center py-3 px-4 rounded-full border-none bg-[#4461f2]/[.09]'}>
                <Image src={'/assets/icons/clock.svg'} preview={false}/>
                <span
                    className={'text-primary font-semibold text-sm pl-1'}>{data?.month_contract} Bulan</span>
            </Tag>
        }
    >
        <Skeleton loading={isValidating} active={true}>
            <div className={'grid grid-cols-2 gap-4'}>
                <div className={'flex gap-4'}>
                    <Image src={'/assets/icons/profit.svg'} preview={false}/>
                    <div className={'flex flex-col'}>
                        <span className={'text-xs'}>Profit</span>
                        <span className={'text-sm font-bold'}>
                            <FormatNumber value={data?.return_percentage} suffix={' %'}/>
                        </span>
                    </div>
                </div>
                <div className={'flex gap-4'}>
                    <Image src={'/assets/icons/admin.svg'} preview={false}/>
                    <div className={'flex flex-col'}>
                        <span className={'text-xs'}>Admin</span>
                        <span className={'text-sm font-bold'}>
                            <FormatNumber value={data?.service_fee} suffix={' BUSD'}/>
                        </span>
                    </div>
                </div>
            </div>
            <div className={'grid grid-cols-2 items-center mt-4'}>
                <div className={'flex flex-col'}>
                    <span className={'text-sm font-medium'}>Harga</span>
                    <span className={'text-[#4461F2] text-2xl font-semibold'}>
                        <FormatNumber value={data?.price} prefix={'$ '}/>
                    </span>
                </div>
            </div>
        </Skeleton>
    </Card>
};
