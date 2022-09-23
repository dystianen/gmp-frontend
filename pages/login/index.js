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
            message.success("Berhasil Masuk");
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
            <div className={'flex flex-col items-center h-screen max-w-lg mx-auto'}>
                <div
                    className={'flex justify-center items-center bg-cover bg-[url("/assets/background/BG2.svg")] bg-center h-3/5 rounded-b-3xl w-full z-10'}>
                    <Image className={'w-32'} src={'/assets/logo/logo.png'} alt={'logo'} preview={false}/>
                </div>
                <Card className={'w-full h-4/5 -mt-10'}>
                    <div className={'flex flex-col items-center mb-10 mt-8'}>
                        <h1 className={'text-xl font-bold'}>SELAMAT DATANG</h1>
                        <span className={'text-base text-center opacity-50'}>Masuk Untuk Mengelola Akun Anda</span>
                    </div>
                    <Form form={form} onFinish={handleSubmit} layout={'vertical'}>
                        <Form.Item name={'username'} label={label('Nama Pengguna')} rules={[{
                            required: true,
                            message: "Silahkan masukan nama pengguna!",
                            type: 'string',
                        }]}>
                            <Input placeholder={'Masukan username'}/>
                        </Form.Item>
                        <Form.Item name={'password'} label={label('Kata Sandi')} rules={[
                            {required: true, message: "Silahkan masukan kata sandi!"}
                        ]}>
                            <Input.Password placeholder={'Masukan password'}/>
                        </Form.Item>
                        <Form.Item>
                            {/*<Checkbox onChange={onChange}>Ingatkan saya</Checkbox>*/}
                            <Link href="/forgot_password">
                                <a className={'float-right text-black font-semibold'}>Lupa Kata Sandi?</a>
                            </Link>
                        </Form.Item>
                        <Form.Item className={'text-center pt-1.5'}>
                            <Button htmlType={'submit'} type={'primary'} className={'rounded-md mb-2'} size={'large'} block>Masuk</Button>
                            <span>Belum punya akun? <Link href={'/register'}>Registrasi</Link></span>
                        </Form.Item>
                    </Form>
                </Card>
            </div>
        </Spin>
    );
});

export default Login;
