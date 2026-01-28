export interface Attendance {
  id: string;
  clientName: string;
  serviceName: string;
  date: Date;
  status: 'pending' | 'completed' | 'cancelled';
  price: number;
}
