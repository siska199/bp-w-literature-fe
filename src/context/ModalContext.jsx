import {useState, createContext} from 'react'

export const ModalContext = createContext()
export function ModalContextProvider(props){
    const [register, setRegister] = useState(false)
    const [login, setLogin] = useState(false)
    const value = {register, setRegister, login, setLogin}
    return(
        <ModalContext.Provider value={value}>
            {props.children}
        </ModalContext.Provider>
    )
}