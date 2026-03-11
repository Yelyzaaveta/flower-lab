export type Bouquet = {
    id: number
    name: string
    imgUrl: string
    shortDescription: string
    longDescription: string
    category: string
    price: number
    flowersAmount: number
    buyAmount: number
    creationDate: string
    updationDate: string
}

export interface BouquetWithRelated {
  data: Bouquet;
  relatedBouquets: Bouquet[];
}