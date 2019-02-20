import { ApiModelProperty } from '@nestjs/swagger';

export class CredentialDto {
    @ApiModelProperty()
    username: string;
    @ApiModelProperty()
    password: string;
}