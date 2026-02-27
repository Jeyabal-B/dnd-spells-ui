export interface Spell {
    id: number;
    name: String;
    level: number;
    castingTime: String;
    duration: String;
    range: String;
    school: String;
    damageTypes?: String[];
    source: String;
    prepared: boolean;
    known: boolean;
}