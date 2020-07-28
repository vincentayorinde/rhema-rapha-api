import { EntityRepository, Repository } from 'typeorm';
import { IdentityUserEntity } from './identity-user.entity';

@EntityRepository(IdentityUserEntity)
export class IdentityUserRepository extends Repository<IdentityUserEntity> {}
