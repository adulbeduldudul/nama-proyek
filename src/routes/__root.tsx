import { HeadContent, Scripts, createRootRoute } from '@tanstack/react-router'
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'
import { TanStackDevtools } from '@tanstack/react-devtools'

import appCss from '../styles.css?url'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        title: 'Showroom Tanduk | Jual Domba Garut & Kambing Etawa/Jawa Sejak 2005',
      },
      {
        name: 'description',
        content: 'Showroom Tanduk di Cobdas menyediakan mayoritas Domba Garut dan pilihan Kambing Etawa/Jawa kualitas Super, Medium, dan Standar. Siap kirim se-Jabodetabek. Jual beli domba dan kambing sejak 2005.',
      },
      { name: 'keywords', content: 'jual beli kambing, jual domba garut, Domba Garut, kambing Etawa, kambing Jawa, jual kambing Jabodetabek, Showroom Tanduk, Cobdas' },
      { property: 'og:title', content: 'Showroom Tanduk — Domba Garut & Kambing Pilihan' },
      { property: 'og:description', content: 'Mayoritas Domba Garut, pilihan Etawa/Jawa, kualitas Super, Medium, dan Standar. Siap kirim se-Jabodetabek.' },
      { property: 'og:type', content: 'website' },
      { 'script:ld+json': { '@context': 'https://schema.org', '@type': 'Store', name: 'Showroom Tanduk', description: 'Jual beli Domba Garut dan Kambing Etawa/Jawa sejak 2005. Siap kirim se-Jabodetabek.', address: { '@type': 'PostalAddress', addressLocality: 'Cobdas', addressRegion: 'Jabodetabek', addressCountry: 'ID' }, areaServed: 'Jabodetabek', knowsAbout: ['Domba Garut', 'Kambing Etawa', 'Kambing Jawa', 'Jual beli kambing'] } },
    ],
    links: [
      {
        rel: 'stylesheet',
        href: appCss,
      },
    ],
  }),
  shellComponent: RootDocument,
})

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <TanStackDevtools
          config={{
            position: 'bottom-right',
          }}
          plugins={[
            {
              name: 'Tanstack Router',
              render: <TanStackRouterDevtoolsPanel />,
            },
          ]}
        />
        <Scripts />
      </body>
    </html>
  )
}
