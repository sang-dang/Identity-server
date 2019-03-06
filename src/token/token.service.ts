
import { Model } from 'mongoose';
import { Injectable, Inject } from '@nestjs/common';
// import { AccessToken } from './interfaces/access-token.interface';
import { TokenDto } from './dto/create-cat.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Token } from './token.model';
import { ModelType } from 'typegoose';

@Injectable()
export class TokenService {
  constructor(
    @InjectModel(Token.modelName)
    private readonly tokenRepo: ModelType<Token>,
  ) {
  }

  async create(createCatDto: TokenDto): Promise<Token> {
    const createdCat = new this.tokenRepo(createCatDto);
    return await createdCat.save();
  }

  async findAll(): Promise<Token[]> {
    return await this.tokenRepo.find().exec();
  }
}