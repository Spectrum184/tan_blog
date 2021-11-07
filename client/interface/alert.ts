export interface IAlert {
  type: "warn" | "success" | "error";
  message: string;
  show: boolean;
}
