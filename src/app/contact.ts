// export class Contact {
//   _id?: string;
//   first_name: string;
//   last_name: string;
//   phone: string;
// }
export class Bill {
  _id?: string;
  date_billed: Date;
  description: string;
  amount: number;
  date_payed: Date;
}

export class Contact {
  _id?: string;
  first_name: string;
  last_name: string;
  phone: string;
  email: string;
  bill_pending: Bill[];
  bill_history: Bill[];
}
