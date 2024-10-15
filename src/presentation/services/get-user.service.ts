import { Inject, Injectable, Scope } from "@nestjs/common";
import { Request } from "express";
import { IUser } from "src/application/common/interfaces/IUser.interface";


interface User {
  id: string;
}

@Injectable({ scope: Scope.REQUEST })
export class CurrentUser implements IUser {
  constructor(
    @Inject("REQUEST") private readonly request: Request & { user: User }
  ) {}
  getCurrentUser(): string | null {
    return this.request.user.id || null;
  }

}
