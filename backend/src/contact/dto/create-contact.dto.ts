import {
  IsArray,
  IsEmail,
  IsNotEmpty,
  IsString,
  IsUrl,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

class LinkItemDto {
  @IsString()
  platform: string;

  @IsString()
  url: string;
}

export class CreateContactDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  lastName: string;

  @IsEmail()
  email: string;

  @IsString({ each: true })
  category: string;

  @IsString()
  artistName: string;

  @IsString()
  sealNAME: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => LinkItemDto)
  @IsUrl()
  musicPlatform: LinkItemDto[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => LinkItemDto)
  @IsUrl()
  yourSocials: LinkItemDto[];

  @IsString()
  @IsNotEmpty()
  message: string;
}
