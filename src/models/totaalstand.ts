
export interface Totaalstand {
  "deelnemers": deelnemers[];
}

export interface deelnemers {
  "Name": string;
  "RoundId": number;
  "Positie": number;
  "TotalScore": number;
}
