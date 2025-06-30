import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { AuthProvider } from "@/contexts/AuthContext"
import { FavoritesProvider } from "@/contexts/FavoritesContext"
import { PropertiesProvider } from "@/contexts/PropertiesContext"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "HomeFinder - Find Your Perfect Home in Morocco",
  description: "Discover beautiful properties for rent and sale across Morocco's most desirable locations",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <FavoritesProvider>
            <PropertiesProvider>{children}</PropertiesProvider>
          </FavoritesProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
