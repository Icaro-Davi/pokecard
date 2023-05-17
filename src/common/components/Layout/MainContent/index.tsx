import { DetailedHTMLProps, FC, HTMLAttributes, ReactNode } from "react";

import './style/MainContent.scss';

interface MainContentProps extends DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> {
    children: ReactNode
}

const MainContent: FC<MainContentProps> = props => (
    <main {...props} className={props.className?.concat(" main-content") ?? "main-content"}>{props.children}</main>
);

export default MainContent;