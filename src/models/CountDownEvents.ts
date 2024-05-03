export interface CountDownEvents {
  title: string;
  description: string;
  startDate: Date;
  endDate: Date;
  id?: number;
  eventTodos: {
    id: number,
    action: string;
  }[] | null;
}
