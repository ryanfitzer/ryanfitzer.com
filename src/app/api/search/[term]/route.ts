import FlexSearch from 'flexsearch';
import BlogSearchData from '~/content/blog-search-data.json';

type Content = {
  params: Promise<{
    term: string;
  }>;
};

const search = async (term: string) => {
  const searchIndex = new FlexSearch.Index();

  BlogSearchData.forEach(({ title, body }, index) => {
    searchIndex.add(index, `${title} ${body}`);
  });

  const IDs = searchIndex.search(term);

  return IDs.map((id) => BlogSearchData[id as number]);
};

export async function GET(request: Request, props: Content) {
  const params = await props.params;

  const {
    term
  } = params;

  const results = await search(term);

  return Response.json({
    total: results.length,
    results,
  });
}
