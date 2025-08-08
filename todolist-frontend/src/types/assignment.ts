export interface UpdateAssignment {
  title: string;
  appointedDate: string;
}

export interface Assignment extends UpdateAssignment {
  id?: number;
  userId: number;
}
