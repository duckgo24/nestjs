import { CommonEntity } from 'src/domain/common/common.entity';
import { EntitySubscriberInterface, EventSubscriber, InsertEvent } from 'typeorm';
import * as uuid from 'uuid';
import { Injectable } from '@nestjs/common';
import { CurrentUser } from 'src/presentation/services/get-user.service';
import { IUser } from 'src/application/common/interfaces/IUser.interface';

@Injectable()
@EventSubscriber()
export class CommonEntitySubscriber implements EntitySubscriberInterface<CommonEntity> {
  
  constructor(
    private readonly currentUser: IUser,
  ) {}
  listenTo() {
    return CommonEntity;
  }

  async beforeInsert(event: InsertEvent<CommonEntity>) {
    console.log('user_id', this.currentUser.getCurrentUser());
    
    event.entity.id = uuid.v4();
    event.entity.createdAt = new Date();
    event.entity.createdBy = this.currentUser.getCurrentUser(); 
  }
}
