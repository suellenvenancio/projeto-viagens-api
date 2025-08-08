export interface RegisterUserInput {
    name: string
    email: string
    password: string
}

export interface User {
    id: string
    name: string
    email: string
    password: string
    createdAt: Date
    updatedAt: Date
}
