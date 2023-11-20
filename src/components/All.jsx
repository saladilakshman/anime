import  { useContext } from "react";
import { AnimeState } from "../App";
import {
  Stack,
  Typography,
  Box,
  Container,
  Button,
  CircularProgress
} from "@mui/material";
import HomePageLayout from "./homepagelayout";
import { useNavigate } from "react-router-dom";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Link } from "react-router-dom";
import Carousel from "react-material-ui-carousel";
const All = () => {
  const { state, mobile } = useContext(AnimeState);
  const navigate = useNavigate();
  const homepagelayout = [
    {
      name: "Recommended",
      data: state?.recommendedanime,
      navigationLink: "recommended"
    },
    {
      name: "Recent anime",
      data: state?.topReviews,
      navigationLink: "top-reviews"
    },
    {
      name: "Popular",
      data: state?.popularEpisodes,
      navigationLink: "popular-episodes"
    },
    {
      name: "Seasons",
      data: state?.seasons,
      navigationLink: "season"
    },
    {
      name: "Top Anime",
      data: state?.topAnime,
      navigationLink: "top-anime"
    }
  ];

  return (
    <>
      {state.isLoading ? (
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%,-50%)"
          }}
        >
          <CircularProgress color="primary" />
        </div>
      ) : (
        <Container>
          <Carousel>
            {state?.carouseldata?.slice(2, 5).map((img, index) => {
              const queryvalue = img.entry?.mal_id ?? img.mal_id;
              return (
                <Link to={`/anime/${queryvalue}`} key={index}>
                  <Box
                    component="img"
                    loading="lazy"
                    src={img.images?.jpg?.image_url}
                    sx={{
                      width:mobile?"100%":590,
                      aspectRatio:16/12,
                      objectFit: "contain",
                      margin:mobile?'':'auto',
                      display:mobile?'':'block',
                      borderRadius: 0.8
                    }}
                  />
                </Link>
              );
            })}
          </Carousel>

          {homepagelayout.map((lay, index) => {
            const { name, data, navigationLink } = lay;
            return (
              <Stack
                direction="column"
                justifyContent="space-around"
                alignItems="centetr"
                key={index}
              >
                <Box key={index}>
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    sx={{ p: 0.5 }}
                  >
                    <Typography variant="h6" sx={{ color: "#212121" }}>
                      {name}
                    </Typography>
                    <Button
                      variant="text"
                      size="small"
                      sx={{ color: "#616161", marginRight: mobile ? -2 : "" }}
                      onClick={() => {
                        document.startViewTransition(() =>
                          navigate(navigationLink)
                        );
                      }}
                    >
                      {mobile ? (
                        <ArrowForwardIcon />
                      ) : (
                        <Typography variant="body2">View more</Typography>
                      )}
                    </Button>
                  </Stack>
                  <HomePageLayout data={data} />
                </Box>
              </Stack>
            );
          })}
        </Container>
      )}
    </>
  );
};
export default All;
