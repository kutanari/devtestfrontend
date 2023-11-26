import PageContainer from "../PageContainer";
import { useContext } from "react";
import UserContext from "../../Context/UserContext";

const UserCreate: React.FC = () => {
    const { formData, onChange, storeUser, errors } = useContext(UserContext);
    
    return (
        <PageContainer>
            <div className="rounded-t mb-0 px-4 py-3 border-0">
                <div className="flex flex-wrap items-center">
                    <div className="relative w-full max-w-full flex-grow flex-1">
                        <h3 className="font-semibold text-base text-blueGray-700">
                            Add new user
                        </h3>
                    </div>
                </div>
            </div>

            <div className="block w-full overflow-x-auto">
                <form onSubmit={storeUser} method="POST" className="p-4">
                    <div className="mb-5">
                        <label htmlFor="name" className="mb-3 block text-base font-medium text-[#07074D]" >
                            Name
                        </label>
                        <input
                            required
                            type="text"
                            id="name"
                            name="name"
                            value={formData["name"]}
                            onChange={onChange}
                            aria-invalid={errors.name ? "true" : "false"}
                            placeholder="Full Name"
                            className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md aria-[invalid=true]:border-red-500"
                        />
                        {errors.name && <span className="text-red-500">{ errors.name[0] }</span>}
                    </div>
                    <div className="mb-5">
                        <label htmlFor="email" className="mb-3 block text-base font-medium text-[#07074D]" >
                            Email Address
                        </label>
                        <input
                            required
                            type="email"
                            id="email"
                            name="email"
                            value={formData["email"]}
                            onChange={onChange}
                            aria-invalid={errors.email ? "true" : "false"}
                            placeholder="example@domain.com"
                            className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md aria-[invalid=true]:border-red-500"
                        />
                        {errors.email && <span className="text-red-500">{ errors.email[0] }</span>}
                    </div>
                    <div className="flex justify-end">
                        <button type="submit" className="hover:shadow-form rounded-md bg-[#6A64F1] py-3 px-8 text-base font-semibold text-white outline-none">
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </PageContainer>
    );
};

export default UserCreate;
