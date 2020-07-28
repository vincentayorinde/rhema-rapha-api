import { Injectable, HttpException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

class Bcrypt {
  public async hash(password: string, callback: any) {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt, callback);
  }

  public async compare(password: string, encrypted: string, callback: any) {
    return await bcrypt.compare(password, encrypted, callback);
  }
}

@Injectable()
export class PasswordEncrypterService {
  private bcrypt: Bcrypt;

  constructor() {
    this.bcrypt = new Bcrypt();
  }

  public async encrypt(password: string, callback?: unknown): Promise<string> {
    try {
      return await this.bcrypt.hash(password, callback);
    } catch (error) {
      throw new HttpException('Error Encrypting Password', error);
    }
  }

  public async decrypt(
    password: string,
    encrypted: string,
    callback?: unknown,
  ): Promise<boolean> {
    try {
      return await this.bcrypt.compare(password, encrypted, callback);
    } catch (error) {
      throw new HttpException('Error Decrypting Password', error);
    }
  }
}
