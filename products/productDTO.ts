class ProductDTO
{
    id: string
    name: string
    description: string
    price: number
    image_url: string
    constructor(model){
        this.id=model.id
        this.name=model.name
        this.description=model.description
        this.price=model.price
        this.image_url=`/products/media${model.image_url}`
    }
}