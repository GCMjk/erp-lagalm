import { createContext } from 'react';
import { User as IUser } from '@gql';


interface ContextProps {
    isLoggedIn: boolean;
    user?: IUser;

    //loginUser: (email: string, password: string) => Promise<boolean>;
    //registerUser: (name: string, email: string, password: string) => Promise<{ hasError: boolean; message?: string; }>;
}

export const AuthContext = createContext({} as ContextProps);
