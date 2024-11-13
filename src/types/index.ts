export type User = {
    defaultCategory: string,
    defaultDifficulty: string,
    defaultList: string,
    defaultStatus: string,
    email: string,
    id: string,
    token: string,
    username: string
}

export type Question = {
    url: string,
    site: string,
    name: string,
    difficulty: string,
    status: string,
    category: string,
    notes: string,
    date: string,
    id: string
}
