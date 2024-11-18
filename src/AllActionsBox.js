import './AllActionsBox.css';
import CategoryBox from './CategoryBox';

function AllActionsBox({actions, handleRoll}) {
    return (
        <div className="all-actions-box">
            <CategoryBox actions={actions} handleRoll={handleRoll} />
        </div>
    );
}

export default AllActionsBox;