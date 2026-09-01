const platforms = [
  {
    id: "twitter",
    name: "Twitter",
    limit: 280,
    hashtagRequired: false,
  },
  {
    id: "linkedin",
    name: "LinkedIn",
    limit: 3000,
    hashtagRequired: false,
  },
  {
    id: "instagram",
    name: "Instagram",
    limit: 2200,
    hashtagRequired: true,
  },
  {
    id: "facebook",
    name: "Facebook",
    limit: Infinity,
    hashtagRequired: false,
  },
];

export default platforms;