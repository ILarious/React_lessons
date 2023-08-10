import React from 'react';
import './index.scss';
import {Success} from './components/Success';
import {Users} from './components/Users';

// Тут список пользователей: https://reqres.in/api/users

function App() {
    const [users, setUsers] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(true);
    const [searchValue, setSearchValue] = React.useState('');
    const [invites, setInvites] = React.useState([]);
    const [success, setSuccess] = React.useState(false);

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

    const onChangeSearchValue = (e) => {
        setSearchValue(e.target.value);
    }

    const onClickInvite = (id) => {
        if (invites.includes(id)) {
            setInvites((prev) => prev.filter((_id) => _id !== id));
        } else {
            setInvites((prev) => [...prev, id]);
        }
    }

    const onClickSendInvites = () => {
        setSuccess(true);
    }

    return (
        <div className="App">
            {success ? (
                    <Success count={invites.length}/>
                ) : (
                    <Users
                        invites={invites}
                        onClickInvite={onClickInvite}
                        onChangeSearchValue={onChangeSearchValue}
                        onClickSendInvites={onClickSendInvites}
                        searchValue={searchValue}
                        items={users}
                        isLoading={isLoading}
                    />)
            }
        </div>
    );
}

export default App;
