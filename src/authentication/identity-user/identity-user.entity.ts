import { UserBaseEntity } from '../../shared/user-base.entity';
import { Entity } from 'typeorm';

@Entity({ name: 'IdentityUserTbl' })
export class IdentityUserEntity extends UserBaseEntity {}
