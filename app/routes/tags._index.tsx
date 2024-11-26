import { Link } from '@remix-run/react';

import { Container } from '~/components/ui-kit/Container/Container';

export default function TagsIndexPage() {
  return (
    <section className="section">
      <Container className="flex flex-col items-center gap-y-10">
        <p>No Tags selected.</p>

        <p>Select a Tag on the left, or add new one</p>

        <Link
          to="new"
          className="primaryButton w-fit !inline-block p-4 text-xl text-white bg-ui_accent border-[1px] border-ui_accent_dark mb-10 rounded-sm"
        >
          Add New Tag
        </Link>
      </Container>
    </section>
  );
}
