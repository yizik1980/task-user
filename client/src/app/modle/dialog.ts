export interface DialogConfig {
  title?: string;
  message?: string;
  data?: any;
  width?: string;
  height?: string;
  canClose?: boolean;
  closeOnBackdropClick?: boolean;
  actions?: DialogAction[];
  isTaskForm?: boolean;
}

export interface DialogAction {
  label: string;
  callback: (data?: any) => void;
  type?: "primary" | "secondary" | "danger";
  disabled?: boolean;
}
