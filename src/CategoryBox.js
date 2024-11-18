import ActionBox from './ActionBox';
import './CategoryBox.css';
function CategoryBox({actions, handleRoll}) {
    return (
        <div className="category-box">
            <div className="category-box-name">Attacks</div>
            {Object.keys(actions).map(name => (
                <ActionBox 
                    key={name}
                    name={name} 
                    rollResult={actions[name]}
                    onRoll={() => handleRoll(name)}
                />
            ))}
        </div>
    );
}

export default CategoryBox;