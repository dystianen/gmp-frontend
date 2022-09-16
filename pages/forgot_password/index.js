import {observer} from "mobx-react-lite";
import {useRouter} from "next/router";
import {Button, Card, Form, Image, Input, message} from "antd";

const ForgotPassword = observer(() => {
    const router = useRouter();
    const [form] = Form.useForm();

    const label = (text) => (
        <span className="font-bold">
            {text}
        </span>
    )

    const handleSubmit = async () => {
        try {
            const values = await form.validateFields();
            setIsLoading(true)

            const body = {
                username: values.username,
                password: values.password,
            };

            await store.authentication.login(body);
            form.resetFields();
            message.success("Login Successfully");
            await router.push("/investment_package");
            setIsLoading(false)
        } catch (err) {
            console.log({err});
            setIsLoading(false)
            message.error(err.response.data.message);
        }
    };


    return (
        <>
            <div className={'relative flex-col flex justify-center bg-primary bg-center h-screen max-w-lg mx-auto rounded-t'}>
                <div className="absolute top-0 left-0">
                    <Image src={'/assets/background/Ellipse1.svg'} alt={'icon'} preview={false}/>
                </div>
                <div className="absolute top-28 right-0">
                    <Image src={'/assets/background/Ellipse4.svg'} alt={'icon'} preview={false}/>
                </div>
                <p className={'text-2xl font-bold text-white text-center'}>Ganti Password</p>
                <Card className={'mx-6 rounded-xl'}>
                    <Form form={form} onFinish={handleSubmit} layout={'vertical'}>
                        <Form.Item name={'username'} label={label('Username')} rules={[{
                            required: true,
                            message: "Please input username!",
                            type: 'string',
                        }]}>
                            <Input size={'large'} placeholder={'Masukan Username'} className={'h-12 rounded-lg'}/>
                        </Form.Item>

                        <Form.Item name={'password'} label={label('Password')} hasFeedback rules={[{
                            required: true,
                            message: "Please input new password!",
                            type: 'string',
                        }]}>
                            <Input.Password size={'large'} placeholder={'Masukan Password Baru'} className={'h-12 rounded-lg text-lg'}/>
                        </Form.Item>

                        <Form.Item
                            name="confirm"
                            label={label('Konfirmasi Password')}
                            dependencies={['password']}
                            hasFeedback
                            rules={[
                                {
                                    required: true,
                                    message: 'Please confirm your password!',
                                },
                                ({ getFieldValue }) => ({
                                    validator(_, value) {
                                        if (!value || getFieldValue('password') === value) {
                                            return Promise.resolve();
                                        }

                                        return Promise.reject(new Error('Kedua sandi yang Anda masukkan tidak cocok!'));
                                    },
                                }),
                            ]}
                        >
                            <Input.Password size={'large'} placeholder={'Konfirmasi Password'} className={'h-12 rounded-lg text-lg'}/>
                        </Form.Item>

                        <Form.Item className={'text-center pt-1.5'}>
                            <Button htmlType={'submit'} type={'primary'} className={'rounded-3xl mb-2'} size={'large'} block>Simpan</Button>
                        </Form.Item>
                    </Form>
                </Card>
            </div>
        </>
    )
})


export default ForgotPassword;