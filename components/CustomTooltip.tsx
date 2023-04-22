import { FC, ReactNode } from 'react';

interface TooltipProps {
    children: ReactNode;
    title: string;
    position?: "top" | "bottom" | "left" | "right";
}

const Tooltip: FC<TooltipProps> = ({ children, title, position }) => {
    return <div className='relative cursor-pointer group w-fit'>
        <div>{children}</div>
        <span className={`absolute hidden group-hover:inline-block bg-neutral-900/90 text-white text-xs p-1 whitespace-nowrap rounded ${position === "top" ? 'left-1/2 -translate-x-1/2 bottom-full' : position === "bottom" ? "left-1/2 -translate-x-1/2 top-full" :  position === "left" ? "top-1/2 -translate-y-1/2 right-full" : position === "right" ? "top-1/2 -translate-y-1/2 left-[calc(100%+5px)]" : "left-1/2 -translate-x-1/2 bottom-full"}`}>{title}</span>
    </div>;
};

export default Tooltip;