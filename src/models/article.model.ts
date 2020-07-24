import { Document, Schema, Types } from 'mongoose';
import * as slugify from "slug" ; 

export interface IArticle extends Document {
    title : string  ; 
    description : string ;  
    slug : string ; 
    createdAt : Date  ; 
    modifiedAt  : Date , 
    body  : string   ; 
    tagList  : string[] ; 
    favorited : boolean  ; 
    favoritesCount : number  ; 
    author : Types.ObjectId ; 
 }

export const ArticleSchema = new Schema( { 
    title: { 
        type : String , 
        required : true 
    } , 
    description  : { 
        type: String , 
        required: true ,
    } , 
    slug :  { 
        type : String , 
        required :true , 
        unique : true 
    } , 
    body :  { 
        type : String   , 
        required  :true , 
    } , 
    tagList  : [{type: String}] , 
    favorited : { 
        type : Boolean  , 
        required: true , 
        default : false 
    } , 
    favoritesCount  :  { 
        type: Number , 
        required : true , 
        default: 0 
    } , 
    author : { 
        type: Schema.Types.ObjectId , 
        ref: "users"
    } , 
    favoritedBy   : [ { 
        type: Schema.Types.ObjectId , 
        ref : "users" 
    }]
} , { 
    timestamps : true
})

ArticleSchema.pre<IArticle>("save" , function(next) { 
    this.slug = slugify(this.title , { 
        lower : true  , 
    } ) + ((Math.random()*Math.pow(3 , 36)))
})