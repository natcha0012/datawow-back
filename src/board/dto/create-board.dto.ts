import { IsEnum, IsString } from 'class-validator';
import { BlogTag } from 'src/enums/tag.enum';

export class CreateBoardDto {
  @IsString()
  title: string;

  @IsEnum(BlogTag)
  tag: BlogTag;

  @IsString()
  content: string;
}
