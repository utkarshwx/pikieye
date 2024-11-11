import React from 'react'
import { Link } from 'react-router-dom'

const sizesButton = {
    vsmall: 'w-1/8',
    small: 'w-1/6',
    medium: 'w-1/4',
    large: 'w-1/3',
    xlarge: 'w-1/2'
}

const buttonType = {
    primary: 'border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white',
    secondary: 'bg-white text-blue-600',
    danger: 'bg-red-600 text-white hover:bg-red-700',
    invert: 'bg-blue-600 border-blue-600 text-white hover:bg-blue-200/25 hover:text-blue-600',
}

const textSize = {
    vsmall: 'text-xs',
    small: 'text-sm',
    medium: 'text-md',
    large: 'text-lg',
    xlarge: 'text-xl',
    xxlarge: 'text-2xl',
}


const Button = ({ title, size, navi, onClick, type, sizeText, disabled }) => {

    size = sizesButton[size];
    return (
        <div>
            <Link className={`text-md md:${textSize[sizeText]}`} to={navi}>
                <button className={` border-2 ${buttonType[type]} font-bold py-2 px-4 rounded-lg  transition duration-300 ease-in-out my-3 w-full md:${size}`}
                    onClick={onClick}
                    disabled={disabled}
                >{title}</button>
            </Link>
        </div>
    )
}

export default Button