import { FC } from "react";

import SearchSkeleton from "../feature/SearchPokemon/component/skeleton";

const Loading: FC = props => (
    <div style={{ display: 'flex', alignItems: 'center', flex: 1, flexFlow: 'column', marginTop: 30 }}>
       <SearchSkeleton />
    </div>
);

export default Loading;