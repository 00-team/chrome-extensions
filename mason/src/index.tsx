import React, { FC, StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import { Prompt } from 'components'

import App from './App'
import { PromptContextProvider } from './PromptContext'

const Root: FC = () => {
    return (
        <StrictMode>
            <PromptContextProvider>
                <App />
                <Prompt />
            </PromptContextProvider>
        </StrictMode>
    )
}

createRoot(document.getElementById('root')!).render(<Root />)
