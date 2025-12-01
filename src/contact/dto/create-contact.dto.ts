import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsUrl,
  IsOptional,
} from 'class-validator';

export class CreateContactDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  lastName: string;

  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  category: string;

  @IsString()
  @IsOptional()
  artistName: string;

  @IsString()
  @IsOptional()
  sealNAME: string;

  @IsUrl()
  linkMusic: string;

  @IsUrl()
  socialsLink: string;

  @IsString()
  @IsNotEmpty()
  jobOffer: string;

  // @IsString()
  // @MinLength(5)
  // message: string;
}
