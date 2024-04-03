export interface AttributeType {
    count: number,
    next: null,
    previous: null,
    results: {
        id: number,
        title: string,
        category: number[],
        category_title: {
            title: string
        }[]
    }[]
}