import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { MantineProvider } from '@mantine/core';
import { ModalsProvider } from '@mantine/modals';
import { Notifications } from '@mantine/notifications';
import { RouterProvider } from 'react-router-dom';
import { router } from "../shared/configs/routes/router";
import { theme } from "../shared/theme/theme";
import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';

export const App = () => {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <MantineProvider theme={theme}>
        <Notifications />
        <ModalsProvider>
          <RouterProvider router={router} />
        </ModalsProvider>
      </MantineProvider>
    </QueryClientProvider>
  )
};