import * as React from 'react';
import './App.scss';
import {
    getUsers
} from '../utils/user.service';
import { AxiosResponse } from 'axios';
import { User } from '../interfaces/user.interface';
import Users from './Users';

const App = () => {

    const [ users, setUsers ] = React.useState<User[]>([]);

    const [ open, setOpen ] = React.useState<boolean>(false);

    const getUser = () => {
        getUsers().then((res: AxiosResponse<User[]>) => {
            console.log(res);
            if(res.status === 200) {
                setUsers(res.data)
            }
        })
    }

    const handleOpenModal = () => {
        setOpen(true);
    }

    const onCloseModal = () => {
        setOpen(false);
    }

    return (
        <div className='container'>

            <div>
                <button onClick={getUser}>Get users</button>
            </div>

            <div className='user-container'>
                {users && users.map((user: User) => (
                    <div key={user.id} className='user-row'>{user.name}</div>
                ))}
            </div>
                
            <div>
                <button className='open-modal-button' onClick={handleOpenModal}>Open modal</button>
            </div>

            {open && <Users handleClose={onCloseModal}/>}
        </div>
    )
}

export default App;
