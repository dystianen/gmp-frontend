import React from "react";
import {Card, Progress, Typography} from "antd";
import {FormatNumber} from "../../helpers/NumberFormat";
import {observer} from "mobx-react-lite";

const {Title} = Typography;

export const ProgressInvest = observer(({data}) => {
    return <Card className={'w-full rounded-lg z-10 mt-5'} bodyStyle={{padding: '10px 20px'}}>
        <Title className={'text-sm text-left'}>Stok Investasi <span
            className={'text-primary'}>({data?.percentage}%)</span></Title>
        <div className={'flex justify-between items-center'}>
            <span className={'text-primary font-semibold'}>
                <FormatNumber value={data?.current} prefix={'$ '}/>
            </span>
            <span className={'text-primary font-semibold'}>
                <FormatNumber value={data?.target} prefix={'$ '}/>
            </span>
        </div>
        <Progress strokeColor={'#4461F2'} percent={data?.percentage} size="large"/>
        <span className={'flex flex-row gap-2 text-[#7d7d82] font-semibold'}>
            Tersisa  <FormatNumber value={data?.target - data?.current} prefix={'$ '}/>
        </span>
    </Card>
})