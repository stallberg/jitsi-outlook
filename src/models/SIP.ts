export interface Numbers {
  message: string;
  numbers: {
    Sweden?: string[];
    Norway?: string[];
    Denmark?: string[];
  };
  numbersEnabled: boolean;
}

export interface Pin {
  message: string;
  id: number;
  conference: string;
}
