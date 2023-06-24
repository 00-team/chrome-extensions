import React, { CSSProperties, FC, useEffect, useState } from 'react'

import './style/header.scss'

const Header: FC = () => {
    const [Actions, setActions] = useState(false)

    useEffect(() => {
        document.title = 'Mason'
    }, [])

    const Delay = (d1?: string, d2?: string): CSSProperties => {
        // d1 == opening delay
        // d2 == closing delay
        if (Actions) return { transitionDelay: d1 }
        else return { transitionDelay: d2 }
    }

    return (
        <div className='header-container'>
            <div className='title'>Mason</div>
            <div
                className={'open' + ((Actions && ' active') || '')}
                onMouseEnter={() => setActions(true)}
                onMouseLeave={() => setActions(false)}
            >
                <svg viewBox='0 0 10.8 8' style={Delay(undefined, '600ms')}>
                    <path
                        className='close'
                        d='M9.3 0 6.3 0 4.8 2.6 6.3 5.2 9.3 5.2 10.8 2.6 9.3 0Z'
                        style={Delay('200ms, 0ms')}
                        onClick={() => {
                            setActions(false)
                            win.close()
                        }}
                    />
                    <path
                        className='close-icon'
                        d='M7.8 2.8545 9.1126 4.1674 9.3674 3.9129 8.0545 2.6 9.3674 1.2874 9.1129 1.0326 7.8 2.3455 6.4874 1.0326 6.2329 1.2874 7.5455 2.6 6.2329 3.9126 6.4874 4.1674 7.8 2.8545Z'
                        style={Delay('300ms, 0ms')}
                    />

                    <path
                        className='minimize'
                        d='M4.5 2.8 1.5 2.8 0 5.4 1.5 8 4.5 8 6 5.4 4.5 2.8Z'
                        style={Delay(undefined, '200ms, 0ms')}
                        onClick={() => {
                            setActions(false)
                            win.minimize()
                        }}
                    />
                    <path
                        className='minimize-icon'
                        d='M4.74 5.239V5.559H1.22V5.239H4.74Z'
                        style={Delay('100ms, 0ms', '200ms, 0ms')}
                    />
                </svg>
            </div>
        </div>
    )
}

export default Header
