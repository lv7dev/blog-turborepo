import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { Auth } from './entities/auth.entity';
import { SignInInput } from './dto/signin.input';

@Resolver(() => Auth)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => String)
  async signIn(@Args('signInInput') signInInput: SignInInput) {
    const user = await this.authService.validateLocalUser(signInInput);

    return 'Succesfully signed in';
  }
}
