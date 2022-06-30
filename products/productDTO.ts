class ProductDTO
{
    id: string
    name: string
    description: string
    price: number
    image_url: string
    constructor(model: any){
        this.id=model.id
        this.name=model.name
        this.description=model.description
        this.price=model.price
        this.image_url=`/products/media?p_id=${model.id}`
    }
}

export {ProductDTO}