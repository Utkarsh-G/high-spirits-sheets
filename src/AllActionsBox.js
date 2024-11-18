import './AllActionsBox.css';
import CategoryBox from './CategoryBox';
import {ActionsContext} from './ActionsContextProvider'
import {useContext} from 'react';

function AllActionsBox() {

    //const [categories, _] = useState
    const {categories} = useContext(ActionsContext)
    return (
        <div className="all-actions-box">
            {
                categories.map(category => (
                    <CategoryBox name={category} />
                ))
            }        
        </div>
    );
}

export default AllActionsBox;