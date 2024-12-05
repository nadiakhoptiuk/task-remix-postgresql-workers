import { Container } from '~/components/ui-kit/Container/Container';

export default function EmployeeIndexPage() {
  return (
    <section className="section">
      <Container className="flex flex-col items-center gap-y-10">
        <p>No Employee selected.</p>

        <p>Select an Employee on the left, or add new one</p>
      </Container>
    </section>
  );
}
