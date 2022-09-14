import {useRouter} from "next/router";
import {Button, Card, Form, Image, Input, message, Checkbox} from "antd";
import Link from "next/link";
import {useStore} from "../../components/StoreProvider";
import {observer} from "mobx-react-lite";

const Login = observer(() => {
    const router = useRouter();
    const store = useStore();
    const [form] = Form.useForm();

    const label = (text) => (
        <span className="font-bold">
            {text}
        </span>
    )

    const handleSubmit = async () => {
        try {
            const values = await form.validateFields();

            const body = {
                username: values.username,
                password: values.password,
            };

            await store.authentication.login(body);
            form.resetFields();
            message.success("Login Successfully");
            await router.push("/investment_package");
        } catch (err) {
            console.log({err});
            message.error(err.response.data.message);
        }
    };

    return (
        <div className={'flex flex-col items-center h-screen max-w-lg mx-auto'}>
            <div
                className={'flex justify-center items-center bg-cover bg-[url("/assets/background/BG2.svg")] bg-center h-3/5 rounded-b-3xl w-full z-10'}>
                <Image className={'w-32'} src={'/assets/logo/logo.png'} preview={false}/>
            </div>
            <Card className={'w-full h-4/5 -mt-10'}>
                <div className={'flex flex-col items-center mb-10 mt-8'}>
                    <h1 className={'text-xl font-bold'}>Selamat Datang</h1>
                    <span className={'text-base text-center opacity-50'}>Masuk Untuk Mengelola Akun Anda</span>
                </div>
                <Form form={form} layout={'vertical'}>
                    <Form.Item name={'username'} label={label('Username')} rules={[{
                        required: true,
                        message: "Please input Username!",
                        type: 'string',
                    }]}>
                        <Input placeholder={'Masukan username'}/>
                    </Form.Item>
                    <Form.Item name={'password'} label={label('Password')} rules={[{
                        required: true,
                        message: "Please input Password!",
                    }]}>
                        <Input.Password placeholder={'Masukan password'}/>
                    </Form.Item>
                    <Form.Item>
                        {/*<Checkbox onChange={onChange}>Ingatkan saya</Checkbox>*/}
                        <Link href="#">
                            <a className={'float-right text-black font-semibold'}>Lupa Password?</a>
                        </Link>
                    </Form.Item>
                    <Form.Item className={'text-center pt-1.5'}>
                        <Button type={'primary'} className={'rounded-md mb-2'} size={'large'} block
                                onClick={handleSubmit}>Masuk</Button>
                        <span>Belum punya akun? <Link href={'/register'}>Registrasi</Link></span>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    );
});

export default Login;
