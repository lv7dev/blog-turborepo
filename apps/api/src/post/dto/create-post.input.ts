import { InputType, Field } from '@nestjs/graphql';
import { IsBoolean, IsOptional, IsString } from 'class-validator';

@InputType()
export class CreatePostInput {
  @Field()
  @IsString()
  title!: string;

  @Field()
  @IsString()
  content!: string;

  @Field({ nullable: true })
  @IsOptional()
  thumbnail?: string;

  @Field(() => [String])
  @IsString({ each: true })
  tags!: string[];

  @Field(() => Boolean)
  @IsBoolean()
  published!: boolean;
}
