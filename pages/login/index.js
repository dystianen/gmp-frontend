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
        <span className="font-semibold text-base">
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

        <div
            className={'relative flex-col flex justify-center bg-primary bg-center h-screen max-w-lg mx-auto rounded-t'}>
            <div className="absolute top-0 left-0">
                <Image src={'/assets/background/Ellipse1.svg'} alt={'icon'} preview={false}/>
            </div>
            <div className="absolute top-28 right-0">
                <Image src={'/assets/background/Ellipse4.svg'} alt={'icon'} preview={false}/>
            </div>
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
                        <Input placeholder={'Masukan username'} size={'large'} className={'h-12 rounded-lg text-lg'}/>
                    </Form.Item>
                    <Form.Item name={'password'} className={'my-2'} label={label('Kata Sandi')} rules={[
                        {required: true, message: "Silahkan masukan kata sandi!"}
                    ]}>
                        <Input.Password placeholder={'Masukan password'} size={'large'} className={'h-12 rounded-lg text-lg'}/>
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


        // <Spin spinning={isLoading}>
        //     <div className={'flex flex-col items-center h-screen max-w-lg mx-auto'}>
        //         <div
        //             className={'flex justify-center items-center bg-cover bg-[url("/assets/background/BG2.svg")] bg-center h-3/5 rounded-b-3xl w-full z-10'}>
        //             <Image className={'w-32'} src={'/assets/logo/logo.png'} alt={'logo'} preview={false}/>
        //         </div>
        //         <Card className={'w-full h-4/5 -mt-10'}>
        //             <div className={'flex flex-col items-center mb-10 mt-8'}>
        //                 <h1 className={'text-xl font-bold'}>SELAMAT DATANG</h1>
        //                 <span className={'text-base text-center opacity-50'}>Masuk Untuk Mengelola Akun Anda</span>
        //             </div>
        //             <Form form={form} onFinish={handleSubmit} layout={'vertical'}>
        //                 <Form.Item name={'username'} label={label('Nama Pengguna')} rules={[{
        //                     required: true,
        //                     message: "Silahkan masukan nama pengguna!",
        //                     type: 'string',
        //                 }]}>
        //                     <Input placeholder={'Masukan username'}/>
        //                 </Form.Item>
        //                 <Form.Item name={'password'} label={label('Kata Sandi')} rules={[
        //                     {required: true, message: "Silahkan masukan kata sandi!"}
        //                 ]}>
        //                     <Input.Password placeholder={'Masukan password'}/>
        //                 </Form.Item>
        //                 <Form.Item>
        //                     {/*<Checkbox onChange={onChange}>Ingatkan saya</Checkbox>*/}
        //                     <Link href="/forgot_password">
        //                         <a className={'float-right text-black font-semibold'}>Lupa Kata Sandi?</a>
        //                     </Link>
        //                 </Form.Item>
        //                 <Form.Item className={'text-center pt-1.5'}>
        //                     <Button htmlType={'submit'} type={'primary'} className={'rounded-md mb-2'} size={'large'} block>Masuk</Button>
        //                     <span>Belum punya akun? <Link href={'/register'}>Registrasi</Link></span>
        //                 </Form.Item>
        //             </Form>
        //         </Card>
        //     </div>
        // </Spin>
    );
});

export default Login;
