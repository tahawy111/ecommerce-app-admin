import { UilStore } from '@iconscout/react-unicons';
import Link from 'next/link';
import { FC } from 'react';

interface LogoProps {

}

const Logo: FC<LogoProps> = ({ }) => {
    return <Link href={'/'} className="flex gap-1">
        <UilStore />
        <span className="">
            EcommerceAdmin
        </span>
    </Link>;
};

export default Logo;