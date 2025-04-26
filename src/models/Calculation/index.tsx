export interface Calculation {
  id: number,
  PUBLICATION_GROUP: number,
  NAME: string,
  PREVIOUS_NETO: number,
  CURRENT_NETO: number,
  VAR_PESOS: number,
  VAR_PERCENT: number,
  COMMENT?: string,
}

export const CalculationArrayIS: Calculation[] = [];

////////////////////////////////////////////////////

export interface CalculationForm extends Omit<Calculation, 'id' | 'PUBLICATION_GROUP'> {}

export const CalculationFormArrayIS: CalculationForm[] = [];
