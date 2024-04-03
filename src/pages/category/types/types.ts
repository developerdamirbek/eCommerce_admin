export interface Type1 {
    count: number,
    next: string | null,
    previous: string | null,
    results: {
        children: [],
        id: number,
        image: string,
        title: string
    }
}

export interface Type2 {
    count: number,
    next: string | null,
    previous: string | null,
    results: {
        children: [],
        id: number,
        image: string,
        title: string,
        parent: {
            id: number,
            title: string
        }
    }[]
}

