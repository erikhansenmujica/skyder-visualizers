// This file contains placeholder data that you'll be replacing with real data in the Data Fetching chapter:
// https://nextjs.org/learn/dashboard-app/fetching-data
const users = [
  {
    id: "410544b2-4001-4271-9855-fec4b6a6442b",
    name: "User",
    email: "skyderdigital@gmail.com",
    password: "niidea1234",
  },
];
const jobs = [
  {
    link: "https://www.youtube.com/watch?v=OX2Ebn_uVSE",
    song_name: "Subiendo el nivel",
    time_spent: "30hs",
    artist: "VZQZ",
    product_id: "Skyder-Visualizer",
    customer_id: "3958dc9e-742f-4377-85e9-fec4b6a6442a",
  },
  {
    link: "https://www.youtube.com/watch?v=exTD6Te-wfY",
    song_name: "Heladera",
    time_spent: "20hs",
    artist: "Lars, Pueblerino",
    product_id: "Skyder-Visualizer",
    customer_id: "50ca3e18-62cd-11ee-8c99-0242ac120002",
  },
  {
    link: "https://www.youtube.com/watch?v=FuLjk0KaT34",
    song_name: "Revolución",
    time_spent: "10hs",
    artist: "Monkey The Dog",
    product_id: "Skyder-Visualizer",
    customer_id: "3958dc9e-737f-4377-85e9-fec4b6a6442a",
  },
  {
    link: "https://www.youtube.com/watch?v=mHG9ifi-Ev4",
    song_name: "Caos",
    time_spent: "10hs",
    artist: "Monkey The Dog",
    product_id: "Skyder-Visualizer",
    customer_id: "3958dc9e-737f-4377-85e9-fec4b6a6442a",
  },
  {
    link: "https://www.youtube.com/watch?v=VtFyGprikqI",
    song_name: "Avión subacuático",
    time_spent: "10hs",
    artist: "Sujeto Beta y Caspian Arpegio",
    product_id: "Skyder-Visualizer",
    customer_id: "50ca3e18-62cd-11ee-8c99-0242ac120002",
  },
];

const customers = [
  {
    id: "3958dc9e-712f-4377-85e9-fec4b6a6442a",
    name: "Blopa Chackal",
    email: "blopachackal@hotmail.com",
    image_url: "/customers/delba-de-oliveira.png",
  },
  {
    id: "3958dc9e-742f-4377-85e9-fec4b6a6442a",
    name: "Vasquez",
    email: "vsqz@gmail.com",
    image_url: "/customers/lee-robinson.png",
  },
  {
    id: "3958dc9e-737f-4377-85e9-fec4b6a6442a",
    name: "Monkey The Dog",
    email: "monkeythedog@gmail.com",
    image_url: "/customers/hector-simpson.png",
  },
  {
    id: "50ca3e18-62cd-11ee-8c99-0242ac120002",
    name: "Sujeto Beta y Caspian Arpegio",
    email: "sjbtacspn@arpegio.com",
    image_url: "/customers/steven-tey.png",
  },
];

const orders = [];

const products = [];

module.exports = {
  users,
  customers,

  jobs,
};
