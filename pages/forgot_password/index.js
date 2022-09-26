import {observer} from "mobx-react-lite";
import {useRouter} from "next/router";
import {Button, Card, Form, Image, Input, message} from "antd";
import {authenticationRepository} from "../../repository/authentication";
import {useState} from "react";
import {BiArrowBack} from "react-icons/bi";

const ForgotPassword = observer(() => {
    const router = useRouter();
    const [form] = Form.useForm();
    const [isLoading, setIsLoading] = useState(false);
    const label = (text) => (
        <span className="font-bold">
            {text}
        </span>
    )


    const handleSubmit = async () => {
        form
            .validateFields()
            .then(async (values) => {
                try {
                    setIsLoading(true);
                    const res = await authenticationRepository.api.resetPassword({
                        newPassword: values.newPassword,
                        password: values.password,
                    });

                    console.log(res, "ini dia")

                    if (res.message == "success") {
                        setIsLoading(false);
                        message.success("Success Forgot Password");
                        await router.push("/investment_package");
                    }
                } catch (e) {
                    setIsLoading(false);
                    message.error(e.response?.data?.message);
                }
            })
            .catch((info) => {
                console.log("Validate Failed:", info);
            });
    };


    return (
        <>
            <div
                className={'relative flex-col flex justify-center bg-primary bg-center h-screen max-w-lg mx-auto rounded-t'}>
                <div className="absolute top-0 left-0">
                    <Image src={'/assets/background/Ellipse1.svg'} alt={'icon'} preview={false}/>
                </div>
                <div className="absolute top-28 right-0">
                    <Image src={'/assets/background/Ellipse4.svg'} alt={'icon'} preview={false}/>
                </div>
                <div className={'grid grid-cols-4 w-5/6 z-10 -mt-14'}>
                    <Button className={'flex justify-center mx-6 items-center rounded-lg p-0 h-10 w-12'}
                            onClick={() => router.back()}>
                        <BiArrowBack  className={'text-lg'}/>
                    </Button>
                    <div className="col-span-3 text-center">
                        <p className={'text-2xl font-bold text-white'}>Ubah Kata Sandi</p>
                    </div>
                </div>
                <Card className={'mx-6 rounded-xl'}>
                    <Form form={form} onFinish={handleSubmit} layout={'vertical'}>
                        <Form.Item name={'password'} label={label('Kata Sandi')} rules={[{
                            required: true,
                            message: "Silahkan masukan kata sandi!",
                        }]}>
                            <Input.Password size={'large'} placeholder={'Masukan Kata sandi sekarang'} className={'h-12 rounded-lg'}/>
                        </Form.Item>

                        <Form.Item name={'newPassword'} label={label('Kata Sandi Baru')} hasFeedback rules={[{
                            required: true,
                            message: "Kata sandi minimal 8 karakter",
                            min: 8,
                        }]}>
                            <Input.Password size={'large'} placeholder={'Masukan Kata Sandi Baru'}
                                            className={'h-12 rounded-lg text-lg'}/>
                        </Form.Item>

                        <Form.Item
                            name="confirm"
                            label={label('Konfirmasi Kata Sandi')}
                            dependencies={['newPassword']}
                            hasFeedback
                            rules={[
                                {
                                    required: true,
                                    message: 'Kata sandi minimal 8 karakter',
                                    min: 8,
                                },
                                ({getFieldValue}) => ({
                                    validator(_, value) {
                                        if (!value || getFieldValue('newPassword') === value) {
                                            return Promise.resolve();
                                        }

                                        return Promise.reject(new Error('Kedua sandi yang Anda masukan tidak cocok!'));
                                    },
                                }),
                            ]}
                        >
                            <Input.Password size={'large'} placeholder={'Konfirmasi Kata Sandi'}
                                            className={'h-12 rounded-lg text-lg'}/>
                        </Form.Item>

                        <Form.Item className={'text-center pt-1.5'}>
                            <Button htmlType={'submit'} type={'primary'} className={'rounded-3xl h-[48px]'} size={'large'}
                                    block>Simpan</Button>
                        </Form.Item>
                    </Form>
                </Card>
            </div>
        </>
    )
})


export default ForgotPassword;
