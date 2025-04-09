import Layout from "@/components/Layout";
import Spinner from "@/components/Spinner";
import getThis from "@/lib/getThis";
import { useSession } from "next-auth/react";
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from "next/router";
import { Adhan } from "islamic-adhan";
export default function Home() {
  const { data: session, status } = useSession();
  const head = <Head>
    <title>EcommerceAdmin</title>
  </Head>;
  const router = useRouter();

  // console.log({ data: session, status });


  // if (session === undefined && status === "loading") {
  //   return <div className="flex w-full h-screen justify-center items-center">
  //     <Spinner loading />
  //   </div>;
  // }



  const adhan = new Adhan();

  // Egypt, Alexandria;
  let latitude = 31.223;
  let longitude = 30.0355;


  const times = adhan.getTimes(
    new Date() /* the Date */,
    [latitude, longitude],
    "auto" /* => timezone */
  );

  console.log(times);





  return (<Layout head={ head }>

    <div className="flex text-blue-900 justify-between">
      <h2>Hello, { session?.user.name }</h2>

      <div className="flex bg-gray-300 gap-1 text-black items-center rounded-lg overflow-hidden pr-1">
        <Image src={ getThis(session?.user.image) } width={ 33 } height={ 33 } alt="" />
        <span className="px-2">
          <h2>{ session?.user.name }</h2>
        </span>

      </div>
    </div>

  </Layout>);
}
