import { atom } from 'jotai'

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
        database.save(data)
    }
)

export { TargetAtom }
