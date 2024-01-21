import { useHistory } from "react-router-dom";

function navButtons() {
    const history = useHistory()

    return (

        <div>
            <button onClick={() => history(-1)}>Back</button>
            |
            <button onClick={() => history('/')}>Home</button>
        </div>
    )
}

export default navButtons