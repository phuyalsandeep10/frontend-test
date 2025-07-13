import Link from 'next/link';

export default function Home() {
  return (
    <div>
      <h1>Home page</h1>
      <div className="m-6">
        <Link href={'/login'} className="cursor-pointer text-indigo-400">
          Login
        </Link>
        <Link
          href={'/register'}
          className="ml-6 cursor-pointer text-indigo-400"
        >
          Register
        </Link>
      </div>
    </div>
  );
}
