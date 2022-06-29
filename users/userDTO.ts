class UserDTO
{
    public id: number
    public is_admin: boolean
    public constructor(model: any){
        this.id = model.id
        this.is_admin = model.is_admin
    }
}

export{UserDTO}
