import {createContext, useState} from 'react'

export const UserContext = createContext()
export function UserContextProvider(props){
    
    const [dataUser, setDataUser] = useState({
        isLogin:false,
        status :'no user'
    })
    return(
        <UserContext.Provider value={{dataUser, setDataUser}}>
            {props.children}
        </UserContext.Provider>
    )
}