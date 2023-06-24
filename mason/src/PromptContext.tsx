import React, {
    createContext,
    useState,
    Dispatch,
    SetStateAction,
    FC,
    ReactNode,
} from 'react'

type PCValue = {
    isOpen: boolean
    title: string
    value: string
    onSubmit: (input: string) => void
}

type SetPCValue = Dispatch<SetStateAction<PCValue>>

const defaultValue: PCValue = {
    isOpen: false,
    title: '',
    value: '',
    onSubmit: () => {},
}

const PromptContext = createContext<[PCValue, SetPCValue]>([
    defaultValue,
    () => {},
])

const PromptContextProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const [prompt, setPrompt] = useState<PCValue>(defaultValue)

    return (
        <PromptContext.Provider value={[prompt, setPrompt]}>
            {children}
        </PromptContext.Provider>
    )
}
export { PromptContextProvider, PromptContext }
