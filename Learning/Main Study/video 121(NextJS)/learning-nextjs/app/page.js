import Button from "@/component/Button";

import Image from "next/image";

export default function Home() {
  return (
    <div className="text-center">
      <h1 className="mx-auto my-5">This is learning of Next JS</h1>
      <Image src="https://images.unsplash.com/photo-1449034446853-66c86144b0ad?w=620&auto=format&fit=crop&q=60&ixlib=rb-4.1.0" alt="img" width={300} height={300} className="mx-auto my-5" priority/>
    <Button text="form" />
    <Button text="about" />
    <Button text='form_with_server' />
    </div>
  );
}