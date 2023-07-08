import React, { FC } from 'react'

import { useAtomValue } from 'jotai'
import { TargetAtom } from 'state'

const Save: FC = () => {
    const targets = useAtomValue(TargetAtom)

    const save = () => {
        let url = URL.createObjectURL(
            new Blob([JSON.stringify(targets, null, 4) + '\n'], {
                type: 'application/json',
            })
        )

        chrome.downloads.download({
            url: url,
            saveAs: true,
            filename: 'plan.json',
        })
    }

    return <button onClick={save}>Save Plan</button>
}

export { Save }
