export type TodoItem = {
  id: number;
  title: string;
  dueDate: string;
  description: string;
  isCompleted: boolean;
  createdAt: string;
  updatedAt: string;
};

export type InputFieldProps = {
  label: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
};

export type TextAreaInputType = {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
};
