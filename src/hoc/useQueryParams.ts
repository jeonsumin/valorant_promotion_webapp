import { useSearchParams } from 'react-router-dom';

export const useQueryParams = () : Record<string, string> => {
  const [searchParam] = useSearchParams();
  const result: Record<string, string> = {};

  for (const [key, value] of searchParam.entries()){
    result[key] = value;
  }

  return result;
}