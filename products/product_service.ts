import status from 'http-errors'

import { Products } from "./product_models";

class ProductService
{
    async addProduct(name: string, price: number, description: string, count: number, image: any){
        if(!name || !price || !count){
            throw status(203)
        }
        let prod = Products.build({
            name: name,
            price: price,
            description: description,
            count: count
        })
        if(image){
            let type_img = image.name.split('.')
            prod.image_url = prod.id + '.' + type_img[type_img.length-1]
            image.mv(`./products/media/${prod.image_url}`)
        }

        prod.save()
        return prod.id
    }

    async getAllProducts(){
    
        return await Products.findAll()
    }


    async getOneProduct(p_id: string){
        
        return await Products.findOne({
            where:{
                id: p_id
            }
        })
    }
    async getMedia(p_id: string){
        if(!p_id){
            throw status(400)
        }
        let prod = await Products.findOne({
            where:{
                id: p_id 
            }
        })

        if(!prod){
            throw status(404)
        }
        return prod.image_url
    }
}

export default new ProductService()