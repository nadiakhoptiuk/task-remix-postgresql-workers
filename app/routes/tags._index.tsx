import { Container } from '~/components/ui-kit/Container/Container';

export default function TagsIndexPage() {
  return (
    <section className="section">
      <Container className="flex flex-col items-center gap-y-10">
        <p>No Tags selected.</p>

        <p>Select a Tag on the left, or add new one</p>
      </Container>
    </section>
  );
}
