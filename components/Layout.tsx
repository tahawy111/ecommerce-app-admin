import Nav from "@/components/Nav";
import { cn } from "@/lib/utils";
import { useSession, signIn, signOut } from "next-auth/react";
import { FC, useState } from "react";
import { UilBars } from '@iconscout/react-unicons';
import Spinner from "./Spinner";
import Logo from "./Logo";

interface LayoutProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  children: React.ReactNode;
  head?: React.ReactNode;
}

const Layout: FC<LayoutProps> = ({ children, className, head, ...props }) => {
  const { data: session, status } = useSession();
  const [showNav, setShowNav] = useState<boolean>(false);

  if (status === "loading") {
    return <div className="flex w-full h-screen justify-center items-center">
      <Spinner loading />
    </div>;
  }


  return (
    <>
      {head}
      <div className="bg-bgGray min-h-screen">
        <Spinner />
        <div className="md:hidden flex items-center">
          <button className="mx-4 my-3" onClick={() => setShowNav((prev) => !prev)}><UilBars className="w-7 h-7" /></button>
          <div className="flex grow justify-center mr-8"><Logo /></div>
        </div>
        <div className={cn(`flex`, className)} {...props}>
          <Nav show={showNav} />

          <div className="flex-grow px-2">
            {children}
            {/* Signed in as {session.user.email} <br />
        <button className="bg-gray-100 p-2 rounded-lg px-4 cursor-pointer hover:bg-gray-200 active:bg-gray-500 transition-colors duration-75" onClick={() => signOut()}>Sign out</button> */}
          </div>
        </div>
      </div>
    </>
  );
};



export default Layout;