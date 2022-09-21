import React, {useState} from "react";
import {Avatar, Button, Form, Image, Input, message, Modal, Upload} from "antd";
import {observer} from "mobx-react-lite"
import {useRouter} from "next/router";
import {appConfig} from "../../../../config/app";
import {imageRepository} from "../../../../repository/image";
import {userRepository} from "../../../../repository/users";
import {BiArrowBack} from "react-icons/bi";
import DesktopLayout from "../../../../components/Layout/DesktopLayout/DesktopLayout";
import {CloseOutlined} from "@ant-design/icons";

const UpdateProfile = observer(() => {
    const [form] = Form.useForm();
    const router = useRouter();
    const {id} = router.query;
    const [isLoading, setIsLoading] = useState(false)
    const [fileList, setFileList] = useState();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const {data: userData} = userRepository.hooks.useGetProfile();

    form.setFieldsValue({
        username: userData?.data?.username,
        email: userData?.data?.email,
        phoneNumber: userData?.data?.phoneNumber,
    })

    const label = (text) => (
        <span className="font-bold">
            {text}
        </span>
    );

    const imageHandler = async (args) => {
        try {
            const file = args.file;
            const processUpload = await imageRepository.api.upload(file);
            setFileList([
                {
                    url: appConfig.apiUrl + "/users/detail/" + processUpload.data.filename,
                    name: 'file'
                }
            ])
        } catch (e) {
            console.log(e)
        }
    };

    const handleSubmit = async () => {
        try {
            const values = await form.validateFields();

            const data = {
                username: values.username,
                email: values.email,
                phoneNumber: values.phoneNumber,
                // picProfile: fileList[0].url,
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
            <Modal open={isModalOpen} onCancel={() => setIsModalOpen(false)} footer={null}>
                <div className={'flex flex-col items-center gap-4 w-full'}>
                    <h1 className={'text-lg font-bold'}>Ubah Foto</h1>

                    <div className={'flex flex-row gap-4'}>
                        <Upload
                            name="picPicture"
                            onChange={(args) => imageHandler(args)}
                            fileList={fileList}
                            beforeUpload={() => false}
                            onRemove={() => setFileList([])}
                            maxCount={1}
                            onPreview={() => false}
                        >
                            <Button
                                className={'h-[51px] px-5 rounded-full bg-[#FFBF00]/[0.1] text-[#FFBF00] text-base font-semibold border-none'}
                            >
                                Pilih Foto Baru
                            </Button>
                        </Upload>
                        <Button
                            className={'h-[51px] px-5 rounded-full bg-[#F03636]/[0.1] text-[#F03636] text-base font-semibold border-none'}
                        >
                            Hapus Foto
                        </Button>
                    </div>
                </div>
            </Modal>

            <div className={'relative h-screen'}>
                <div
                    className={'relative flex justify-center items-center bg-primary bg-center h-1/5 w-full rounded-t'}>
                    <div className={'flex flex-row items-center w-5/6 z-10'}>
                        <Button className={'flex justify-center items-center rounded-lg p-0 h-10 w-12'}
                                onClick={() => router.push('/investment_package')}>
                            <CloseOutlined className={'text-lg'}/>
                        </Button>
                        <span className={'w-full text-2xl font-bold text-white text-center pr-12'}>Profil</span>
                    </div>
                    <div className="absolute">
                        <Image src={'/assets/background/Particle1.png'} preview={false}/>
                    </div>
                    <div className="absolute top-0 left-0">
                        <Image src={'/assets/background/BGYellowTop.svg'} preview={false}/>
                    </div>
                    <div className="absolute bottom-0 right-0 mt-10">
                        <Image className={'-mb-[6px]'} src={'/assets/background/BGYellowBot.svg'} preview={false}/>
                    </div>
                </div>

                <div className={'px-8 h-4/5'}>
                    <div className={'flex flex-col justify-center items-center pb-5'}>
                        <Avatar size={100} className={'border-8 border-gray-50 bg-white -mt-[40px] mb-2'}
                                src="https://joeschmoe.io/api/v1/random"/>
                        <Button
                            className={'h-[37px] rounded-full bg-[#FFBF00]/[0.1] text-[#FFBF00] text-sm font-semibold border-none'}
                            onClick={() => setIsModalOpen(true)}
                        >
                            Ubah Foto
                        </Button>
                    </div>
                    <Form form={form}>
                        <Form.Item label={label('Username')} name={'username'}>
                            <Input className={'h-[50px] rounded-lg'}/>
                        </Form.Item>
                        <Form.Item label={label('Email')} name={'email'}>
                            <Input className={'h-[50px] rounded-lg'}/>
                        </Form.Item>
                        <Form.Item label={label('Nomor Telepon')} name={'phoneNumber'}>
                            <Input className={'h-[50px] rounded-lg'}/>
                        </Form.Item>
                    </Form>

                    <div
                        className="max-w-md mx-auto rounded-b-lg fixed drop-shadow-2xl h-20 inset-x-0 bottom-0 z-10 px-5">
                        <Button
                            onClick={handleSubmit}
                            block
                            className={'relative h-14 rounded-full bg-[#FFBF00] text-white text-lg font-semibold border-none'}
                        >
                            Simpan
                        </Button>
                    </div>
                </div>
            </div>
        </>
    )
})

UpdateProfile.getLayout = function Layout(page) {
    return <DesktopLayout bottomNavigation={false}>{page}</DesktopLayout>
}
export default UpdateProfile;