import { PriorityData } from "./priority-data.model";
import { StatusData } from "./status-data.model";

export interface UpdateTaskData {
  content: string,
  date: Date,
  isFinished: StatusData,
  priority: PriorityData
}
