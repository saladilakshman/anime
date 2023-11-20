import { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { AnimeState } from "../App";
import {
  Container,
  Grid,
  Typography,
  Box,
  CircularProgress,
  Stack
} from "@mui/material";
import "../App.css";
const LayoutStructure = () => {
  const { state} = useContext(AnimeState);
  const [path, setPath] = useState([]);
  useEffect(() => {
    if (window.location.href.includes("recommended")) {
      return setPath(state.recommendedanime);
    }
    if (window.location.href.includes("top-reviews")) {
      return setPath(state.topReviews);
    }
    if (window.location.href.includes("popular-episodes")) {
      return setPath(state.popularEpisodes);
    }
    if (window.location.href.includes("season")) {
      return setPath(state.seasons);
    }
    if (window.location.href.includes("top")) {
      return setPath(state.topAnime);
    }
  }, [
    state.topReviews,
    state.recommendedanime,
    state.popularEpisodes,
    state.seasons,
    state.topAnime
  ]);
  console.log(window.location.href.endsWith("/"));
  return (
    <Container sx={{ marginBlockStart: 3 }}>
      {state.isLoading && (
        <CircularProgress
          size="small"
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%,-50%)"
          }}
        />
      )}
      {state.isError && <p>Error in loading the data</p>}
      <Stack direction="row" justifyContent="center" alignItems="center">
        <Grid container spacing={2}>
          {path.map((topanime) => {
            const { mal_id, images, title, entry } = topanime;
            const queryvalue = entry?.mal_id ?? mal_id;
            return (
              <Grid
                item
                key={mal_id ?? entry.mal_id}
                xs={4}
                md={3}
                lg={3}
                spacing={1}
              >
                <Link to={`/anime/${queryvalue}`}>
                  <Box
                    component="img"
                    src={
                      images?.jpg?.image_url ??
                      entry.images?.jpg?.image_url ??
                      entry[1].images?.jpg?.image_url
                    }
                    alt=""
                    sx={{
                      width: { xs: 100, sm: 120, md: 140, lg: 180 },
                      height: { xs: 160, sm: 160, lg: "34vh" },
                      borderRadius: 1.2,
                      aspectRatio: 2 / 3
                    }}
                  />
                </Link>
                <Typography
                  variant="body2"
                  id="title-name"
                  sx={{
                    textWrap: "balance"
                  }}
                >
                  {title ?? entry.title ?? entry[1]?.title}
                </Typography>
              </Grid>
            );
          })}
        </Grid>
      </Stack>
    </Container>
  );
};
export default LayoutStructure;
