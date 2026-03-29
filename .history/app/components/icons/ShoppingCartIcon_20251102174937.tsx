import * as React from 'react';

interface Props {
    className?: string;
    fill?: string | '#000000';
}

const ShoppingCartIcon: React.FC<Props> = ({ className, fill }) => (
    <svg
    className={className}
    fill="none"
    viewBox="0 0 32 32"
    xmlns="http://www.w3.org/2000/svg"
    >
    <defs>
        <clipPath id="clip-shoppingcart">
        <rect width="32" height="32" />
        </clipPath>
    </defs>
    <g clipPath="url(#clip-shoppingcart)">
        <path d="M28.6,264.583H9.979a1,1,0,0,0-1-1H3.4a1,1,0,1,0,0,2h2.31a1.071,1.071,0,0,0-.011.126l1.274,10.052a3.573,3.573,0,0,0-.74,2.177,3.65,3.65,0,0,0,3.646,3.645H28.209a1,1,0,1,0,0-2H9.875a1.64,1.64,0,0,1-1.433-.852l20.3-2.76a1,1,0,0,0,.865-.992v-9.4A1,1,0,0,0,28.6,264.583Zm-1,9.523-18.51,2.517-1.272-10.04H27.6Z" fill="#344952" transform="translate(0 -260)" />
        <path d="M10.4,282a3.208,3.208,0,1,0,3.208,3.208A3.212,3.212,0,0,0,10.4,282Zm0,4.417a1.208,1.208,0,1,1,1.208-1.209A1.209,1.209,0,0,1,10.4,286.417Z" fill={fill} transform="translate(0 -260)" />
        <path d="M26.4,282a3.208,3.208,0,1,0,3.208,3.208A3.212,3.212,0,0,0,26.4,282Zm0,4.417a1.208,1.208,0,1,1,1.208-1.209A1.21,1.21,0,0,1,26.4,286.417Z" fill={fill} transform="translate(0 -260)" />
    </g>
    </svg>
);

export default ShoppingCartIcon;