import MainContent from "@/src/common/components/Layout/MainContent";
import { FC, ReactNode } from "react";

const Layout: FC<{ children: ReactNode }> = props => {
    return (
        <MainContent style={{ alignItems: 'center', justifyContent: 'center' }}>
            {props.children}
        </MainContent>
    )
}

export default Layout;