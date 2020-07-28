import { IsNotEmpty } from 'class-validator';

export class DepartmentDto {
  id: string;

  @IsNotEmpty({ message: 'Department Name not provided' })
  name: string;

  @IsNotEmpty({ message: 'Department description not provided' })
  description: string;

  @IsNotEmpty({ message: 'Doctor Id not provided' })
  doctorId: string;
}
