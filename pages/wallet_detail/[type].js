import React, {useEffect, useState} from "react";
import {observer} from "mobx-react-lite";
import {Card, Image, DatePicker, Button, Empty, Modal, Form, Input} from "antd";
import jwtDecode from "jwt-decode";
import moment from "moment";
import {useRouter} from "next/router";
import DesktopLayout from "../../components/Layout/DesktopLayout/DesktopLayout";
import {transactionRepository} from "../../repository/transaction";
import {FormatNumber} from "../../helpers/NumberFormat";
import {walletRepository} from "../../repository/wallet";
import {Header2} from "../../components/Reusable/Header2";

const {RangePicker} = DatePicker;

const WalletDetails = observer(() => {
    const [form] = Form.useForm();
    const router = useRouter();
    const {type} = router.query
    const [dataUser, setDataUser] = useState([]);
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formOrder, setFormOrder] = useState(0);
    const [noRekening, setNoRekening] = useState('');
    const [total, setTotal] = useState('');
    const [password, setPassword] = useState('');

    const {data: dataBalanceUSDT} = walletRepository.hooks.useGetBalanceUSDT();
    const {data: dataBalanceGMP} = walletRepository.hooks.useGetBalanceGMP();
    const {data: lastTransactionsUSDT} = walletRepository.hooks.useGetLastTransactions('USDT')
    const {data: lastTransactionsGMP} = walletRepository.hooks.useGetLastTransactions('GMP')
    const {data: dataTransaction} = transactionRepository.hooks.useGetAllTransaction(
        {
            startDate: startDate,
            endDate: endDate,
            type: type,
        },
    );

    useEffect(() => {
        if (typeof window !== undefined) {
            let token = localStorage.getItem('access_token')

            const decodeJwt = jwtDecode(token)
            setDataUser(decodeJwt)
        }
    }, [])

    const filterDate = (date1, date2) => {
        if (!date1 && !date2) {
            setStartDate('')
            setEndDate('')
            return
        }
        const result = moment(date1).format("YYYY-MM")
        const result2 = moment(date2).format("YYYY-MM")
        setEndDate(result2);
        setStartDate(result);
    }

    const handleSubmit = async () => {
        try {
            await form.validateFields();
            const body = {
                no_rekening: noRekening,
                total: total,
                password: password
            }
            console.log({body})
        } catch (err) {
            console.log({err})
        }
    }

    const getType = (type) => {
        switch (type) {
            case 0:
                return "BUY PACKAGE";
            case 1:
                return "DISTRIBUTE PAIR";
            case 2:
                return "STAKE RESULT";
            case 3:
                return "STAKE LEVEL RESULT";
            case 4:
                return "MOVE INTERNAL GMP";
            case 5:
                return "MOVE EXTERNAL GMP";
            case 6:
                return "MOVE EXTERNAL USDT";
            default:
                return "Move External USDT";
        }
    }

    return (
        <>
            <Modal
                open={isModalOpen}
                onCancel={() => setIsModalOpen(false)}
                maskClosable={false}
                bodyStyle={{paddingBottom: 0}}
                footer={[
                    <Button key={"reset"} onClick={() => {
                        if (formOrder === 0) {
                            setIsModalOpen(false)
                            setFormOrder(0)
                        } else {
                            setFormOrder(0)
                        }
                    }}>
                        {formOrder === 0 ? 'Batalkan' : 'Kembali'}
                    </Button>,
                    <Button key={"Filter"} type="primary"
                            onClick={() => {
                                form.validateFields().then(() => {
                                    formOrder === 0 ? setFormOrder(1) : handleSubmit()
                                })
                            }}>
                        {formOrder === 0 ? 'Selanjutnya' : 'Ok'}
                    </Button>,
                ]}
            >
                <Form form={form} layout={'vertical'}>
                    {formOrder === 0 ? (
                        <>
                            <Form.Item
                                name={'no_rekening'}
                                label={'No Rekening Tujuan'}
                                onChange={(e) => setNoRekening(e.target.value)}
                                rules={[
                                    {required: true, message: "Silahkan masukan no rekening tujuan!"}
                                ]}
                            >
                                <Input/>
                            </Form.Item>
                            <Form.Item
                                name={'total'}
                                label={'Total'}
                                onChange={(e) => setTotal(e.target.value)}
                                rules={[
                                    {required: true, message: "Silahkan masukan total yang dikirim!"}
                                ]}
                            >
                                <Input/>
                            </Form.Item>
                        </>
                    ) : (
                        <>
                            <Form.Item
                                name={'password'}
                                label={'Password'}
                                onChange={(e) => setPassword(e.target.value)}
                                rules={[
                                    {required: true, message: "Silahkan masukan password akun anda!"}
                                ]}>
                                <Input/>
                            </Form.Item>
                        </>
                    )}
                </Form>
            </Modal>

            <Header2 isBack isEwallet>
                {<div className="flex justify-center items-center text-center">
                    {type === "GMP" ? (
                        <Image src={'/assets/logo/mini-logo2.png'} className={'px-2'} preview={false}/>
                    ) : (
                        <Image src={'/assets/logo/theter2.png'} className={'px-2'} preview={false}/>
                    )}
                    <span className={`w-full text-2xl font-bold text-white text-center`}>{type}</span>
                </div>}
            </Header2>

            {type === "GMP" ? (
                <Card
                    className={"-mt-[110px] h-[170px] lg:h-48 rounded-xl border-none mx-10 w-4/5 bg-[url('/assets/background/GMT.png')] bg-transparent bg-top bg-cover"}>
                    <div className={'flex items-center gap-2 -mt-3'}>
                        <Image src={'/assets/logo/mini-logo.png'} preview={false}/>
                        <span className={'text-white font-semibold text-sm leading-8'}>{type}</span>
                    </div>
                    <div className={'absolute'}>
                        <div className={'font-semibold text-sm leading-4 text-white mt-2.5'}>
                            Balance
                        </div>
                        <h2 className={'font-semibold text-3xl text-white z-10'}>
                            <FormatNumber value={dataBalanceGMP?.data}/>
                        </h2>
                    </div>
                    <div
                        className="absolute flex justify-between items-center px-6 w-full right-0 left-0 rounded-b-xl bottom-0"
                        style={{backgroundColor: 'rgba(254, 155, 11, 0.4)'}}>
                        <div>
                            <p className={'text-sm font-semibold text-white mb-[1px] pt-2'}>Transaksi Terakhir</p>
                            {lastTransactionsGMP?.data === null ? (
                                <p className="pl-14 text-white">-</p>
                            ) : (
                                <p className={'text-white font-semibold text-base'}>{moment(lastTransactionsGMP?.data?.updateAt).format('DD MMMM YYYY')}</p>
                            )}
                        </div>
                        {/*<Button*/}
                        {/*    className={'text-secondary font-bold text-sm w-[99px] h-[34px] border-solid border-none rounded-2xl'}*/}
                        {/*    onClick={() => setIsModalOpen(true)}*/}
                        {/*>*/}
                        {/*    Kirim*/}
                        {/*</Button>*/}
                    </div>
                </Card>
            ) : (
                <Card
                    className={"-mt-[110px] h-[170px] lg:h-48 bg-transparent rounded-xl border-none mx-10 w-4/5 bg-[url('/assets/background/USDT.png')] bg-cover bg-top opacity-90"}>
                    <div className={'flex items-center gap-2 -mt-3'}>
                        <Image src={'/assets/logo/theter.png'} preview={false}/>
                        <span className={'text-white font-semibold text-sm leading-8'}>{type}</span>
                    </div>
                    <div className={'absolute'}>
                        <div className={'font-semibold text-sm leading-4 text-white mt-2.5'}>
                            Balance
                        </div>
                        <h2 className={'font-semibold text-3xl text-white z-10'}>
                            <FormatNumber value={dataBalanceUSDT?.data}/>
                        </h2>
                    </div>
                    <div
                        className="absolute flex justify-between items-center px-6 w-full right-0 left-0 rounded-b-xl bottom-0"
                        style={{backgroundColor: 'rgba(0, 0, 0, 0.4)'}}>
                        <div>
                            <p className={'text-sm font-semibold text-white mb-[1px] pt-2'}>Transaksi Terakhir</p>
                            {lastTransactionsUSDT?.data === null ? (
                                <p className="pl-14 text-white">-</p>
                            ) : (
                                <p className={'text-white font-semibold text-base'}>{moment(lastTransactionsUSDT?.data?.updateAt).format('DD MMMM YYYY')}</p>
                            )}
                        </div>
                        {/*<Button*/}
                        {/*    className={'text-[#49A078] font-bold text-sm w-[99px] h-[34px] border-solid border-none rounded-2xl'}*/}
                        {/*    onClick={() => setIsModalOpen(true)}*/}
                        {/*>*/}
                        {/*    Kirim*/}
                        {/*</Button>*/}
                    </div>
                </Card>
            )}

            <div className={'mt-8 pb-28 px-10'}>
                <p className={'font-semibold text-lg'}>Riwayat Transaksi</p>
                <div className="relative">
                    <RangePicker
                        className="mr-2 rounded-md"
                        picker="month"
                        onChange={(e) => filterDate(e?.[0], e?.[1])}
                    />
                </div>

                {dataTransaction?.data?.length === 0 ?
                    (<Empty className={'mt-8'}/>) :
                    (<div>
                        {dataTransaction?.data.map((value, index) => (
                            <div
                                key={index}
                                className={'flex flex-row justify-between items-center mb-2 mt-4 cursor-pointer'}
                                onClick={() => router.push(`/wallet_detail/transaction_detail/${value.id}`)}
                            >
                                <div className={'flex flex-col'}>
                                    <div className={'font-semibold text-base mb-1'}>{getType(value?.type)}</div>
                                    <div className={'text-sm font-normal text-slate-600'}>
                                        {moment(value?.createdAt).format('DD MMMM YYYY')}
                                    </div>
                                </div>

                                <div className={'text-lg font-semibold'}>
                                    {(value?.type === 0 || value?.type === 5 || value?.type === 6) ?
                                        (<p className={'text-right text-red-400 mb-1'}>
                                            <FormatNumber value={value.amount} suffix={' ' + value.currency}/>
                                        </p>) :
                                        (<p className={'text-right text-green-500 mb-1'}>
                                            <FormatNumber value={value.amount} suffix={' ' + value?.currency}/>
                                        </p>)
                                    }
                                </div>
                            </div>
                        ))}
                    </div>)
                }
            </div>
        </>
    )
})
WalletDetails.getLayout = function Layout(page) {
    return <DesktopLayout>{page}</DesktopLayout>
}
export default WalletDetails;
