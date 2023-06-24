import React, { useContext, useEffect, useState, FC } from 'react'

import { PromptContext } from 'PromptContext'

import './style/prompt.scss'

const Prompt: FC = () => {
    const [{ isOpen, title, value, onSubmit }, setPrompt] =
        useContext(PromptContext)
    const [input, setInput] = useState('')

    const close = () => setPrompt(s => ({ ...s, isOpen: false }))

    useEffect(() => {
        setInput(value)
    }, [isOpen, value])

    return (
        <div className='prompt' style={{ display: isOpen ? '' : 'none' }}>
            <span className='title'>{title}</span>
            <textarea
                value={input}
                onChange={e => setInput(e.currentTarget.value)}
            />
            <div className='actions'>
                <button
                    style={{ borderColor: 'var(--base-red)' }}
                    onClick={close}
                >
                    Cancel
                </button>
                <button
                    style={{ borderColor: 'var(--base-green)' }}
                    onClick={() => {
                        onSubmit(input)
                        close()
                    }}
                >
                    Submit
                </button>
            </div>
        </div>
    )
}

export { Prompt }
