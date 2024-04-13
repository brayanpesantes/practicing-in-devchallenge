export interface Country {
  name: string;
  capital: string;
  region: string;
  subregion: string;
}

export interface Question {
  question: string;
  options: string[];
  correctAnswer: string;
}
