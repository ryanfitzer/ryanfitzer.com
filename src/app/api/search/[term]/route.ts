import FlexSearch from 'flexsearch';
import { getEntries } from '@/library/get-content';

type Content = {
  params: {
    term: string;
  };
};

const search = async (term: string) => {
  const searchIndex = new FlexSearch.Index();
  const { entries } = await getEntries({ dir: 'blog', body: true });

  entries.forEach(({ title, content }, index) => {
    searchIndex.add(index, `${title} ${content}`);
  });

  const IDs = searchIndex.search(term);

  return IDs.map((id) => entries[id as number]);
};

export async function GET(request: Request, { params: { term } }: Content) {
  const results = await search(term);

  return Response.json(results);
}
