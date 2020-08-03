import * as React from 'react';
import './Users.scss';
import {
    getUsers
} from '../utils/user.service';
import { AxiosResponse } from 'axios';
import { User } from '../interfaces/user.interface';

interface UserProps {
    handleClose(): void
}

// Use smart component to demonstrate cache api

const Users = (props: UserProps) => {

    const { handleClose } = props;

    const [ users, setUsers ] = React.useState<User[]>([]);

    const handleClick = (e: any) => {

        let close: boolean = true;

        e.path && e.path.forEach((path: any) => {
            let classList: any[] = [];
            if(path.classList) {
                classList = Array.from(path.classList);
            }

            classList && classList.forEach((cl: string) => {
                if(cl === 'user-modal-content') {
                    close = false;
                }
            })
        });

        if(close) {
            handleClose();
        }
    };

    React.useEffect(() => {
        getUsers().then((res: AxiosResponse<User[]>) => {
            console.log(res);
            if(res.status === 200) {
                setUsers(res.data);
            }
        });

        document.addEventListener('click', handleClick);

        return () => {
            document.removeEventListener('click', handleClick);
        }

    }, []);
    

    return (
        <div className='user-modal'>
            <div className='user-modal-content'>
                <div className='user-container'>
                    {users && users.map((user: User) => (
                        <div key={user.id} className='user-row'>{user.name}</div>
                    ))}
                </div>
            </div>
        </div>

    )
}

export default Users;
