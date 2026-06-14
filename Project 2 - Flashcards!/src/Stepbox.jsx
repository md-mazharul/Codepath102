import { useState } from 'react';

function StepBox({ question, answer }) {
    const [flipped, setFlipped] = useState(false);

    return (
        <div className="card-container" onClick={() => setFlipped(!flipped)}>
            <div className={`card ${flipped ? 'flipped' : ''}`}>
                <div className="card-front">{question}</div>
                <div className="card-back">{answer}</div>
            </div>
        </div>
    );
}

export default StepBox;