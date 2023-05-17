import { FC, Fragment } from "react";

const SearchSkeleton: FC = () => (
    <Fragment>
        <div className="skeleton skeleton-padding skeleton-row-spacing" style={{ width: '100%', maxWidth: 280, aspectRatio: 5 / 2, borderRadius: 5 }} >
            <div style={{ width: '100%', height: '100%' }} />
        </div>
        <div className="skeleton skeleton-padding" style={{ width: '100%', maxWidth: 500, height: 40, marginTop: '.8rem', borderRadius: 5 }}>
            <div style={{ width: '100%', height: '100%' }} />
        </div>
        <div className="skeleton skeleton-padding" style={{ width: '100%', maxWidth: 280, height: 40, marginTop: '.8rem', borderRadius: 5 }}>
            <div style={{ width: '100%', height: '100%' }} />
        </div>
    </Fragment>
);

export default SearchSkeleton;