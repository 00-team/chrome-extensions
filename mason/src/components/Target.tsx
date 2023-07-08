import React, { FC, useContext, useState, Fragment } from 'react'

import { C } from '@00-team/utils'

import { PromptContext } from 'PromptContext'
import { Done, Trash } from 'icon'

import { useSetAtom } from 'jotai'
import { TargetAtom, TargetModel } from 'state'

import './style/target.scss'

type Props = TargetModel & {
    id: number
}

const Target: FC<Props> = ({ id, title, detail, done }) => {
    const [show, setShow] = useState(false)
    const setTargets = useSetAtom(TargetAtom)
    const [, setPrompt] = useContext(PromptContext)

    return (
        <div className={'target' + C(done, 'done')}>
            <div className='head'>
                <span
                    className='title'
                    onClick={() => setShow(s => !s)}
                    onContextMenu={e => {
                        e.preventDefault()

                        setPrompt({
                            isOpen: true,
                            title: 'Enter Title',
                            value: title,
                            onSubmit: data =>
                                setTargets(s => {
                                    s[id]!.title = data
                                    return [...s]
                                }),
                        })
                    }}
                >
                    {title || '---'}
                </span>
                <div
                    className={'done-box' + C(done)}
                    onClick={() =>
                        setTargets(s => {
                            s[id]!.done = !done
                            return [...s]
                        })
                    }
                >
                    {done && <Done />}
                </div>
                <div
                    className='del'
                    onClick={() =>
                        setTargets(s => {
                            s.splice(id, 1)
                            return [...s]
                        })
                    }
                >
                    <Trash />
                </div>
            </div>
            <p
                className={'detail' + C(show, 'show') + C(!detail, 'empty')}
                onContextMenu={e => {
                    e.preventDefault()
                    setPrompt({
                        isOpen: true,
                        title: 'Enter Details',
                        value: detail,
                        onSubmit: data =>
                            setTargets(s => {
                                s[id]!.detail = data
                                return [...s]
                            }),
                    })
                }}
            >
                {detail.length
                    ? detail.split('\n').map((s, idx) => (
                          <Fragment key={idx}>
                              {s}
                              <br />
                          </Fragment>
                      ))
                    : '---'}
            </p>
        </div>
    )
}

export { Target }
