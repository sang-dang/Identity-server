import { ApiModelProperty } from '@nestjs/swagger';
import { IsString, IsUrl, IsEnum, Length, IsNotEmpty, IsNumber } from 'class-validator';

export class ClientInfo {
    @ApiModelProperty()
    @IsString()
    response_type: string;

    @ApiModelProperty()
    @IsNumber()
    client_id: number;

    @ApiModelProperty()
    @IsUrl()
    redirect_uri: string;

    @ApiModelProperty()
    @IsString()
    scope: string;

    @ApiModelProperty()
    @IsString()
    @Length(10, 10)
    state: string;
}

export class ClientRegister {
    @ApiModelProperty()
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiModelProperty()
    @IsString()
    @IsNotEmpty()
    homepage: string;

    @ApiModelProperty()
    @IsUrl()
    @IsNotEmpty()
    redirect_uri: string;

    @ApiModelProperty()
    @IsString()
    description: string;
}

export class ClientKey {
    client_id: number;
    client_secret: number;
}