import Document, { Html, Head, Main, NextScript } from "next/document";

// We customize the document to apply dark mode classes directly to the body
// and avoid white flashes on first load and when the system appearance changes
class CustomDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html>
        <Head />
        <body className="bg-white dark:bg-gray-900">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default CustomDocument;
