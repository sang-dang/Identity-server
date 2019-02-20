import { ApiModelProperty } from '@nestjs/swagger';
export class AuthorizeDto {
    @ApiModelProperty()
    response_type: string;
    @ApiModelProperty()
    client_id: string;
    @ApiModelProperty()
    redirect_uri: string;
    @ApiModelProperty()
    scope: string;
    @ApiModelProperty()
    state: string;
}
