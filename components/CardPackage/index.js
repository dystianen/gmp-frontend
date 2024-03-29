import * as React from 'react';
import {Button, Card, Image, Skeleton, Tag} from "antd";
import {useRouter} from "next/router";
import {FormatNumber} from "../../helpers/NumberFormat";

export const CardPackage = (props) => {
    const {index, isValidating, data, type} = props;
    const router = useRouter();

    return <Card
        key={index}
        className={`${(type !='binary') && 'w-11/12'} rounded-2xl ${(index === 0 && type !='binary') && '-mt-10'}`}
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
                        <span className={'text-xs'}>Keuntungan</span>
                        <span className={'text-sm font-bold'}>
                            <FormatNumber value={data?.return_percentage} suffix={' %'}/>
                        </span>
                    </div>
                </div>
                <div className={'flex gap-4'}>
                    <Image src={'/assets/icons/admin.svg'} preview={false}/>
                    <div className={'flex flex-col'}>
                        <span className={'text-xs'}>Stake Level</span>
                        <span className={'text-sm font-bold'}>
                            <FormatNumber value={data?.reward_level_max} suffix={' Level'}/>
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
                {
                    type != 'binary' && (
                        <Button size={'large'}
                                className={'rounded-full bg-[#FCC200] text-white border-none font-medium'}
                                onClick={() => router.push(`/investment_package/${data.id}/detail`)}>Detail</Button>
                    )
                }

            </div>
        </Skeleton>
    </Card>
};
