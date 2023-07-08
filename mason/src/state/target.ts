import { atom } from 'jotai'

type TargetModel = {
    title: string
    detail: string
    done: boolean
}

const Target = atom<TargetModel[]>([])

type Args = TargetModel[] | ((t: TargetModel[]) => TargetModel[])

const TargetAtom = atom(
    get => get(Target),
    (get, set, args: Args) => {
        let data = get(Target)

        if (typeof args === 'function') {
            data = args(data)
        } else {
            data = args
        }

        set(Target, data)
        chrome.storage.sync.set({
            mason_targets: data,
        })
    }
)

export { TargetAtom, TargetModel }
