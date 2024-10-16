import React from 'react'
import { FiEdit } from "react-icons/fi"



const iconBtn = ({
    text,
    onclick,
    children,
    disabled,
    outline = false,
    customClasses,
    type,
}) => {
    return (
        <button className='flex items-center bg-black cursor-pointer gap-x-2 rounded-md py-2 text-sm md:text-lg px-3 md:px-5 font-semibold text-white undefined'
            disabled={disabled}
            onClick={onclick}
            type={type}>
            {
                children ? (
                    <>
                        <span>
                            {text}
                        </span>
                        {children}
                    </>
                ) : (text)
            }

        </button>
    )
}

export default iconBtn
