import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Footer } from "@/components/shared/footer";
import { Header } from "@/components/shared/header";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "Tradoxus",
	description: "Interactive trading education platform",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-950 text-gray-100`}
			>
				<div className="min-h-[calc(100vh-85px)]">
					<Header />
					{children}
				</div>
				<Footer />
			</body>
		</html>
	);
}
