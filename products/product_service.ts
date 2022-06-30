import status from 'http-errors'

import { Products } from "./product_models";
import {ProductDTO} from './productDTO'
/**
 *  Service for user controller 
 * @method addProduct - create product by the admin
 * @method getAllProducts - take list of products
 * @method getOneProduct - take one product by id
 * @method getMedia - take image to user
 */
class ProductService
{
    async addProduct(name: string, price: number, description: string, count: number, image: any){
        if(!name || !price || !count){
            throw status(203)
        }
        let findProd = await Products.findOne({
            where: {
                name:name
            }
        })
        if(findProd){
            findProd.count += Number(count)
            findProd.price = price
            findProd.save()
            return findProd.id
        }else{
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
    }

    async getAllProducts(){
        let products = await Products.findAll()
        let productsDTO: Array<ProductDTO> = new Array<ProductDTO>()
        for(let i in products){
            productsDTO.push(new ProductDTO(products[i]))
        }
        return productsDTO
    }

    async getOneProduct(p_id: string){
        
        let product = await Products.findOne({
            where:{
                id: p_id
            }
        })
        return new ProductDTO(product)
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