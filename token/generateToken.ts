import * as jwt from 'jsonwebtoken'
class AuthService {
  private generateToken(user) {

    const data = {
      _id: user._id,
      name: user.name,
      email: user.email
    };
    const signature = 'MKL_World_Tokenjwt_VTK';
    const expiration = '6h';

    return jwt.sign({ data, }, signature, { expiresIn: expiration });
  }
}