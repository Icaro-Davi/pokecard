import Image from "next/image";
import { FC } from "react";

import NavbarButtons from "./NavbarButtons";

import './style/mainNavbar.scss';

const MainNavbar: FC = props => {
    return (
        <nav className="main-navbar">
            <div className="main-navbar-logo">
                <Image
                    fill
                    priority
                    alt='page Logo'
                    src='/favicon.ico'
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
            </div>
            <NavbarButtons />
        </nav>
    );
}

export default MainNavbar;