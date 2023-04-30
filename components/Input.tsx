import { FC, useId } from 'react';

interface InputProps extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
    placeholder: string;
}

const Input: FC<InputProps> = ({ placeholder, ...props }) => {
    const inputId = useId();
    return <div className=''>
        <label htmlFor={inputId}>{placeholder}</label>
        <input id={inputId} placeholder={placeholder} {...props} />
    </div>;
};

export default Input;