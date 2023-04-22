import Layout from "@/components/Layout";
import getThis from "@/lib/getThis";
import { useSession } from "next-auth/react";
import Head from 'next/head';

export default function Home() {
  const { data: session } = useSession();
  const head = <Head>
    <title>EcommerceAdmin</title>
  </Head>;



  return (<Layout head={head}>

    <div className="flex text-blue-900 justify-between">
      <h2>Hello, {session?.user.name}</h2>

      <div className="flex bg-gray-300 gap-1 text-black items-center rounded-lg overflow-hidden pr-1">
        <img src={getThis(session?.user.image)} className="w-8 h-8" alt="" />
        <span className="px-2">
          <h2>{session?.user.name}</h2>
        </span>

      </div>
    </div>

  </Layout>);
}
