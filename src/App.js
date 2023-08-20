import React from 'react';
import {Block} from './Block';
import './index.scss';

function App() {
    const [rates, setRates] = React.useState({});

    React.useEffect(() => {
        fetch('https://cdn.cur.su/api/latest.json')
            .then((response) => response.json())
            .then((json) => {
                setRates(json.rates);
            })
            .catch((error) => {
                console.warn(error);
                alert('Не удалось получить информацию о валютах');
            });
    }, []);

    return (
        <div className="App">
            <Block value={0} currency="RUB" onChangeCurrency={(cur) => console.log(cur)}/>
            <Block value={0} currency="USD"/>
        </div>
    );
}

export default App;
