import { Outlet } from "react-router";
import Nav from "./Nav";

const Layout = () => {
    return (
        <>
            <Nav />
            <main>
                <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
                    <Outlet />
                </div>
            </main>
        </>
    );
};

export default Layout;
