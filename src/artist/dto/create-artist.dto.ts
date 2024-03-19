import { IsBoolean, IsDefined, IsString } from "class-validator";

export class CreateArtistDto {
    @IsString()
    @IsDefined()
    name: string;
    
    @IsBoolean()
    @IsDefined()
    grammy: boolean;    
}
