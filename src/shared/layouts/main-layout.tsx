import { Stack } from "@mantine/core";
import { Header } from "../../components/header/header";
import { Outlet } from "react-router-dom";
import { Footer } from "../../components/footer";

const MainLayout = () => {
    return (
        <Stack justify="space-between" h={'100vh'}>
            <Header />
            <Outlet />
            <Footer />
        </Stack>
    )
}

export default MainLayout;