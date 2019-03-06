import { Injectable } from '@nestjs/common';
import { TokenDto } from './dto/create-cat.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AccessToken } from './interfaces/access-token.interface';
// import { Token } from './token.model';
// import { ModelType } from 'typegoose';

@Injectable()
export class TokenService {
  constructor(
    @InjectModel('TokenRepo')
    private readonly tokenRepo: Model<AccessToken>,
  ) {
  }

  async create(createCatDto: TokenDto): Promise<AccessToken> {
    const createdCat = new this.tokenRepo(createCatDto);
    return await createdCat.save();
  }

  async findAll(): Promise<AccessToken[]> {
    return await this.tokenRepo.find().exec();
  }
}