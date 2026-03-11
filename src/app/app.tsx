import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ColorSchemeScript, MantineProvider } from '@mantine/core';
import { ModalsProvider } from '@mantine/modals';
import { Notifications } from '@mantine/notifications';
import { RouterProvider } from 'react-router-dom';
import { router } from "../shared/configs/routes/router";
import { theme } from "../shared/theme/theme";
import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import '../shared/configs/i18n/i18n';

export const App = () => {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <ColorSchemeScript defaultColorScheme="dark" />
      <MantineProvider theme={theme} defaultColorScheme="dark">
        <Notifications />
        <ModalsProvider>
          <RouterProvider router={router} />
        </ModalsProvider>
      </MantineProvider>
    </QueryClientProvider>
  );
};