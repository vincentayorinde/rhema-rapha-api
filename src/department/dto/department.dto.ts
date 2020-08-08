import { IsNotEmpty } from 'class-validator';

export class DepartmentDto {
  public readonly id: string;

  @IsNotEmpty({ message: 'Department Name not provided' })
  public readonly name: string;

  @IsNotEmpty({ message: 'Department description not provided' })
  public readonly description: string;

  @IsNotEmpty({ message: 'Doctor Id not provided' })
  public readonly doctorId: string;
}
