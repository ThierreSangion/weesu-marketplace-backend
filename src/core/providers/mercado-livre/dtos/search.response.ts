export class SearchResponse {
  paging!: {
    total: number;
    primary_results: number;
    offset: number;
    limit: number;
  }
  results!: Array<Partial<{
    id: string;
    title: string;
    condition: string;
    thumbnail_id: string;
    catalog_product_id: string;
    listing_type_id: string;
    permalink: string;
    buying_mode: string;
    site_id: string;
    category_id: string;
    domain_id: string;
    thumbnail: string;
    currency_id: string;
    order_backend: number;
    price: number;
    original_price: number;
    sale_price: null
    available_quantity: number;
    official_store_id: number;
    official_store_name: string;
    use_thumbnail_id: boolean
    accepts_mercadopago: boolean
    shipping: {
      store_pick_up: false
      free_shipping: boolean
      logistic_type: string;
      mode: string;
      tags: string[]
      benefits: null
      promise: null
    }
    stop_time: string;
    seller: {
      id: number;
      nickname: string;
    }
    attributes: [
      {
        id: string;
        name: string;
        value_id: null
        value_name: string;
        attribute_group_id: string;
        attribute_group_name: string;
        value_struct?: {
          number: number;
          unit: string;
        }
        values: Array<{
          id: null
          name: string;
          struct: {
            number: number;
            unit: string;
          }
          source: number;
        }>
        source: number;
        value_type: string;
      }
    ]
    installments: {
      quantity: number;
      amount: number;
      rate: number;
      currency_id: string;
    }
    winner_item_id: null
    catalog_listing: boolean
    discounts: null
    promotions: []
    differential_pricing: {
      id: number;
    }
    inventory_id: string;
  }>>
}