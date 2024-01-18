import { Injectable } from '@nestjs/common';
import axios from 'axios'
import { SearchResponse } from './dtos/search.response';
import { IMercadoLivreProvider } from './mercado-livre.interface';
import { DescriptionResponse } from './dtos/product-description.response';
import { FullProductResponse } from '@src/controllers/dtos/full-product.response';

@Injectable()
export class MercadoLivreProvider implements IMercadoLivreProvider {
  private readonly api = axios.create({
    baseURL: process.env.MERCADO_LIVRE_API
  })

  async search(term: string, order: any): Promise<SearchResponse> {
    try {
      const { data } = await this.api.get<SearchResponse>('/sites/MLB/search', {
        params: {
          q: term,
          order
        }
      });

      return data;
    } catch (error) {
      return {
        paging: {
          limit: 0,
          offset: 0,
          primary_results: 0,
          total: 0,
        },
        results: []
      }
    }
  }

  async getProductDescription(id: string): Promise<DescriptionResponse> {
    try {
      const { data } = await this.api.get<DescriptionResponse>(`/items/${id}/description`, {
        params: {
          id
        }
      })
      return data;
    } catch (error) {
      throw new Error(`Failed to fetch product description`);
    }
  }

  async getProductData(id: string): Promise<FullProductResponse>{
    try{
      const { data } = await this.api.get<FullProductResponse>(`items/${id}`, {
        params: {
          id
        }
      })
      return data;
    }catch(error){
      throw new Error(`Failed to fetch product description`);
    }
  }
}