import {observer} from "mobx-react-lite";
import {useRouter} from "next/router";
import {Button, Card, Form, Image, Input, message} from "antd";
import {authenticationRepository} from "../../repository/authentication";
import {useState} from "react";

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
                <p className={'text-2xl font-bold text-white text-center'}>Ganti Password</p>
                <Card className={'mx-6 rounded-xl'}>
                    <Form form={form} onFinish={handleSubmit} layout={'vertical'}>
                        <Form.Item name={'password'} label={label('Password')} rules={[{
                            required: true,
                            message: "Please input password!",
                            type: 'string',
                        }]}>
                            <Input.Password size={'large'} placeholder={'Masukan password sekarang'} className={'h-12 rounded-lg'}/>
                        </Form.Item>

                        <Form.Item name={'newPassword'} label={label('Password Baru')} hasFeedback rules={[{
                            required: true,
                            message: "Please input new password!",
                            type: 'string',
                        }]}>
                            <Input.Password size={'large'} placeholder={'MasukaMasukann Password Baru'}
                                            className={'h-12 rounded-lg text-lg'}/>
                        </Form.Item>

                        <Form.Item
                            name="confirm"
                            label={label('Konfirmasi Password')}
                            dependencies={['newPassword']}
                            hasFeedback
                            rules={[
                                {
                                    required: true,
                                    message: 'Please confirm your password!',
                                },
                                ({getFieldValue}) => ({
                                    validator(_, value) {
                                        if (!value || getFieldValue('newPassword') === value) {
                                            return Promise.resolve();
                                        }

                                        return Promise.reject(new Error('Kedua sandi yang Anda masukkan tidak cocok!'));
                                    },
                                }),
                            ]}
                        >
                            <Input.Password size={'large'} placeholder={'Konfirmasi Password'}
                                            className={'h-12 rounded-lg text-lg'}/>
                        </Form.Item>

                        <Form.Item className={'text-center pt-1.5'}>
                            <Button htmlType={'submit'} type={'primary'} className={'rounded-3xl mb-2'} size={'large'}
                                    block>Simpan</Button>
                        </Form.Item>
                    </Form>
                </Card>
            </div>
        </>
    )
})


export default ForgotPassword;
