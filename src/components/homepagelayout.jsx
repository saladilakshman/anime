/* eslint-disable react/prop-types */
import { Box, Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import "../App.css";
// eslint-disable-next-line react/prop-types
const HomepageLayout = ({ data }) => {
  return (
    <>
      <Stack
        direction="row"
        justifyContent="flex-start"
        alignItems="baseline"
        gap={2}
        sx={{
          overflowX: "scroll",
          whiteSpace: "nowrap",
          scrollSnapType: "x-mandatory"
        }}
        className="stack"
      >
        {data?.slice(0, 10).map((elem,index) => {
          const { mal_id, images, title, entry } = elem;
          const queryvalue = entry?.mal_id ?? mal_id;
          return (
            <Box
              sx={{
                width: { xs: 100, sm: 120, md: 140, lg: 180 }
              }}
              key={index}
            >
              <Link to={`/anime/${queryvalue}`}>
                <Box
                  key={mal_id}
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
                    aspectRatio: 2 / 3,
                    borderRadius: 1.2
                  }}
                />
              </Link>
              <Typography
                variant="body2"
                sx={{
                  overflowWrap: "break-word",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                  color: "#2C3333"
                }}
              >
                {title ?? entry.title ?? entry[1]?.title}
              </Typography>
            </Box>
          );
        })}
      </Stack>
    </>
  );
};
export default HomepageLayout;
