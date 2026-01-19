// This is an example to test a working query. In a page/component, add this to test:
// useQuery({ queryKey: ["health"], queryFn: () => apiGet("/api/health") })
export async function apiGet<T>(path: string): Promise<T> {
  const res = await fetch(path);

  if (!res.ok) {
    throw new Error(`Request failed: ${res.status}`);
  }

  return (await res.json()) as Promise<T>;
}
