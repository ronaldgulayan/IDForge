import { createRoot } from "react-dom/client";
import { MantineProvider } from "@mantine/core";
import { ModalsProvider } from '@mantine/modals';
import { RouterProvider } from "react-router-dom";
import routers from "./routers.tsx";

import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <MantineProvider>
    <ModalsProvider>
    <RouterProvider router={routers} />
    </ModalsProvider>
  </MantineProvider>,
);
