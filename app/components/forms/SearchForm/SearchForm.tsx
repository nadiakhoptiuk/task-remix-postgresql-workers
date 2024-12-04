import { useEffect, useState } from 'react';
import { Form, useNavigation, useSubmit } from '@remix-run/react';
import classNames from 'classnames';
import { ImSpinner2 } from 'react-icons/im';

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
      className="w-fit h-fit mb-8 relative"
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
      <ImSpinner2
        aria-hidden
        className={classNames(
          'absolute top-0 left-2 ',
          !searching ? 'hidden' : s.iconLoading,
        )}
      />
    </Form>
  );
};
