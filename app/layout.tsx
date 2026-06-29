import "./globals.css"
import AuthSessionProvider from "./components/SessionProvider";
import NavBar from "./components/NavBar";
import { NotifProvider } from "./components/NotifContex";
import Notif from "./components/Notif";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-background text-foreground">
        <AuthSessionProvider>
          <NotifProvider>
            <NavBar />
            <Notif />
            {children}
          </NotifProvider>
        </AuthSessionProvider>
      </body>
    </html>
  );
}