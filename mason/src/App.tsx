import React, { FC, useEffect, Fragment } from 'react'

import { Plus } from 'icon'

import { useAtom } from 'jotai'
import { TargetAtom } from 'state'

import { Target, Load, Save } from 'components'

import './style/base.scss'
import './style/fonts/imports.scss'
import './style/road.scss'

const App: FC = () => {
    const [targets, setTargets] = useAtom(TargetAtom)

    useEffect(() => {
        console.log('load the plans')
    }, [])

    return (
        <main>
            <div className='actions'>
                <Load />
                <Save />
            </div>
            <div className='road'>
                <button
                    className='add-btn'
                    onClick={() =>
                        setTargets(s =>
                            [
                                {
                                    title: '',
                                    detail: '',
                                    done: false,
                                },
                            ].concat(s)
                        )
                    }
                    style={{ marginBottom: '0.5rem' }}
                >
                    Add Target
                </button>

                {targets.map((t, id) => (
                    <Fragment key={id}>
                        <Target id={id} {...t} />
                        <div
                            className='insert-btn'
                            onClick={() => {
                                setTargets(s => {
                                    s.splice(id + 1, 0, {
                                        title: '',
                                        detail: '',
                                        done: false,
                                    })
                                    return [...s]
                                })
                            }}
                        >
                            <Plus />
                        </div>
                    </Fragment>
                ))}

                <button
                    className='add-btn'
                    onClick={() =>
                        setTargets(s =>
                            s.concat([
                                {
                                    title: '',
                                    detail: '',
                                    done: false,
                                },
                            ])
                        )
                    }
                >
                    Add Target
                </button>
            </div>
        </main>
    )
}

export default App
