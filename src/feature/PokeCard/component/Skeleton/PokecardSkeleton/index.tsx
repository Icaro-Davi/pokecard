import { FC } from 'react'

import './style/pokecardSkeleton.scss';

const PokecardSkeleton: FC = (props) => (
    <div className='pokecard-skeleton skeleton'>
        <div className='title'/>
        <div className='image' />
        <div className='type' />
        <div className='description' />
        <div className='info' />
    </div>
)

export default PokecardSkeleton;