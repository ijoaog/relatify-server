import { IsNotEmpty, IsEmail, IsEnum, Length, Matches } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @Length(3, 50)
  username: string;

  @IsNotEmpty()
  @Length(6, 255)
  password: string;

  @IsNotEmpty()
  @Length(3, 100)
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsEnum(['admin', 'official_agent'])
  role: 'admin' | 'official_agent';

  @IsNotEmpty()
  state: string;

  @IsNotEmpty()
  district: string;

  @IsNotEmpty()
  @Matches(/^\d{11}$/, { message: 'CPF must be 11 digits long' }) // Validação para CPF de 11 dígitos
  cpf: string;
}