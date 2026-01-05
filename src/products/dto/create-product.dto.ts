import { IsNotEmpty,Min } from 'class-validator';


export class CreateProductDto {

    @IsNotEmpty({ message: "Name Is Required" })
    name: string;

    @IsNotEmpty({ message: "Description is required" })
    description: string;

    @IsNotEmpty({ message: "price is required" })
    @Min(1, { message: 'Price must be greater than 0' })
    price: number;

}
