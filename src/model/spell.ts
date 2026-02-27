export interface Spell {
    id: number;
    name: String;
    level: number;
    castingTime: String;
    range: String;
    school: String;
    damageTypes?: String[];
    source: String;
    prepared: boolean;
    known: boolean;
}