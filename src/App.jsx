import "./App.css";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import axios from "axios";
import { HashRouter, Routes, Route, Link } from "react-router-dom";
//import ReactPlayer from "react-player";
import  { useState, useEffect, useReducer, createContext } from "react";
import {
  Container,
  useTheme,
  Typography,
  useMediaQuery,
  Box,
  IconButton,
  AppBar,
  Drawer,
  MenuItem,
  ListItemText,
  Stack,
  Tabs,
  Tab
} from "@mui/material";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import MenuIcon from "@mui/icons-material/Menu";
import All from "./components/All";
import AnimeFullDetails from "./components/AnimeInfo";
import RecentEpisodes from "./components/recentEpisodes";
import RecommendedAnime from "./components/recommendedAnime";
import PopularEpisodes from "./components/popularepisodes";
import Season from "./components/seasons";
import TopAnime from "./components/topAnime";
export const AnimeState = createContext(null);
export default function App() {
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.only("xs"));
  const initialState = {
    carouseldata: [],
    recommendedanime: [],
    topReviews: [],
    popularEpisodes: [],
    seasons: [],
    topAnime: [],
    isLoading: true,
    isError: false
  };
  const [close, setClose] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const reducerfunction = (state, action) => {
    if (action.type === "recommended") {
      return {
        ...state,
        recommendedanime: action.payload,
        isLoading: false,
        isError: false
      };
    }
    if (action.type === "topreview") {
      return {
        ...state,
        topReviews: action.payload,
        isLoading: false,
        isError: false
      };
    }
    if (action.type === "popularepisodes") {
      return {
        ...state,
        popularEpisodes: action.payload,
        isLoading: false,
        isError: false
      };
    }
    if (action.type === "season") {
      return {
        ...state,
        seasons: action.payload,
        isLoading: false,
        isError: false
      };
    }
    if (action.type === "top") {
      return {
        ...state,
        topAnime: action.payload,
        isLoading: false,
        isError: false
      };
    }
    if (action.type === "carousel") {
      return {
        ...state,
        carouseldata: action.payload,
        isLoading: false,
        isError: false
      };
    } else {
      return state.isLoading;
    }
  };
  useEffect(() => {
    const fetching=()=>{
    const urls = [
      "https://api.jikan.moe/v4/recommendations/anime",
      "https://api.jikan.moe/v4/reviews/anime",
      "https://api.jikan.moe/v4/watch/episodes/popular",
      "https://api.jikan.moe/v4/seasons/upcoming",
      "https://api.jikan.moe/v4/top/anime",
      "https://api.jikan.moe/v4/schedules"
    ];
    axios.all(
      urls.map((url) => {
        return axios.get(url);
      })
    )
      .then((results) => {
        dispatch({ type: "recommended", payload: results[0]?.data?.data });
        dispatch({ type: "topreview", payload: results[1]?.data?.data });
        dispatch({ type: "popularepisodes", payload: results[2]?.data?.data });
        dispatch({ type: "season", payload: results[3]?.data?.data });
        dispatch({ type: "top", payload: results[4]?.data?.data });
        dispatch({ type: "carousel", payload: results[5]?.data?.data });
      })
      .catch((err) => console.log(err));
    }
    fetching()
  }, [])
  const [state, dispatch] = useReducer(reducerfunction, initialState);
  const MenuItems = [
    { type: "Recommended", link: "recommended" },
    { type: "Recent Episodes", link: "top-reviews" },
    { type: "Popular", link: "popular-episodes" },
    { type: "Seasons", link: "season" },
    { type: "Top Anime", link: "top-anime" }
  ];
  const drawerClose = () => {
    setClose(false);
  };
  return (
    <HashRouter>
      <AppBar position="static" sx={{ bgcolor: "white", boxShadow: 0 }}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Link to="/">
            <Box
              component="img"
              src="https://img.freepik.com/premium-vector/karate-logo-with-brush-vector-design_109706-167.jpg"
              alt=""
              sx={{
                width: { xs: 80, sm: 100, lg: 140 }
              }}
            />
          </Link>
          {mobile ? (
            <IconButton onClick={() => setClose(true)} sx={{ flex: 0.2 }}>
              <MenuIcon sx={{ fontSize: 22 }} />
            </IconButton>
          ) : (
            <Box
              display="flex"
              justifyContent="space-around"
              alignItems="center"
              sx={{ marginInlineEnd: 3 }}
            >
              {MenuItems.map((routingelement, index) => {
                return (
                  <Tabs
                    key={index}
                    color="primary"
                    value={selectedIndex}
                    onChange={(e, Val) => {
                      document.startViewTransition(() => {
                        setSelectedIndex(Val);
                      });
                    }}
                    component={Link}
                    to={routingelement.link}
                    sx={{ textDecoration: "none" }}
                    indicatorColor="secondary"
                  >
                    <Tab
                      value={index}
                      label={routingelement.type}
                      name={routingelement.type}
                      color="secondary"
                    />
                  </Tabs>
                );
              })}
            </Box>
          )}
        </Stack>
      </AppBar>
      <Container>
        <Drawer open={close} onClose={drawerClose} anchor="left">
          <Box
            sx={{
              width: "100%",
              height: "100%",
              paddingBlockStart: 3
            }}
          >
            {MenuItems.map((menuItem, index) => {
              return (
                <MenuItem
                  key={index}
                  selected={index === selectedIndex}
                  onClick={() => {
                    setSelectedIndex(index);
                    setClose(false);
                  }}
                  component={Link}
                  to={menuItem.link}
                >
                  <ListItemText>
                    <Typography variant="body1">{menuItem.type}</Typography>
                  </ListItemText>
                </MenuItem>
              );
            })}
          </Box>
        </Drawer>
      </Container>
      <AnimeState.Provider value={{ state, MenuItems, mobile }}>
        <Routes>
          <Route path="/" element={<All />} />
          <Route path="recommended" element={<RecommendedAnime />} />
          <Route path="top-reviews" element={<RecentEpisodes />} />
          <Route path="popular-episodes" element={<PopularEpisodes />} />
          <Route path="season" element={<Season />} />
          <Route path="top-anime" element={<TopAnime />} />
          <Route
            path="/anime/:animefulldetails"
            element={<AnimeFullDetails />}
          />
        </Routes>
      </AnimeState.Provider>
    </HashRouter>
  );
}
