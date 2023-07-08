import React, { FC } from 'react'

import { useSetAtom } from 'jotai'
import { TargetAtom } from 'state'

const Load: FC = () => {
    const setTargets = useSetAtom(TargetAtom)

    const load = () => {
        let file = document.createElement('input')
        file.type = 'file'
        file.accept = 'application/json'

        file.onchange = async () => {
            if (!file.files || !file.files.length) return
            const data = JSON.parse(await file.files[0]!.text())
            if (!Array.isArray(data)) return alert('invalid plan.json')
            setTargets(data)
        }

        file.click()
    }

    return <button onClick={load}>Load Plan</button>
}

export { Load }
