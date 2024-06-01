export interface EventFilterDto {
  name: string;
  minUnitPrice: number;
  maxUnitPrice: number;
  minDate: Date;
  maxDate: Date;
  country: string;
  address: string;
}
