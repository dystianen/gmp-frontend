import {useRouter} from "next/router";
import {Button, Card, Form, Image, Input, message, Checkbox, Spin} from "antd";
import Link from "next/link";
import {useStore} from "../../components/StoreProvider";
import {observer} from "mobx-react-lite";
import {useState} from "react";

const Login = observer(() => {
    const router = useRouter();
    const store = useStore();
    const [form] = Form.useForm();
    const [isLoading, setIsLoading] = useState(false);

    const label = (text) => (
        <span className="font-semibold text-sm">
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
            await message.success("Berhasil Masuk");
            await router.push("/investment_package");
            setIsLoading(false)
        } catch (err) {
            console.log({err});
            setIsLoading(false)
            message.error(err.response.data.message);
        }
    };

    return (
        <Spin spinning={isLoading}>
            <div
                className={'relative flex-col flex justify-center bg-[url("/assets/background/new-background.png")] bg-cover bg-center h-screen max-w-lg mx-auto rounded-t'}>
                <div className={'absolute top-6 left-6'}>
                    <Image src={'/assets/logo/logogmp.svg'} alt={'icon'} preview={false}/>
                </div>
                <p className={'text-2xl font-bold text-white text-center'}>Masuk</p>
                <Card className={'mx-6 rounded-xl'}>
                    <Form form={form} onFinish={handleSubmit} layout={'vertical'}>
                        <Form.Item name={'username'} label={label('Username')} rules={[{
                            required: true,
                            message: "Silahkan masukan nama pengguna!",
                            type: 'string',
                        }]}>
                            <Input placeholder={'Masukan username'} size={'large'} className={'h-12 rounded-lg text-sm'}/>
                        </Form.Item>
                        <Form.Item name={'password'} className={'my-2'} label={label('Kata Sandi')} rules={[
                            {required: true, message: "Silahkan masukan kata sandi!"},
                            {min: 8, message: "Kata sandi minimal 8 karakter"}
                        ]}>
                            <Input.Password placeholder={'Masukan password'} size={'large'} className={'h-12 rounded-lg text-sm'}/>
                        </Form.Item>
                        <Form.Item className="my-2">
                            <Link href="/forgot_password">
                                <a className={'float-right text-black font-semibold text-sm'}>Lupa Password?</a>
                            </Link>
                        </Form.Item> 
                        <Form.Item className={'text-center'}>
                            <Button htmlType={'submit'} type={'primary'} className={'rounded-3xl h-[48px] bg-[#FFBF00] border-none mb-2 text-base'} size={'large'} block>Masuk</Button>
                            <span className={'text-sm font-semibold'}>Belum punya akun? <Link href={'/register'}><a className={'text-[#FFBF00]'}>Registrasi</a></Link></span>
                        </Form.Item>
                    </Form>
                </Card>
            </div>
        </Spin>
    );
});

export default Login;
