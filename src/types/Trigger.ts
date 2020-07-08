export enum TriggerType {
  boolean = "bool",
  integer = "integer",
  float = "float",
  signal = "signal",
}
export type TriggerState =
  | {
      key: string;
      type: TriggerType.boolean;
      value: boolean;
    }
  | {
      key: string;
      type: TriggerType.integer;
      value: number;
    }
  | {
      key: string;
      type: TriggerType.float;
      value: number;
    }
  | {
      key: string;
      type: TriggerType.signal;
    };
export type TriggerColor = {
  r: number;
  g: number;
  b: number;
};
export type Trigger = {
  category: string;
  displayName: string;
  color: TriggerColor;
  showConfirmDialog: boolean;
  state: TriggerState[];
};

export type JsonFormat = {
  triggers: Array<{
    displayName: string;
    showConfirmDialog: boolean;
    state: TriggerState[];
    category?: string;
    color?: [number, number, number];
  }>;
};
