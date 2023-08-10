import React from 'react';
import './index.scss';
import {Success} from './components/Success';
import {Users} from './components/Users';

// Тут список пользователей: https://reqres.in/api/users

function App() {
    const [users, setUsers] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(true);

    React.useEffect(() => {
        fetch('https://reqres.in/api/users')
            .then((response) => response.json())
            .then((json) => {
                setUsers(json.data);
            }).catch(error => {
                console.warn(error);
                alert('Ошибка при получении списка пользователей');
            }).finally(() => {
                setIsLoading(false);
            })
    }, []);

    return (
        <div className="App">
            <Users items={users} isLoading={isLoading}/>
            {/* <Success /> */}
        </div>
    );
}

export default App;
