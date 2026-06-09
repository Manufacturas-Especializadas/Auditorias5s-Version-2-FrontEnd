export interface Question {
  id: number;
  text: string;
}

export interface SCategory {
  key: "seiri" | "seiton" | "seiso" | "seiketsu" | "shitsuke";
  title: string;
  questions: Question[];
}

export const PRODUCTION_5S_QUESTIONS: SCategory[] = [
  {
    key: "seiri",
    title: "Auditoría de producción - Clasificación",
    questions: [
      {
        id: 1,
        text: "Estaciones solo cuentan con artículos necesarios para el desempeño del trabajo (Máquinas, Mesas, Carros, tooling, AV, etc y se compara contra layout de la celda)",
      },
      {
        id: 2,
        text: "¿Hay información innecesaria u obsoleta en las paredes, máquinas, pizarrones y escritorios?",
      },
      {
        id: 3,
        text: "No hay artículos, tubería, ni contenedores en el piso (todo sobre tarimas o carrito)",
      },
    ],
  },
  {
    key: "seiton",
    title: "Auditoría de producción - Ordenar",
    questions: [
      {
        id: 4,
        text: "Un lugar para cada cosa y cada cosa en su lugar (Herramientas deltas delineadas o etiquetadas)",
      },
      {
        id: 5,
        text: "Pasillos, áreas de trabajo y salidas de emergencia están claramente delimitados y libres",
      },
    ],
  },
  {
    key: "seiso",
    title: "Auditoría de producción - Limpieza",
    questions: [
      {
        id: 6,
        text: "Pisos, máquinas y estaciones de trabajo libres de polvo, aceite, rebaba o basura",
      },
    ],
  },
  {
    key: "seiketsu",
    title: "Auditoría de producción - Estandarizar",
    questions: [
      {
        id: 7,
        text: "Los estándares de limpieza y orden son visibles y entendidos por el personal",
      },
    ],
  },
  {
    key: "shitsuke",
    title: "Auditoría de producción - Sostener",
    questions: [
      {
        id: 8,
        text: "Se realizan auditorías periódicas y se le da seguimiento a las acciones correctivas",
      },
    ],
  },
];
