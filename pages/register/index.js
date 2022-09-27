import {Button, Card, Form, Image, Input, message, Spin} from "antd";
import {authenticationRepository} from "../../repository/authentication";
import {useRouter} from "next/router";
import Link from "next/link";
import {observer} from "mobx-react-lite";
import {useState} from "react";

const Register = observer(() => {
    const router = useRouter();
    const [form] = Form.useForm();
    const [isLoading, setIsLoading] = useState(false);

    const label = (text) => (
        <span className="font-bold">
            {text}
        </span>
    );

    const handleSubmit = async () => {
        try {
            const values = await form.validateFields();
            setIsLoading(true)

            const body = {
                username: values.username,
                password: values.password,
                email: values.email,
                phoneNumber: values.phoneNumber,
                referralCode: values.referralCode
            };

            await authenticationRepository.api.register(body);
            message.success('Register Successfully');
            await router.push('/login')
            setIsLoading(false)
        } catch (err) {
            console.log({err})
            setIsLoading(false)
            message.error(err.response.data.message);
        }
    };

    return (
        <Spin spinning={isLoading}>
            <div className={'flex flex-col items-center h-screen max-w-lg mx-auto'}>
                <div
                    className={'flex justify-center items-center bg-[url("/assets/background/BG.png")] bg-center h-3/5 w-full'}>
                    <Image className={'w-32'} src={'/assets/logo/logo.png'} preview={false}/>
                </div>
                <Card className={'w-full h-4/5 rounded-2xl -mt-10'}>
                    <div className={'flex flex-col items-center mb-10'}>
                        <h1 className={'text-xl font-bold'}>REGISTRASI</h1>
                        <span className={'text-base text-center opacity-50'}>Silahkan isi email aktif anda sebagai <br/> kode verifikasi</span>
                    </div>
                    <Form form={form} onFinish={handleSubmit} layout={'vertical'}>
                        <Form.Item name={'username'} label={label('Nama Pengguna')} rules={[{
                            required: true,
                            message: "Silahkan masukan nama pengguna!",
                        }]}>
                            <Input placeholder={'Masukan Nama Pengguna'}/>
                        </Form.Item>
                        <Form.Item name={'email'} label={label('Email')} rules={[
                            {
                                required: true,
                                message: "Silahkan masukan email!",
                            },
                            {
                                type: 'email',
                                message: 'Silahkan masukan email yang sah!'
                            }
                        ]}>
                            <Input placeholder={'Masukan Email'}/>
                        </Form.Item>
                        <Form.Item name={'password'} label={label('Kata Sandi')} rules={[
                            {required: true, message: "Silahkan masukan kata sandi!"},
                            {min: 8, message: "Kata sandi minimal 8 karakter"}
                        ]}>
                            <Input.Password placeholder={'Masukan Kata Sandi'}/>
                        </Form.Item>
                        <Form.Item name={'phoneNumber'} label={label('Nomor Telepon')} rules={[
                            {required: true, message: "Silahkan masukan nomor telepon!"},
                            {min: 10, max: 14, message: "Silahkan masukan nomor telepon yang sah!"},
                        ]}>
                            <Input type={"number"} placeholder={'Masukan Nomor Telepon'}/>
                        </Form.Item>
                        <Form.Item name={'referralCode'} label={label('Kode Rujukan')}>
                            <Input placeholder={'Masukan Kode Rujukan'}/>
                        </Form.Item>
                        <Form.Item className={'text-center pt-5'}>
                            <Button htmlType={'submit'} type={'primary'} className={'rounded-md mb-2'} size={'large'}
                                    block>Buat Akun</Button>
                            <span>Sudah punya akun? <Link href={'/login'}>Masuk</Link></span>
                        </Form.Item>
                    </Form>
                </Card>
            </div>
        </Spin>
    )
});

export default Register;