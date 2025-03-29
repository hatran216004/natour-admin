import { useSearchParams } from 'react-router-dom';

function useUrl<T>({
  field,
  defaultValue
}: {
  field: string;
  defaultValue: T;
}) {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentValue = searchParams.get(field) || defaultValue;

  function handler(value: T): void {
    const newParams = new URLSearchParams(searchParams);
    if (searchParams.get('page')) newParams.set('page', '1');
    newParams.set(field, `${value}`);
    setSearchParams(newParams);
  }
  return { currentValue, handler };
}

export default useUrl;
