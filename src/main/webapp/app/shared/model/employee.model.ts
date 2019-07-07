import { Moment } from 'moment';
import { IOrders } from 'app/shared/model/orders.model';

export const enum Grade {
  I2 = 'I2',
  I3 = 'I3',
  II1 = 'II1',
  II2 = 'II2',
  II3 = 'II3',
  III1 = 'III1',
  III2 = 'III2',
  III3 = 'III3'
}

export const enum JobTitle {
  POSTMAN = 'POSTMAN',
  MAIL_AGENT = 'MAIL_AGENT',
  HANDLER = 'HANDLER',
  DELIVERER = 'DELIVERER',
  MANAGER = 'MANAGER'
}

export interface IEmployee {
  id?: number;
  firstName?: string;
  lastName?: string;
  email?: string;
  phoneNumber?: string;
  hireDate?: Moment;
  grade?: Grade;
  jobTitle?: JobTitle;
  departmentId?: number;
  orders?: IOrders[];
  managerId?: number;
}

export class Employee implements IEmployee {
  constructor(
    public id?: number,
    public firstName?: string,
    public lastName?: string,
    public email?: string,
    public phoneNumber?: string,
    public hireDate?: Moment,
    public grade?: Grade,
    public jobTitle?: JobTitle,
    public departmentId?: number,
    public orders?: IOrders[],
    public managerId?: number
  ) {}
}
