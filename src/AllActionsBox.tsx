import './AllActionsBox.css';
import CategoryBox from './CategoryBox';
import {ActionsContext, ActionsContextType} from './ActionsContextProvider'
import React, {useContext} from 'react';

function AllActionsBox() {

    const {categories} = useContext(ActionsContext as React.Context<ActionsContextType>)
    return (
        <div className="all-actions-box">
            {
                categories.map(category => (
                    <CategoryBox key={category} categoryName={category} />
                ))
            }        
        </div>
    );
}

export default AllActionsBox;