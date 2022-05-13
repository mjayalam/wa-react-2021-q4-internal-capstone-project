import { useState, useEffect } from 'react';
import { API_BASE_URL } from '../constants';
import { useLatestAPI } from './useLatestAPI';

export function useProductSearch(searchTerm, pageSize = 20) {
  const { ref: apiRef, isLoading: isApiMetadataLoading } = useLatestAPI();
  const [response, setResponse] = useState(() => ({
    data: {},
    isLoading: true,
  }));

  useEffect(() => {
    if (!apiRef || isApiMetadataLoading) {
      return () => {};
    }

    const controller = new AbortController();

    async function getData() {
      try {
        setResponse({ data: {}, isLoading: true });
        const url = `${API_BASE_URL}/documents/search?ref=${apiRef}&q=${encodeURIComponent('[[at(document.type, "product" )]]')}&q=[[fulltext(document, "${searchTerm}")]]&lang=en-us&pageSize=${pageSize}`;
        const response = await fetch(
          url,
          {
            signal: controller.signal,
          }
        );
        const data = await response.json();

        setResponse({ data: data, isLoading: false });
      } catch (err) {
        setResponse({ data: {}, isLoading: false });
        console.error(err);
      }
    }

    getData();

    return () => {
      controller.abort();
    };
  }, [apiRef, isApiMetadataLoading]);

  return response;
}
