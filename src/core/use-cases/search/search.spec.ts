import { FakeMercadoLivreProvider } from "@core/providers/mercado-livre/mercado-livre.fake";
import { Search } from "./search.use-case";
import { Input } from "./input";
import { SearchResponse } from "@core/providers/mercado-livre/dtos/search.response";
import { randomUUID } from "crypto";
import { BadRequestException } from "@nestjs/common";


let _fakeMercadoLivreProvider: FakeMercadoLivreProvider;
let useCase: Search;

describe('Search', () => {
  beforeEach(() => {
    _fakeMercadoLivreProvider = new FakeMercadoLivreProvider();

    useCase = new Search(
      _fakeMercadoLivreProvider,
    );
  });

  const input: Input = {
    term: 'some-term'
  }

  const response: Partial<SearchResponse> = {
    results: [
      {
        id: randomUUID(),
        title: 'some-title',
        thumbnail: 'some-link',
        price: 10,
        original_price: 15,
      }
    ]
  }

  it.each([
    {
      should: 'return a list of products successfuly',
      input,
      setup: () => {
        _fakeMercadoLivreProvider.search.mockResolvedValueOnce(response);
      },
      expected: (result: any) => {
        const mock = response.results?.map((item) => {
          return {
            id: item.id,
            title: item.title,
            thumbnail: item.thumbnail,
            price: item.price,
            original_price: item.original_price
          }
        })
        expect(result).toEqual({
          data: mock
        })
      },
    },
    {
      should: 'throw BadRequestException if input is invalid or missing',
      input: {},
      setup: () => { },
      expected: (result: any) => {
        expect(result).toBeInstanceOf(BadRequestException)
      },
    },
  ])('Should $should', async ({ input, setup, expected }) => {
    if (setup) setup();

    await useCase
      .execute(input as unknown as Input)
      .then(expected)
      .catch(expected);
  });
});
