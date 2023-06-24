import { FC, HTMLAttributes } from 'react'

declare global {
    type Icon = FC<HTMLAttributes<SVGSVGElement>>
    type TargetModel = {
        title: string
        detail: string
        done: boolean
    }
}
