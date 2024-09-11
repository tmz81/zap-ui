import React from "react";
import {
  Container,
  Grid,
  Typography,
  Box,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import QRCode from "qrcode.react";
import FormsSection from "./Forms";
import axios from "axios";

export default function HomePage() {
  const [qrCode, setQrCode] = React.useState("");
  const [authStatus, setAuthStatus] = React.useState(null);
  const [captchaSolved, setCaptchaSolved] = React.useState(false);

  const fetchQrCode = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/whatsapp/qr-code"
      );
      setQrCode(response.data.qrCode);
    } catch (error) {
      console.error("Erro ao buscar QR Code:", error);
    }
  };

  const checkAuthStatus = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/whatsapp/status"
      );
      setAuthStatus(response.data.isAuthenticated);
    } catch (error) {
      console.error("Erro ao verificar autenticação:", error);
    }
  };

  React.useEffect(() => {
    fetchQrCode();
    const interval = setInterval(checkAuthStatus, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const handleCaptchaChange = (event) => {
    setCaptchaSolved(event.target.checked);
  };

  return (
    <Container>
      <Grid container spacing={4} mt={30}>
        <Grid item xs={12} md={6} style={{ color: "#ffffff" }}>
          <Box>
            <Typography
              variant="h3"
              gutterBottom
              pb={2}
              textAlign="center"
              sx={{
                background:
                  "linear-gradient(135deg, #FFCD1E, #FF565F, #FF008E)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                color: "transparent",
                fontWeight: 700,
                WebkitTextFillColor: "transparent",
              }}
            >
              **Atenção!**
            </Typography>
            <Typography variant="h6" gutterBottom pb={2}>
              Ao utilizar a ferramenta, é fundamental estar ciente de que tal
              prática pode resultar no bloqueio ou até mesmo na perda permanente
              do número de telefone associado à sua conta. O WhatsApp possui
              políticas rigorosas. Brinque com sabedoria, tenha limites, não
              extrapole, use com moderação
            </Typography>
            <FormControlLabel
              style={{
                color: "#ffffff",
                marginBottom: "16px",
              }}
              control={
                <Checkbox
                  checked={captchaSolved}
                  onChange={handleCaptchaChange}
                  style={{ color: "#ffffff" }}
                />
              }
              label="**Responsabilidade e Consciência**"
            />
          </Box>
        </Grid>
        <Grid
          item
          xs={12}
          md={6}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {!authStatus ? (
            qrCode ? (
              <Box
                sx={{
                  backgroundColor: "#fff",
                  width: "48%",
                  height: "84%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: "8px",
                }}
              >
                <QRCode value={qrCode} size={256} />
              </Box>
            ) : (
              <Typography
                sx={{
                  background:
                    "linear-gradient(135deg, #FF008E, #FFCD1E, #FF565F)",
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  color: "transparent",
                  fontWeight: 700,
                  WebkitTextFillColor: "transparent",
                  textAlign: "center",
                  pb: 2,
                }}
                variant="h5"
              >
                Aguarde a geração do QR Code...
              </Typography>
            )
          ) : (
            <FormsSection
              authStatus={authStatus}
              captchaSolved={captchaSolved}
            />
          )}
        </Grid>
      </Grid>
    </Container>
  );
}
