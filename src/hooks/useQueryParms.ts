import { useSearchParams } from 'react-router-dom';

function useQueryParms<T>() {
  const [searchParams] = useSearchParams();
  const queryParams: T = Object.fromEntries(searchParams) as T;
  return queryParams;
}

export default useQueryParms;
