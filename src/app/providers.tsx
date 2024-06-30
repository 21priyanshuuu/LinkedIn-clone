import * as React from "react";
import {NextUIProvider} from "@nextui-org/react";
import Navbar from "@/components/Navbar";

function App() {
  // 2. Wrap NextUIProvider at the root of your app
  return (
    <NextUIProvider>
      <Navbar/>
    </NextUIProvider>
  );
}