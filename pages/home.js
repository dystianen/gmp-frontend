import React from "react";
import DefaultLayout from "../components/Layout/DefaultLayout";
import {Button, Card, PageHeader} from "antd";
import {observer} from "mobx-react-lite";
import {useStore} from "../components/StoreProvider";

const Home = observer(() => {
    const store = useStore();
    return <div>
        <PageHeader
            style={{
            }}
            title={"Home"}
        >
        </PageHeader>
        <Card className={"flex text-gray-500"}>
            {store.sample.testObs} Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus aut recusandae velit! Consequatur corporis, eum fuga, harum incidunt laboriosam minus necessitatibus neque non nostrum pariatur tempore. Dignissimos impedit rem tempora!
            <Button onClick={() => {
                store.sample.setTestObs(store.sample.testObs + 1);
            }}>Increment</Button>
        </Card>
    </div>
});

Home.getLayout = function Layout(page) {
    return <DefaultLayout>
        {page}
    </DefaultLayout>;
};

export default Home;
