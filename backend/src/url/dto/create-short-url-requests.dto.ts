import { IsString, IsNotEmpty, IsOptional, IsUrl, Length, Matches } from 'class-validator';

export class CreateShortUrlRequestsDto {
  @IsString()
  @IsNotEmpty({ message: 'URL is required' })
  @IsUrl({
    protocols: ['http', 'https'],
    require_protocol: true,
  }, { message: 'Please provide a valid URL (http:// or https://)' })
  url: string;
  
  @IsOptional()
  @IsString()
  @Length(5, 20, { message: 'Custom slug must be between 5 and 20 characters' })
  @Matches(/^[a-zA-Z0-9-_]+$/, { message: 'Custom slug can only contain letters, numbers, hyphens, and underscores' })
  customSlug?: string;
}
