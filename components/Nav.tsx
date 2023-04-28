import { cn } from '@/lib/utils';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FC, useEffect } from 'react';
import { UilStore, UilArchiveAlt, UilEstate, UilListUl, UilSetting, UilSignout } from '@iconscout/react-unicons';
import { signOut, useSession } from 'next-auth/react';
import Logo from './Logo';
import Spinner from './Spinner';

interface NavProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> {
    show: boolean;
}

const Nav: FC<NavProps> = ({ className, show, ...props }): any => {
    const { data: session, status } = useSession();
    const { pathname, push } = useRouter();
    const inActiveLink = "flex gap-1 p-1 items-center";
    const activeLink = `${inActiveLink} bg-highlight text-black rounded-sm`;
    const inActiveIcon = "w-6 h-6";
    const activeIcon = `${inActiveIcon} text-primary`;

    if (session === undefined && status === "loading") {
        return <div className="flex w-full h-screen justify-center items-center">
            <Spinner loading />
        </div>;
    }
    if (!session) {
        push('/login');
        return;
    };

    return <aside className={cn(`text-gray-500 p-4 fixed w-full bg-bgGray h-full ${show ? "left-0" : "-left-full"} md:static md:w-auto transition-all`, className)}  {...props}>
        <div className="mb-4 mr-4">
            <Logo />
        </div>
        <nav className='flex flex-col gap-2 overflow-auto'>
            <Link href={`/`} className={pathname === "/" ? activeLink : inActiveLink}>
                <UilEstate className={pathname === "/" ? activeIcon : inActiveIcon} />

                Dashboard
            </Link>
            <Link href={`/products`} className={pathname.includes("/products") ? activeLink : inActiveLink}>
                <UilArchiveAlt className={pathname.includes('/products') ? activeIcon : inActiveIcon} />
                Products
            </Link>
            <Link href={`/categories`} className={pathname.includes("/categories") ? activeLink : inActiveLink}>
                <UilListUl className={pathname.includes('/categories') ? activeIcon : inActiveIcon} />
                Categories
            </Link>
            <Link href={`/orders`} className={pathname.includes("/orders") ? activeLink : inActiveLink}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={pathname.includes('/orders') ? activeIcon : inActiveIcon}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 010 3.75H5.625a1.875 1.875 0 010-3.75z" />
                </svg>

                Orders
            </Link>
            <Link href={`/settings`} className={pathname.includes("/settings") ? activeLink : inActiveLink}>
                <UilSetting className={pathname.includes('/settings') ? activeIcon : inActiveIcon} />
                Settings
            </Link>
            <button onClick={() => signOut()} className={inActiveLink}>
                <UilSignout className='rotate-180' />
                Logout
            </button>
        </nav>
    </aside>;
};

export default Nav;