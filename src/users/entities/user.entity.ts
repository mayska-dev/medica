export class User {
    id: number
    email: string
    name: string
    constructor(data: any) {
        this.id = data.id
        this.email = data.email
        this.name = data.name
    }
}
