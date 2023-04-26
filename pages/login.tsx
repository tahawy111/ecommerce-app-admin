import { signIn, useSession } from 'next-auth/react';
import { FC } from 'react';

interface LoginProps {

}

const Login: FC<LoginProps> = ({ }) => {
    const { data: session, status } = useSession();
    console.log({ data: session, status });

    const loginHandler = () => {
        signIn("google");
        
    };

    return <div>
        <div className={`bg-bgGray w-screen h-screen flex items-center`}>
            <div className='text-center w-full'>
                <button onClick={loginHandler} className='bg-gray-100 p-2 rounded-lg px-4 cursor-pointer hover:bg-gray-200 active:bg-gray-500 transition-colors duration-75'>Login with google</button>
            </div>
        </div>
    </div>;
};

export default Login;