
export default function RootLayout({children,}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <head>
        <title>Clothing ARcade</title>
      </head>
      <body>{children}</body>
    </html>
  )
}
