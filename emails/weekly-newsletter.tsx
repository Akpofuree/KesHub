import {
  Html,
  Head,
  Body,
  Container,
  Heading,
  Text,
  Button,
  Img,
  Section,
  Row,
  Column,
  Link,
} from "@react-email/components";

export default function WeeklyNewsletter({
  products = [],
  unsubscribeUrl = "https://keshub.com/unsubscribe",
}) {
  return (
    <Html>
      <Head />
      <Body style={main}>
        <Container style={container}>
          <Heading style={heading}>KESHUB Weekly 🔥</Heading>
          <Text style={paragraph}>
            Happy Monday! Here are the top featured products you don't want to miss
            this week.
          </Text>

          {products.length > 0 ? (
            products.map((p) => (
              <Section key={p.id} style={productSection}>
                <Row>
                  <Column style={{ width: "120px" }}>
                    <Img
                      src={
                        p.images?.[0] ||
                        "https://via.placeholder.com/100?text=No+Image"
                      }
                      width="100"
                      height="100"
                      style={productImage}
                      alt={p.name}
                    />
                  </Column>
                  <Column>
                    <Text style={productTitle}>{p.name}</Text>
                    <Text style={productPrice}>
                      ₦{p.price?.toLocaleString()}
                    </Text>
                    <Button
                      href={`https://keshub.com/product/${p.slug}`}
                      style={button}
                    >
                      Shop Now
                    </Button>
                  </Column>
                </Row>
              </Section>
            ))
          ) : (
            <Text style={paragraph}>No featured products this week.</Text>
          )}

          <Section style={footer}>
            <Text style={footerText}>
              You are receiving this email because you subscribed to the KESHUB
              newsletter.
            </Text>
            <Text style={footerText}>
              <Link href={unsubscribeUrl} style={unsubscribeLink}>
                Unsubscribe here
              </Link>
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

// Styles
const main = {
  backgroundColor: "#f6f9fc",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};

const container = {
  backgroundColor: "#ffffff",
  margin: "0 auto",
  padding: "40px 20px",
  borderRadius: "8px",
  maxWidth: "600px",
  marginTop: "40px",
  marginBottom: "40px",
  border: "1px solid #e6ebf1",
};

const heading = {
  color: "#1FCB5E",
  fontSize: "24px",
  fontWeight: "bold",
  textAlign: "center" as const,
  margin: "0 0 20px",
};

const paragraph = {
  color: "#525f7f",
  fontSize: "16px",
  lineHeight: "24px",
  textAlign: "center" as const,
  marginBottom: "30px",
};

const productSection = {
  marginBottom: "20px",
  paddingBottom: "20px",
  borderBottom: "1px solid #e6ebf1",
};

const productImage = {
  borderRadius: "8px",
  objectFit: "cover" as const,
};

const productTitle = {
  fontSize: "18px",
  fontWeight: "bold",
  color: "#32325d",
  margin: "0 0 8px 0",
};

const productPrice = {
  fontSize: "16px",
  color: "#1FCB5E",
  fontWeight: "bold",
  margin: "0 0 16px 0",
};

const button = {
  backgroundColor: "#1FCB5E",
  borderRadius: "4px",
  color: "#fff",
  fontSize: "14px",
  fontWeight: "bold",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "inline-block",
  padding: "10px 20px",
};

const footer = {
  marginTop: "40px",
  textAlign: "center" as const,
};

const footerText = {
  fontSize: "12px",
  color: "#8898aa",
  lineHeight: "16px",
  margin: "4px 0",
};

const unsubscribeLink = {
  color: "#8898aa",
  textDecoration: "underline",
};
