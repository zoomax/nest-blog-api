import {IsNotEmpty, isNotEmpty, IsNumber} from "class-validator" ; 

export class CreateProductDto { 
    @IsNumber()
    @IsNotEmpty()
    price : number ; 
    @IsNumber()
    @IsNotEmpty()
    amount : number ; 
    @IsNotEmpty()
    title : string ; 
    @IsNotEmpty()
    description : string ; 
}