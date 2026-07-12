export class SearchService {
  search(query: string) {
    return {
      query,
      results: [],
    };
  }
}
