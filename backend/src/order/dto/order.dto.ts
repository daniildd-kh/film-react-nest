class SessionDto {
  film: string;
  session: string;
  daytime: string;
  row: number;
  seat: number;
  price: number;
}

export class OrderDto {
  email: string;
  phone: string;
  tickets: SessionDto[];
}
