import React, { useState } from "react";
import axios from "axios";
import InputMask from "react-input-mask";
import {
  TextField,
  Button,
  Box,
  Slider,
  Typography,
  Snackbar,
  Alert,
  Grid,
} from "@mui/material";

export default function FormsSection({ authStatus, captchaSolved }) {
  const [number, setNumeroVitima] = useState("");
  const [ddd, setDdd] = useState("");
  const [message, setMensagem] = useState("");
  const [repeatTimes, setQuantidade] = useState(1);
  const [loading, setLoading] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleNumeroVitimaChange = (e) => {
    const rawValue = e.target.value.replace(/[^0-9]/g, "");
    setNumeroVitima(rawValue);
  };

  const handleNumeroDDD = (e) => {
    const rawValue = e.target.value.replace(/[^0-9]/g, "");
    setDdd(rawValue);
  };

  const handleMensagemChange = (e) => {
    setMensagem(e.target.value);
  };

  const handleQuantidadeChange = (event, newValue) => {
    setQuantidade(newValue);
  };

  const handleSubmit = async () => {
    if (!ddd || !number || !message) {
      setResponseMessage("Por favor, preencha todos os campos.");
      setOpenSnackbar(true);
      return;
    }

    setLoading(true);
    setResponseMessage("");

    const data = {
      ddd,
      number,
      message,
      repeatTimes,
    };

    try {
      const response = await axios.post(
        "https://zap-api-61q3.onrender.com/send-message",
        data
      );
      setLoading(false);

      if (response.data.success) {
        setResponseMessage("Mensagens enviadas com sucesso!");
      } else {
        setResponseMessage("Erro ao enviar mensagens.");
      }
    } catch (error) {
      setLoading(false);
      setResponseMessage("Ocorreu um erro ao tentar enviar a message.");
      console.error("Erro na requisição:", error);
    }

    setOpenSnackbar(true);
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Box
      component="form"
      sx={{
        maxWidth: 400,
        height: 500,
        margin: "0 auto",
        padding: 2,
        background: "linear-gradient(135deg, #FF008E, #FFCD1E, #FF565F)",
        borderRadius: 4,
        mb: 2,
      }}
    >
      <Grid container spacing={1}>
        <Grid item xs={3}>
          <InputMask
            style={{
              color: "#fff",
            }}
            mask="99"
            value={ddd}
            onChange={handleNumeroDDD}
          >
            {() => (
              <TextField
                label="DDD"
                variant="outlined"
                fullWidth
                margin="normal"
                InputLabelProps={{
                  style: { color: "#000" },
                }}
                InputProps={{
                  style: { color: "#000" },
                  sx: {
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: "#000",
                      },
                      "&:hover fieldset": {
                        borderColor: "#000",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "#000",
                      },
                    },
                  },
                }}
              />
            )}
          </InputMask>
        </Grid>
        <Grid item xs={9}>
          <InputMask
            style={{
              color: "#fff",
            }}
            mask="9-9999-9999"
            value={number}
            onChange={handleNumeroVitimaChange}
          >
            {() => (
              <TextField
                label="Número"
                variant="outlined"
                fullWidth
                margin="normal"
                InputLabelProps={{
                  style: { color: "#000" },
                }}
                InputProps={{
                  style: { color: "#000" },
                  sx: {
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: "#000",
                      },
                      "&:hover fieldset": {
                        borderColor: "#000",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "#000",
                      },
                    },
                  },
                }}
              />
            )}
          </InputMask>
        </Grid>
      </Grid>
      <TextField
        label="Mensagem"
        variant="outlined"
        fullWidth
        multiline
        rows={4}
        inputProps={{ maxLength: 150 }}
        value={message}
        onChange={handleMensagemChange}
        margin="normal"
        InputLabelProps={{
          style: { color: "#000" },
        }}
        InputProps={{
          style: { color: "#000" },
          sx: {
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "#fff",
              },
              "&:hover fieldset": {
                borderColor: "#fff",
              },
              "&.Mui-focused fieldset": {
                borderColor: "#fff",
              },
            },
          },
        }}
      />

      <Box p={2} mt={2}>
        <Typography gutterBottom sx={{ color: "#000", fontWeight: 500 }}>
          Quantidade de mensagens enviadas
        </Typography>
        <Slider
          value={repeatTimes}
          onChange={handleQuantidadeChange}
          aria-labelledby="repeatTimes-slider"
          valueLabelDisplay="auto"
          step={1}
          marks
          min={1}
          max={99}
          sx={{
            color: "#fff",
            "& .MuiSlider-thumb": {
              backgroundColor: "#000",
              border: "2px solid #000",
            },
            "& .MuiSlider-track": {
              backgroundColor: "#fff",
            },
            "& .MuiSlider-rail": {
              backgroundColor: "#fff",
            },
            "& .MuiSlider-mark": {
              backgroundColor: "#fff",
            },
            "& .MuiSlider-markLabel": {
              color: "#000",
            },
          }}
        />
      </Box>

      <Button
        variant="contained"
        color="success"
        fullWidth
        onClick={handleSubmit}
        disabled={!authStatus || !captchaSolved || loading}
        sx={{ marginTop: 2, height: 54 }}
      >
        {loading ? "Enviando..." : "Enviar Mensagens"}
      </Button>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity="info">
          {responseMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
}
