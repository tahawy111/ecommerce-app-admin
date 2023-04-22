import { RootState } from '@/redux/store';
import { FC } from 'react';
import { useSelector } from 'react-redux';
import { BounceLoader } from 'react-spinners';

interface SpinnerProps {
    loading?: boolean;
}

const Spinner: FC<SpinnerProps> = ({ loading }) => {
    const { isLoading } = useSelector((state: RootState) => state.global);
    const myLoad = loading ? loading : isLoading;
    return <div
        className={`${myLoad ? "flex" : "hidden"
            } fixed w-full h-screen text-center justify-center items-center text-white top-0 left-0 z-[1]`}
        style={{ background: "#0007" }}
    >
        <BounceLoader color='#1e3a8a' speedMultiplier={2} />
    </div>;
};

export default Spinner;