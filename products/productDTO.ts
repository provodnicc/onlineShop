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
    count: number
    image_url: string
    constructor(model: any){
        this.id=model.id
        this.name=model.name
        this.description=model.description
        this.price=model.price
        this.count=model.count
        this.image_url=`/product/media?p_id=${model.id}`
    }
}

export {ProductDTO}