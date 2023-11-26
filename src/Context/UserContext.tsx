import axios, { AxiosResponse } from "axios";
import React, { ReactNode, createContext } from "react";
import { useNavigate } from "react-router-dom";

type User = {
    id: number;
    name: string;
    email: string;
};

type UserContextProps = {
    users: User[];
    storeUser: (e: Event) => Promise<User | undefined>;
    errors: object;
    setErrors: React.Dispatch<React.SetStateAction<object>>;
    formData: object;
    getUsers: () => Promise<User[] | null>;
    setFormData: object;
    getUser: (id: number) => Promise<User | null>;
    updateUser: (e: Event) => Promise<User | undefined>;
    deleteUser: (id: number) => void;
    onChange: (e: Event) => void;
    user: User | undefined;
};

const env = import.meta.env;
axios.defaults.baseURL = env.VITE_API_BASE_URL + "/api/" + env.VITE_API_VERSION;

const UserContext = createContext<UserContextProps | undefined>(undefined);
const initialFormData = {
    name: "",
    email: "",
}
export const UserProvider: React.FC<{ children: ReactNode }> = ({
    children,
}) => {
    const [users, setUsers] = React.useState<User[]>([]);
    const [user, setUser] = React.useState<User>();
    const [formData, setFormData] = React.useState<object>(initialFormData);
    const [errors, setErrors] = React.useState<object>({});
    const navigate = useNavigate();

    const getUsers = async (): Promise<User[] | null> => {
        try {
            const response: AxiosResponse = await axios.get<User[]>("/users");
            const userData: User[] = response.data.data;
            setUsers(userData);
            return userData;
        } catch (error) {
            console.error("Error fetching user data", error);
            return null;
        }
    };

    const onChange = (e: Event) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const storeUser = async (e: Event): Promise<User | undefined> => {
        e.preventDefault();
        try {
            const response: AxiosResponse = await axios.post<User>("/users", formData);
            const userData: User = response.data.data;

            setFormData(initialFormData);
            navigate("/users");
            return userData;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                setErrors(error?.response?.data.errors);
            } else {
                console.error("Error", error);
            }
        }
    };

    const getUser = async (id: number): Promise<User | null> => {
        try {
            const response: AxiosResponse = await axios.get<User>(
                "/users/" + id
            );
            const userData: User = response.data.data;
            setFormData({
                name: userData.name,
                email: userData.email,
            });
            setUser(userData);
            return userData;
        } catch (error) {
            console.error("Error fetching user data", error);
            return null;
        }
    };

    const updateUser = async (e: Event): Promise<User | undefined> => {
        e.preventDefault();
        try {
            const response: AxiosResponse = await axios.put<User>("/users/" + user?.id, formData);
            const userData: User = response.data.data;
            setFormData(initialFormData);
            navigate("/users");
            return userData;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                setErrors(error?.response?.data.errors);
            } else {
                console.error("Error", error);
            }
        }
    };

    const deleteUser = async (id: number) => {
        await axios.delete("/users/" + id);
        getUsers();
    };

    return (
        <UserContext.Provider
            value={{
                users,
                getUsers,
                storeUser,
                formData,
                setFormData,
                onChange,
                errors,
                setErrors,
                getUser,
                user,
                updateUser,
                deleteUser
            }}
        >
            {children}
        </UserContext.Provider>
    );
};

export default UserContext;
