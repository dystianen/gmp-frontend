import { Button, Card, Form, Image, Input, message, Spin } from "antd";
import { observer } from "mobx-react-lite"
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { userRepository } from "../../../../repository/users";

const UpdateProfile = observer(() => {
    const [isLoading, setIsLoading] = useState(false)
    const [form] = Form.useForm();
    const router = useRouter();
    const { id } = router.query;

    const label = (text) => (
        <span className="font-bold">
            {text}
        </span>
    )

    const handleSubmit = async () => {
        try {
            const values = await form.validateFields();
            
            const data = {
                username: values.username,
                email: values.email,
                picProfile: values.picProfile,
            }
            
            await userRepository.api.updateProfile(id, data);
            message.success('update Successfully');
            setIsLoading(true)
            await router.push('/profile')
            setIsLoading(false)
        } catch (err) {
            console.log({err})
            setIsLoading(false)
            message.error(err.response.data.message[0]);
        }
    };

    return (
        <>
            {/* <Spin> */}
            <div className={'flex flex-col items-center h-screen max-w-lg mx-auto'}>
                <div className={'flex justify-center items-center bg-[url("/assets/background/BG.png")] bg-center h-3/5 w-full'}>
                    <Image className={'w-32'} src={'/assets/logo/logo.png'} preview={false}/>
                </div>
                <Card className={'w-full h-4/5 rounded-2xl -mt-10'}>
                    <div className={'flex flex-col items-center mb-10'}>
                        <h1 className={'text-xl font-bold'}>Edit Profile</h1>
                    </div>
                    <Form form={form} onFinish={handleSubmit} layout={'vertical'}>
                        <Form.Item name={'username'} label={label('Username')} rules={[{
                            required: true,
                            message: "Please input Username!",
                        }]}>
                            <Input placeholder={'Masukan username'}/>
                        </Form.Item>
                        <Form.Item name={'email'} label={label('Email')} rules={[{
                            required: true,
                            message: "Please input Email!",
                        }]}>
                            <Input placeholder={'Masukan email'}/>
                        </Form.Item>
                        <Form.Item className={'text-center pt-5'}>
                            <Button htmlType={'submit'} type={'primary'} className={'rounded-md'} size={'large'} block>Simpan</Button>
                        </Form.Item>
                        <Form.Item className={'text-center'}>
                            <Button onClick={() => router.back()} htmlType={'submit'} className={'rounded-md mb-2 bg-[#ffc53d] text-white'} size={'large'} block>Batal</Button>
                        </Form.Item>
                    </Form>
                </Card>
            </div>
        {/* </Spin> */}
        </>
    )
})
export default UpdateProfile;