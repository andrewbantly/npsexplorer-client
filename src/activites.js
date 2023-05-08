const activities = [
  {
    key: "Arts and Culture",
    img: "https://ucarecdn.com/f43942b7-9492-4093-b533-b212d86d26ef/",
    icon: "Arts"
  },
  {
    key: "Astronomy",
    img: "https://ucarecdn.com/22820ab9-b119-417b-b02c-80f4dd40e619/",
    icon: "Astronomy"
  },
  {
    key: "Auto and ATV",
    img: "https://ucarecdn.com/bb9aeb4d-6e48-4e01-b694-881c55d264d2/",
    icon: "ATV"
  },
  {
    key: "Biking",
    img: "https://ucarecdn.com/a248b928-19e5-4407-b679-a786eb704a05/",
    icon: "Bicycling"
  },
  {
    key: "Boating",
    img: "https://ucarecdn.com/267f42f9-2ff5-47bb-9870-dfc57379f83e/",
    icon: "Boating"
  },
  {
    key: "Camping",
    img: "https://ucarecdn.com/9e42e922-ca12-4e67-b497-35d3030fd29e/",
    icon: "Camping"
  },
  {
    key: "Canyoneering",
    img: "https://ucarecdn.com/b2493233-25b8-43c0-b3b2-5431c649cafb/",
    icon: "Canyoneer"
  },
  {
    key: "Caving",
    img: "https://ucarecdn.com/e82c4e22-e21e-44af-aaa9-ab867981dd2d/",
    icon: "Caving"
  },
  {
    key: "Climbing",
    img: "https://ucarecdn.com/ccdd0347-bf11-47ce-b596-13fa0f17402c/",
    icon: "Climbing"
  },
  {
    key: "Compass and GPS",
    img: "https://ucarecdn.com/06c708ef-8db0-4887-9c2c-04ff28f9726a/",
    icon: "Nav"
  },
  {
    key: "Dog Sledding",
    img: "https://ucarecdn.com/bd2f155f-fd36-413a-be4b-e446dcd591d4/",
    icon: "Sledding"
  },
  {
    key: "Fishing",
    img: "https://ucarecdn.com/07a996a8-678b-4f46-a13b-cae9c4081854/",
    icon: "Fishing"
  },
  {
    key: "Flying",
    img: "https://ucarecdn.com/0d4d4d8e-fa08-4ec8-9115-2274dacb2b33/",
    icon: "Flying"
  },
  {
    key: "Food",
    img: "https://ucarecdn.com/81d2404d-8a41-40e9-bd92-e91460d9c576/",
    icon: "Food"
  },
  {
    key: "Golfing",
    img: "https://ucarecdn.com/5be77424-8849-4d2e-ba8d-48af3e91a466/",
    icon: "Golfing"
  },
  {
    key: "Guided Tours",
    img: "https://ucarecdn.com/bd9dce1a-71dc-4cf6-ba3d-59796cd4328d/",
    icon: "Tours"
  },
  {
    key: "Hands-On",
    img: "https://ucarecdn.com/ac6df9a8-f547-43b6-85b9-a227cf426349/",
    icon: "Interactive"
  },
  {
    key: "Hiking",
    img: "https://ucarecdn.com/ba9e2d41-5dde-41b1-9fdd-210f52b477d0/",
    icon: "Hiking"
  },
  {
    key: "Horse Trekking",
    img: "https://ucarecdn.com/48608faa-9e18-403c-9529-ade563e720ed/",
    icon: "Riding"
  },
  {
    key: "Hunting and Gathering",
    img: "https://ucarecdn.com/819f2fe3-e371-4f8c-b801-3997c5969b8c/",
    icon: "Hunting"
  },
  {
    key: "Ice Skating",
    img: "https://ucarecdn.com/234bd46e-7eef-4f09-9f04-b6748cd7525f/",
    icon: "Skating"
  },
  {
    key: "Junior Ranger Program",
    img: "https://ucarecdn.com/ecc89924-777d-43c6-b595-9c0aa9535b1e/",
    icon: "Scouts"
  },
  {
    key: "Living History",
    img: "https://ucarecdn.com/78e7258e-c955-4027-a792-f484da56acf8/",
    icon: "History"
  },
  {
    key: "Museum Exhibits",
    img: "https://ucarecdn.com/6caeddfd-d739-4666-8eb5-9523dfb1d167/",
    icon: "Museum"
  },
  {
    key: "Paddling",
    img: "https://ucarecdn.com/6cffec61-50c3-4c59-86cb-5902c73ce7c5/",
    icon: "Paddling"
  },
  {
    key: "Park Film",
    img: "https://ucarecdn.com/a272ee41-e753-4678-9ad4-d073432025cd/",
    icon: "Film"
  },
  {
    key: "Playground",
    img: "https://ucarecdn.com/aa060cb3-4d58-429a-99c4-419670c7cb1b/",
    icon: "Playground"
  },
  {
    key: "SCUBA Diving",
    img: "https://ucarecdn.com/0dced317-486c-419c-b378-247169c1c0db/",
    icon: "Diving"
  },
  {
    key: "Shopping",
    img: "https://ucarecdn.com/c9167a04-e43a-440e-8685-f3efff34c652/",
    icon: "Shoppping"
  },
  {
    key: "Skiing",
    img: "https://ucarecdn.com/78e7258e-c955-4027-a792-f484da56acf8/",
    icon: "Skiing"
  },
  {
    key: "Snorkeling",
    img: "https://ucarecdn.com/611c85b9-bf2d-4726-aec0-459a9f2842dc/",
    icon: "Snorkeling"
  },
  {
    key: "Snow Play",
    img: "https://ucarecdn.com/ecdc51b8-b11b-4f75-b6e0-fcb7c58cedd7/",
    icon: "Snow"
  },
  {
    key: "Snowmobiling",
    img: "https://ucarecdn.com/b3e83e0b-07e4-4c72-9f42-a946dc00e2b8/",
    icon: "Snowmobile"
  },
  {
    key: "Snowshoeing",
    img: "https://ucarecdn.com/8fc460d5-efa0-4947-a1f2-3337c19c81d2/",
    icon: "Snowshoe"
  },
  {
    key: "Surfing",
    img: "https://ucarecdn.com/6d4eaa83-3330-4e5a-a7de-a68eaea90240/",
    icon: "Surfing"
  },
  {
    key: "Swimming",
    img: "https://ucarecdn.com/3bf7229e-b14e-44ec-9316-254c3e85b3ff/",
    icon: "Swimming"
  },
  {
    key: "Team Sports",
    img: "https://ucarecdn.com/fc9052d8-eb88-40e4-90a4-e3764eec938f/",
    icon: "Sports"
  },
  {
    key: "Tubing",
    img: "https://ucarecdn.com/bdec2e3b-acf7-4cde-9ac4-86fea5ce92df/",
    icon: "Tubeing"
  },
  {
    key: "Water Skiing",
    img: "https://ucarecdn.com/20a5f4b3-b767-40b6-aeba-84140c024e28/",
    icon: "WaterSkiing"
  },
  {
    key: "Wildlife Watching",
    img: "https://ucarecdn.com/9fd9b458-e33a-4056-b82c-d5a45a20927e/",
    icon: "Wildlife"
  }
];

  export default activities