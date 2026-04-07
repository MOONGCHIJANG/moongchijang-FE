export default async function Home() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_MOCK_URL}/api/example`);
  const data = await res.json();

  return (
    <div>
      <div>초기세팅</div>
      {data.message}
    </div>
  );
}
