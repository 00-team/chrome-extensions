import { FC, HTMLAttributes } from 'react'

type WinType = {
    close: () => void
    minimize: () => void
}

type Database = {
    load: () => Promise<TargetModel[]>
    save: (data: TargetModel[]) => Promise<void>
}

declare global {
    type Icon = FC<HTMLAttributes<SVGSVGElement>>
    type TargetModel = {
        title: string
        detail: string
        done: boolean
    }
    var database: Database
    var win: WinType
}
