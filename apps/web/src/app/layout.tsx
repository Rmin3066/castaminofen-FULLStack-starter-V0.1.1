import './globals.css';
import { ThemeProvider } from '../providers/theme-provider';
import { I18nProvider } from '../providers/i18n-provider';

export const metadata = {
  title: 'Castaminofen Podcast Platform',
  description: 'Production-ready podcast platform scaffold',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider>
          <I18nProvider>{children}</I18nProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
