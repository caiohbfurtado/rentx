import { CarDTO } from "./CarDTO";

export type SchedulesByUser = {
  id: string;
  user_id: number;
  car: CarDTO,
  startDate: string
  endDate: string
}