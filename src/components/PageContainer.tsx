import React from "react";

interface ConteinerProps {
    children: React.ReactNode;
}

const PageContainer: React.FC<ConteinerProps> = ({ children }) => {
    return (
        <>
            <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4 mx-auto mt-24">
                <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded ">
                    {children}
                </div>
            </div>
        </>
    );
}

export default PageContainer;