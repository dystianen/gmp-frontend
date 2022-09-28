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
        <span className="font-semibold text-sm">
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
            <div
                className={'relative flex-col flex justify-center bg-[url("/assets/background/new-background.png")] bg-cover bg-center min-h-full max-w-lg mx-auto rounded-t'}>
                <div className={'absolute top-6 left-6'}>
                    <Image src={'/assets/logo/logogmp.svg'} alt={'icon'} preview={false}/>
                </div>
                <p className={'text-2xl font-bold text-white text-center mt-20'}>Daftar</p>
                <Card className={'mx-6 rounded-xl mb-20'}>
                    <Form form={form} onFinish={handleSubmit} layout={'vertical'}>
                        <Form.Item name={'username'} label={label('Nama Pengguna')} rules={[{
                        required: true,
                        message: "Silahkan masukan nama pengguna!",
                    }]}>
                        <Input placeholder={'Masukan Nama Pengguna'} size={'middle'} className={'h-12 rounded-lg text-sm'}/>
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
                        <Input placeholder={'Masukan Email'} size={'middle'} className={'h-12 rounded-lg text-sm'}/>
                    </Form.Item>
                    <Form.Item name={'password'} label={label('Kata Sandi')} rules={[
                        {required: true, message: "Silahkan masukan kata sandi!"},
                        {min: 8, message: "Kata sandi minimal 8 karakter"}
                    ]}>
                        <Input.Password placeholder={'Masukan Kata Sandi'} size={'middle'} className={'h-12 rounded-lg text-sm'}/>
                    </Form.Item>
                    <Form.Item name={'phoneNumber'} label={label('Nomor Telepon')} rules={[
                        {required: true, message: "Silahkan masukan nomor telepon!"},
                        {min: 10, max: 14, message: "Silahkan masukan nomor telepon yang sah!"},
                    ]}>
                        <Input type={"number"} placeholder={'Masukan Nomor Telepon'} size={'middle'} className={'h-12 rounded-lg text-sm'}/>
                    </Form.Item>
                    <Form.Item name={'referralCode'} label={label('Kode Rujukan')}>
                        <Input placeholder={'Masukan Kode Rujukan'} size={'middle'} className={'h-12 rounded-lg text-sm'}/>
                    </Form.Item>
                    <p className="text-sm font-normal">Dengan mendaftar anda menyetujui semua<br/><Link href={'#'}><a className="font-medium text-black">Syarat & Ketentuan</a></Link></p>
                    <Form.Item className={'text-center pt-2'}>
                        <Button htmlType={'submit'} type={'primary'} className={'rounded-3xl h-[48px] bg-[#FFBF00] border-none mb-2 text-base'} size={'large'} block>Daftar</Button>
                        <span className={'text-sm font-semibold'}>Sudah punya akun? <Link href={'/login'}><a className={'text-[#FFBF00]'}>Masuk</a></Link></span>
                     </Form.Item>
                    </Form>
                </Card>
            </div>
        </Spin>
    )
});

export default Register;