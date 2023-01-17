import { PriorityData } from "./priority-data.model";
import { StatusData } from "./status-data.model";

export interface TaskData {
  id: string,
  title: string,
  description: string,
  createdAt: Date,
  status: StatusData,
  priority: PriorityData
}
