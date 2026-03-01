export interface Spell {
  id?: number;

  name: string;
  level: number;
  school: string;

  castingTime: string;
  range: string;
  duration: string;

  components: {
    verbal: boolean;
    somatic: boolean;
    material: boolean;
    materialText?: string;
  };

  ritual: boolean;
  concentration: boolean;

  classes: string[];

  description: string;
  higherLevel?: string;

  damageTypes?: string[];
  savingThrow?: string;
  damageScaling?: Record<string, string>;

  tags?: string[];

  source: string;
  mechanic: string;
  prepared: boolean;
  known: boolean;
}