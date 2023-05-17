'use client';
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FC, memo } from "react";

const RouterButtons: {
    href: string;
    name: string;
    testCurrentPath?(pathname: string): boolean;
}[] = [
        {
            href: '/',
            name: 'Home'
        }
    ];

const NavbarButtons: FC = props => {
    const pathname = usePathname();
    return (
        <ul>
            {RouterButtons.map((route, i) => {
                const liClassName: string[] = [];
                const isCurrentPathname = route.testCurrentPath?.(pathname) ?? pathname === route.href;
                (isCurrentPathname) && liClassName.push('main-navbar-active-route');
                return (
                    <li
                        key={`navbar-button-${i}`}
                        className={liClassName.join(' ')}
                    >
                        <Link href={route.href}>{route.name}</Link>
                    </li>
                );
            })}
        </ul>
    );
}
export default memo(NavbarButtons);