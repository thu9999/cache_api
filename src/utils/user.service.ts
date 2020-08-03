import http from './http.service';
import { AxiosResponse } from 'axios';
import { User } from '../interfaces/user.interface';

/**
 * Cache api request
 * Chỉ cache GET request và với những request với data ít biến động như dánh sách quốc gia, thành phố....
 */
const cache = new Map();

/**
 * Get list of users
 */
const getUsers = () => {
    const URL = 'users';
    if(cache.has(URL)) {
        return Promise.resolve(cache.get(URL));
    } else {
        return http.get(URL).then(
            (res: AxiosResponse<User[]>) => {
                cache.set(URL, res);
                return Promise.resolve(res);
            }
        )
    }
}

export {
    getUsers
}