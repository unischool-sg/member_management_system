type BaseRoute = {
    path: string
    element: React.ReactNode
    layout?: React.ReactNode
    meta?: {
        title: string
        description: string
    }
}

type HasChildrenRoute = BaseRoute & {
    children: BaseRoute[]
}

export type Route = BaseRoute | HasChildrenRoute