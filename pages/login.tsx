import Spinner from '@/components/Spinner';
import axios from 'axios';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { FC } from 'react';

interface LoginProps {

}

const Login: any = ({ }) => {
    const { data: session, status } = useSession();
    // console.log({ session, status });

    const router = useRouter();
    const handleLogin = async () => {
        try {
            const res = await axios.post('/api/auth/login', { ...session?.user, type: "login" });
            console.log(res.data);
        } catch (error) {
            console.log(error);
        }
    };

    if (session === undefined && status === "loading") {
        return <div className="flex w-full h-screen justify-center items-center">
            <Spinner loading />
        </div>;
    }

    if (session) {
        handleLogin();
        router.push('/');
        return;
    }

    return <div>
        <div className={`bg-bgGray w-screen h-screen flex items-center`}>
            <div className='text-center w-full'>
                <button onClick={() => signIn("google")} className='bg-gray-100 p-2 rounded-lg px-4 cursor-pointer hover:bg-gray-200 active:bg-gray-500 transition-colors duration-75'>Login with google</button>
            </div>
        </div>
    </div>;
};

export default Login;