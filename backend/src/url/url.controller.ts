import {Controller, Post, Body, HttpCode, HttpStatus, Get, Param} from '@nestjs/common';
import { UrlService } from './url.service';
import { CreateShortUrlRequestsDto } from "./dto/create-short-url-requests.dto";
import { Throttle } from '@nestjs/throttler';
import { ShortLink } from '../../generated/prisma';

@Controller('url')
export class UrlController {
  constructor(private readonly urlService: UrlService) { }
  
  @Throttle({ default: { limit: 120, ttl: 60000 } })
  @Post('shorten')
  @HttpCode(HttpStatus.CREATED)
  async shorten(@Body() request: CreateShortUrlRequestsDto): Promise<Record<string, any>> {
    const shortUrl = await this.urlService.shortenUrl(request.url, request.customSlug);
    
    return {
      success: true,
      data: {
        shortUrl
      }
    }
  }
  
  @Throttle({ default: { limit: 120, ttl: 60000 } })
  @Get('list')
  async list(): Promise<Record<string, any>> {
    const urls: ShortLink[] = await this.urlService.getLinks();
    
    return {
      success: true,
      data: {
        urls
      }
    }
  }
  
  @Get('redirect/:slug')
  async getRedirectUrl(@Param('slug') slug: string) {
    try {
      const originalUrl = await this.urlService.redirectToOriginalUrl(slug);

      return {
        success: true,
        data: {
          originalUrl,
        },
      };
    } catch (error) {

      return {
        success: false,
        error: error.message,
      };
    }
  }
}
