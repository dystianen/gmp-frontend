import { Card } from "antd";
import { observer } from "mobx-react-lite";
import DesktopLayout from "../../components/Layout/DesktopLayout/DesktopLayout";
import { Header } from "../../components/Reusable/Header";

const TermsAndCondition = observer(() => {

    const content = [
        {
            no: 1,
            title: 'Lorem',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        },
        {
            no: 2,
            title: 'Ipsum',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        },
        {
            no: 3,
            title: 'Dollor',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        }
    ]
    return (
        <>
        <Header title={'Syarat & Ketentuan'}/>
        <div className="flex flex-col mx-8 my-4">
            {content?.map((value, index) => (
                <div key={index} className="flex">
                    <p className="pr-1 text-sm font-semibold">{value?.no}.</p>
                    <div className="flex flex-col">
                        <p className="mb-1 text-sm font-semibold">{value?.title}</p>
                        <p className="text-xs">{value?.description}</p>
                    </div>
                </div>
            ))}
            <div className="h-20"></div>
        </div>
        </>
    )
});

TermsAndCondition.getLayout = function Layout(page) {
    return <DesktopLayout>{page}</DesktopLayout>
}
export default TermsAndCondition;