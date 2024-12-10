import { useEffect, useState } from 'react';
import { Form, useNavigation, useSubmit } from '@remix-run/react';

import { BusyIndicator } from '~/components/ui-kit/BusyIndicator';

import { SEARCH_PARAMETER_NAME } from '~/constants/constants';
import s from './SearchForm.module.css';

export const SearchForm = ({ query }: { query: string }) => {
  const submit = useSubmit();
  const navigation = useNavigation();
  const [queryString, setQueryString] = useState(query ?? '');

  const searching =
    navigation.location &&
    new URLSearchParams(navigation.location.search).has(SEARCH_PARAMETER_NAME);

  useEffect(() => {
    setQueryString(query || '');
  }, [query]);

  return (
    <Form
      id="search-form"
      role="search"
      className="w-full h-fit relative"
      onChange={event => {
        const isFirstSearch = query === null;

        submit(event.currentTarget, {
          replace: !isFirstSearch,
        });
      }}
    >
      <input
        id="search"
        aria-label="Search contacts"
        placeholder="Search..."
        type="search"
        name="search"
        className={s.searchInput}
        value={queryString}
        onChange={e => setQueryString(e.target.value)}
      />
      <BusyIndicator isLoading={!!searching} />
    </Form>
  );
};
