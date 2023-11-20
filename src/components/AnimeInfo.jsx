import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import ReactPlayer from "react-player";
import axios from "axios";
import { Box, Container, Typography, Stack, Button } from "@mui/material";
import { AnimeState } from "../App";
import "../App.css";
const AnimeFullDetails = () => {
  const { animefulldetails } = useParams();
  const [singledata, setSingledata] = useState({});
  const { mobile } = useContext(AnimeState);
  const [intl, setIntl] = useState("");
  const [animeparamid, setAnimeparamid] = useState(null);

  useEffect(() => {
    if (animefulldetails.includes("-")) {
      const splitedid = animefulldetails.split("-")[1];
      setAnimeparamid(splitedid);
    } else {
      setAnimeparamid(animefulldetails);
    }
    axios
      .get(`https://api.jikan.moe/v4/anime/${animeparamid}/full`)
      .then((res) => {
        setSingledata(res.data?.data);
      })
      .catch((err) => console.log(err));
  }, [animeparamid, animefulldetails]);
  const {
    title,
    title_english,
    images,
    status,
    synopsis,
    genres,
    trailer
  } = singledata;
  useEffect(() => {
    if (Array.isArray(genres)) {
      const adventures = Array.from(genres, (genre) => genre.name);
      const format = new Intl.ListFormat("en", {
        style: "long",
        type: "conjunction"
      }).format(adventures);
      setIntl(format);
    } else {
      return;
    }
  }, [genres]);

  return (
    <Container sx={{ marginBlockEnd: 3 }}>
      <Stack
        direction="column"
        justifyContent="space-between"
        alignItems="baseline"
        gap={1}
      >
        <Box
          component="img"
          loading="lazy"
          src={images?.jpg?.large_image_url}
          sx={{
            aspectRatio: 2 / 1,
            maxWidth: "100%",
            height: { xs: 300, sm: "50%", lg: "50vh" },
            borderRadius: 1.5,
            objectFit: "cover",
            display: "block",
            margin: "auto"
          }}
        />
        <Typography
          variant={mobile ? "h6" : "h5"}
          sx={{
            textAlign: mobile ? "start" : "center"
          }}
        >
          <span>Title</span>:{title}
        </Typography>
        <Typography variant="body1">
          <span>English</span>: {title_english}
        </Typography>
        <Typography variant="body2" sx={{ textAlign: "justify" }}>
          <span>Plot-Summary</span>: {synopsis}
        </Typography>
        <Typography variant="body2">
          <span>Status</span>:{status}
        </Typography>
        <Typography variant="body2" sx={{ marginBlockEnd: 2 }}>
          <span>Genre</span>:{intl}
        </Typography>
      </Stack>
      {trailer?.embed_url === null ? (
        <Button variant="outlined" fullWidth disableRipple>
          no video found
        </Button>
      ) : (
        <Box
          style={{ width: mobile ? "" : 423, display: "block", margin: "auto" }}
        >
          <ReactPlayer
            url={trailer?.embed_url}
            controls
            width={"100%"}
            height={"200px"}
            pip={true}
            light={true}
          />
        </Box>
      )}
    </Container>
  );
};

export default AnimeFullDetails;
