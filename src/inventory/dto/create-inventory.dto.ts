import { IsInt, Min } from 'class-validator';

export class CreateInventoryDto {



    @IsInt({ message: 'Quantity must be an integer' })
    @Min(0, { message: 'Quantity cannot be negative' })
    quantity: number;
}
