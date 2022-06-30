/**
 * Product data transfer object to configure product post in the shop
 * @field id
 * @field name
 * @field description
 * @field price
 * @field image_url
 */
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