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

export interface UpdateBouquetData {
  name?: string;
  shortDescription?: string;
  longDescription?: string;
  price?: number;
  flowersAmount?: number
  category?: string;
  imgUrl?: File | string;
}

export interface CreateBouquetData {
  name: string;
  shortDescription?: string;
  longDescription?: string;
  flowersAmount?: number;
  price: number;
  category?: string;
  imgUrl?: File | string;
}


export interface BouquetWithRelated {
  data: Bouquet;
  relatedBouquets: Bouquet[];
}

export interface PriceRange {
  from?: number;
  to?: number;
}

export interface GetBouquetsOptions {
  limit?: number;
  lastId?: number | null;
  priceRange?: {
    from?: number;
    to?: number;
  };
  category?: string | string[];
  sort?: "price-asc" | "price-desc";
}

export interface BouquetsResponse {
  data: Bouquet[];
  meta: {
    nextLastId: number | null;
    hasMore: boolean;
  };
}